"""Regenerate the project source explorer list after adding or removing source files."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
projects = {}
for directory in sorted((root / 'projects').iterdir()):
    if not directory.is_dir():
        continue
    files = sorted(
        p.relative_to(directory).as_posix()
        for p in directory.rglob('*')
        if p.is_file() and p.suffix.lower() in {'.html', '.css', '.js'}
        and not any(part.startswith('.') for part in p.relative_to(directory).parts)
    )
    projects[directory.name] = files
(root / 'js' / 'source-manifest.json').write_text(
    json.dumps(projects, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
)
