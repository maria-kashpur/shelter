class HeaderView {
  static get burger() {
    const el = document.querySelector(".header__burger");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".header__burger is not found");
    return el;
  }

  static get menu() {
    const el = document.querySelector(".header__menu");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".header__menu is not found");
    return el;
  }

  static get menuList() {
    const el = document.querySelector(".menu__list");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".header__burger is not found");
    return el;
  }
}

export default function createBurger() {
  const burger = HeaderView.burger;
  const headerMenu = HeaderView.menu;
  const menuList = HeaderView.menuList;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menuList.classList.toggle("active");
    headerMenu.classList.toggle("active");
    document.body.classList.toggle("lock");
  });

  headerMenu.addEventListener("click", () => {
    if (burger.classList.contains("active")) {
      burger.classList.remove("active");
      menuList.classList.remove("active");
      headerMenu.classList.remove("active");
      document.body.classList.remove("lock");
    }
  });
}