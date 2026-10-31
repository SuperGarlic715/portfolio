document.getElementById('crtModal').addEventListener('show.bs.modal', function(e){
  const t=e.relatedTarget;if(!t)return;
  const img=t.getAttribute('data-img')||'';const title=t.getAttribute('data-title')||'';
  const modalImg=document.getElementById('crtModalImg');
  const modalTitle=document.getElementById('crtModalTitle');
  modalImg.src=img;modalImg.alt=title;modalTitle.textContent=title;
});