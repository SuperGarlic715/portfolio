  const toggleBtn = document.getElementById("menuToggle");
  const menu = document.getElementById("gnb");
  const menuItems = document.querySelectorAll("#gnb .has_sub");
  const header = document.querySelector("header");

  // 1. 햄버거 버튼 토글
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    menu.classList.toggle("open");
  });

  // 2. 아코디언 메뉴 - 1뎁스 <p> 클릭 시에만 동작
  menuItems.forEach(item => {
    const title = item.querySelector("a");
    if (title) {
      title.addEventListener("click", function (e) {
        e.stopPropagation();
        const isActive = item.classList.contains("active");
        menuItems.forEach(i => i.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    }
  });

  // 3. 메뉴 외부 클릭 시 닫힘 처리
  document.addEventListener("click", function (e) {
    const isClickInside = menu.contains(e.target) || toggleBtn.contains(e.target);
    if (!isClickInside && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggleBtn.classList.remove("active");
      menuItems.forEach(i => i.classList.remove("active"));
    }
  });