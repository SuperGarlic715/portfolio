(function initZoomWhenReady(){
  function ready(){ return window.gsap && window.ScrollTrigger && document.querySelectorAll('.zoom-con').length; }
  function splitChars(el){
    if(!el) return [];
    const nodes=[]; (function walk(n){
      if(n.nodeType===3){
        const f=document.createDocumentFragment(), t=n.textContent;
        for(let i=0;i<t.length;i++){
          const ch=t[i], sp=document.createElement('span');
          sp.textContent=(ch===' ')?' ':ch; sp.style.display='inline-block';
          if(ch===' ') sp.style.width='0.35em';
          f.appendChild(sp); nodes.push(sp);
        }
        n.parentNode.replaceChild(f,n);
      } else if(n.nodeType===1){ [...n.childNodes].forEach(walk); }
    })(el); return nodes;
  }

  function start(){
    gsap.registerPlugin(ScrollTrigger);

    // 전체 스크롤 길이
    const SECTION_LEN   = 100;

    // 풀 이미지 머무름"
    const IMG_IN_AT     = 0.40; // 이미지 진입 시작(앞당김)
    const IMG_IN_DUR    = 0.60; // 이미지 확대 시간(단축 → 빨리 100% 도달)
    const EXIT_AT       = 0.96; // 종료 시작(뒤로 밀어 정지구간 확보)

    document.querySelectorAll('.zoom-con').forEach((wrap)=>{
      const img     = wrap.querySelector('img');
      const overlay = wrap.querySelector('.overlay');
      const titleEl = wrap.querySelector('.headline');

      const chars = titleEl?.querySelector('span') ? [...titleEl.querySelectorAll('span')] : splitChars(titleEl);

      gsap.set(overlay, { yPercent:28, opacity:1 });
      gsap.set(img,     { opacity:0, scale:0.85, yPercent:12, borderRadius:40, willChange:'transform,opacity', force3D:true });
      gsap.set(chars,   { opacity:0, y:26 });
      gsap.set(titleEl, { color:'#000' });

      const tl = gsap.timeline({
        defaults:{ ease:'power3.out', overwrite:'auto' },
        scrollTrigger:{
          trigger:wrap,
          start:'top top',
          end:`+=${SECTION_LEN}%`,
          scrub:1.2,
          pin:true,
          anticipatePin:1,
          invalidateOnRefresh:true
        }
      });

      // 타이밍
      tl.add('enter',    0.00)
        .add('textRise', 0.04)          // 텍스트 먼저 등장
        .add('imgIn',    IMG_IN_AT)
        .add('exit',     EXIT_AT);

      // 오버레이 진입
      tl.to(overlay, { yPercent:0, duration:0.9 }, 'enter');

      // 텍스트(검정) 등장
      tl.fromTo(
        chars,
        { opacity:0, y:26 },
        { opacity:1, y:0, duration:0.78, stagger:0.012, immediateRender:false },
        'textRise'
      );

      // 이미지 진입
      tl.fromTo(
        img,
        { opacity:0, scale:0.85, yPercent:12, borderRadius:40},
        { opacity:1, scale:1, yPercent:0, borderRadius:0, duration:IMG_IN_DUR, ease:'power2.out', immediateRender:false },
        'imgIn'
      );

      // 텍스트 색 전환(검정 → 흰색): 이미지와 ‘닿을 즈음’
      tl.to(titleEl, { color:'#fff', duration:0.8, ease:'power2.out' }, 'imgIn+=0.04');

      // 종료
      tl.to(chars, { duration:0.42, stagger:{ each:0.006, from:'end' }, ease:'power1.out' }, 'exit')
        .to(img,   { duration:0.55, ease:'power2.inOut' }, 'exit+=0.02');
    });
  }

  if(ready()) start();
  else {
    const iv = setInterval(()=>{ if(ready()){ clearInterval(iv); start(); } }, 30);
    setTimeout(()=>clearInterval(iv), 4000);
  }
})();