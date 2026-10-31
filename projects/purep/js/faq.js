document.querySelectorAll('.faq_item').forEach(item => {
  const question = item.querySelector('.faq_question');
  const wrapper = item.querySelector('.faq_answer_wrapper');
  const answer = wrapper.querySelector('.faq_answer');
  const toggleBtn = item.querySelector('.faq_toggle');

  item.addEventListener('click', () => {
    const isOpen = wrapper.style.maxHeight && wrapper.style.maxHeight !== '0px';

    // 모두 닫기
    document.querySelectorAll('.faq_answer_wrapper').forEach(w => w.style.maxHeight = null);
    document.querySelectorAll('.faq_toggle').forEach(btn => btn.classList.remove('rotate'));

    if (!isOpen) {
      wrapper.style.maxHeight = answer.scrollHeight + "px";
      toggleBtn.classList.add('rotate');
    }
  });

  // 버튼 클릭 시 이벤트 버블링 방지 (필요시)
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
  });
});
