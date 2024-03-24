export default function createBurger() {
  const burger = document.querySelector(".header__burger");
  const headerMenu = document.querySelector(".header__menu");
  const menuList = document.querySelector(".menu__list");
  const header = document.querySelector(".header");
  const body = document.body;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menuList.classList.toggle("active");
    headerMenu.classList.toggle("active");
    body.classList.toggle("lock");
  });

  headerMenu.addEventListener("click", () => {
    if (burger.classList.contains("active")) {
      burger.classList.remove("active");
      menuList.classList.remove("active");
      headerMenu.classList.remove("active");
      body.classList.remove("lock");
    }
  });
}