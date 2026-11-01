/* Project-scoped, read-only source explorer. Regenerate source-manifest.json when files change. */
(() => {
  const dialog = document.querySelector('#source-viewer');
  const tree = dialog.querySelector('.source-tree');
  const output = dialog.querySelector('.source-code');
  const title = dialog.querySelector('#source-title');
  const pathLabel = dialog.querySelector('.source-path');
  const tab = dialog.querySelector('.source-tab');
  const status = dialog.querySelector('.source-status');
  const sidebar = dialog.querySelector('.source-sidebar');
  const treeToggle = dialog.querySelector('.source-tree-toggle');
  let manifestPromise;
  let project;
  let files = [];
  let activeRequest;
  let generation = 0;
  let opener;
  let previousOverflow;

  function setTreeVisible(visible) {
    sidebar.classList.toggle('is-open', visible);
    treeToggle.setAttribute('aria-expanded', String(visible));
  }

  function showMessage(message) {
    output.textContent = message;
  }

  // Tokenize plain text and build DOM nodes; source is never parsed as HTML or executed.
  function renderSource(source, filename) {
    const fragment = document.createDocumentFragment();
    const pattern = /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|var|function|return|if|else|for|while|new|class|true|false|null|async|await|import|export)\b|<\/?[\w-]+|\b\d+(?:\.\d+)?\b/g;
    const tokens = [];
    let offset = 0;
    if (source.length <= 200000) {
      for (const match of source.matchAll(pattern)) {
        if (match.index > offset) tokens.push([source.slice(offset, match.index), '']);
        const token = match[0];
        const kind = /^(<!--|\/\*|\/\/)/.test(token) ? 'comment'
          : /^["']/.test(token) ? 'string'
          : /^</.test(token) ? 'tag'
          : /^\d/.test(token) ? 'number' : 'keyword';
        tokens.push([token, kind]);
        offset = match.index + token.length;
      }
    }
    tokens.push([source.slice(offset), '']);
    let line;
    function addLine() {
      line = document.createElement('span');
      line.className = 'source-line';
      fragment.append(line);
    }
    addLine();
    for (const [text, kind] of tokens) {
      const parts = text.split('\n');
      parts.forEach((part, index) => {
        if (index) addLine();
        if (!part) return;
        const node = document.createElement('span');
        if (kind) node.className = `source-token-${kind}`;
        node.textContent = part;
        line.append(node);
      });
    }
    output.replaceChildren(fragment);
    output.parentElement.scrollTo(0, 0);
    status.textContent = `${filename.split('.').pop().toUpperCase()} · UTF-8 · 읽기 전용 · ${fragment.childElementCount || output.childElementCount}줄`;
  }

  async function selectFile(path, button) {
    if (!files.includes(path)) return;
    activeRequest?.abort();
    const controller = new AbortController();
    activeRequest = controller;
    tree.querySelectorAll('[aria-current]').forEach(el => el.removeAttribute('aria-current'));
    button.setAttribute('aria-current', 'true');
    tab.textContent = path.split('/').pop();
    pathLabel.textContent = `projects / ${project} / ${path.split('/').join(' / ')}`;
    status.textContent = '불러오는 중…';
    output.setAttribute('aria-busy', 'true');
    showMessage('소스 코드를 불러오는 중입니다.');
    setTreeVisible(false);
    try {
      const url = `projects/${encodeURIComponent(project)}/${path.split('/').map(encodeURIComponent).join('/')}`;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = await response.text();
      if (controller.signal.aborted) return;
      renderSource(source, path);
    } catch (error) {
      if (error.name === 'AbortError') return;
      showMessage('파일을 불러오지 못했습니다. 왼쪽 파일을 다시 선택해 주세요.');
      status.textContent = `불러오기 실패 (${error.message})`;
    } finally {
      if (activeRequest === controller) output.removeAttribute('aria-busy');
    }
  }

  function renderTree() {
    const root = {};
    for (const path of files) {
      let directory = root;
      const parts = path.split('/');
      parts.slice(0, -1).forEach(part => { directory = directory[part] ||= {}; });
      directory[parts.at(-1)] = path;
    }
    function build(node) {
      const list = document.createElement('ul');
      const entries = Object.entries(node).sort(([a, av], [b, bv]) =>
        (typeof av === 'string') - (typeof bv === 'string') || a.localeCompare(b));
      for (const [name, value] of entries) {
        const item = document.createElement('li');
        if (typeof value === 'string') {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'source-file';
          button.dataset.path = value;
          button.textContent = name;
          button.title = value;
          button.addEventListener('click', () => selectFile(value, button));
          item.append(button);
        } else {
          const details = document.createElement('details');
          const summary = document.createElement('summary');
          summary.textContent = name;
          details.append(summary, build(value));
          item.append(details);
        }
        list.append(item);
      }
      return list;
    }
    tree.replaceChildren(build(root));
  }

  async function openViewer(button) {
    opener = button;
    const currentGeneration = ++generation;
    project = button.dataset.sourceProject;
    title.textContent = `${button.closest('.work_item').querySelector('.work_title').textContent} · SOURCE CODE`;
    tab.textContent = '파일 선택';
    pathLabel.textContent = `projects / ${project}`;
    status.textContent = '파일 목록을 불러오는 중…';
    tree.replaceChildren();
    showMessage('파일 목록을 불러오는 중입니다.');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTreeVisible(false);
    dialog.showModal();
    try {
      manifestPromise ||= fetch('js/source-manifest.json').then(response => {
        if (!response.ok) throw new Error('파일 목록을 불러오지 못했습니다.');
        return response.json();
      }).catch(error => { manifestPromise = null; throw error; });
      const manifest = await manifestPromise;
      if (currentGeneration !== generation || !dialog.open) return;
      files = manifest[project];
      if (!Array.isArray(files) || !files.length) throw new Error('등록된 소스 파일이 없습니다.');
      renderTree();
      const initial = [...tree.querySelectorAll('.source-file')].find(el => el.dataset.path === 'index.html') || tree.querySelector('.source-file');
      await selectFile(initial.dataset.path, initial);
    } catch (error) {
      if (currentGeneration !== generation || !dialog.open) return;
      showMessage(`${error.message} 창을 닫고 다시 열어 주세요.`);
      status.textContent = '파일 목록 오류';
    }
  }

  document.querySelectorAll('[data-source-project]').forEach(button => {
    button.addEventListener('click', () => openViewer(button));
  });
  dialog.querySelector('.source-close').addEventListener('click', () => dialog.close());
  treeToggle.addEventListener('click', () => setTreeVisible(!sidebar.classList.contains('is-open')));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    generation++;
    activeRequest?.abort();
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
