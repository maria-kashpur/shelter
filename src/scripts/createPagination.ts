
import createPopap from "./createPopap";
import getOurFriendsData, { OurFriendsData } from "./getOurFriendsData";
import shakeArr from "./shakeArr";

class PagenationView {
  static get startBtn() {
    const btn = document.querySelector(".pagination__start");
    if (!btn || !(btn instanceof HTMLButtonElement))
      throw new Error(".pagination__start is not found");
    return btn;
  }

  static get prevBtn() {
    const btn = document.querySelector(".pagination__prev");
    if (!btn || !(btn instanceof HTMLButtonElement))
      throw new Error(".pagination__prev is not found");
    return btn;
  }

  static get nextBtn() {
    const btn = document.querySelector(".pagination__next");
    if (!btn || !(btn instanceof HTMLButtonElement))
      throw new Error(".pagination__next is not found");
    return btn;
  }

  static get endBtn() {
    const btn = document.querySelector(".pagination__end");
    if (!btn || !(btn instanceof HTMLButtonElement))
      throw new Error(".pagination__end is not found");
    return btn;
  }

  static get list() {
    const el = document.querySelector(".pagination__list");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".pagination__list is not found");
    return el;
  }

  static get  status() {
    const el = document.querySelector(".pagination__num span");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".pagination__num span is not found");
    return el;
  }
}

export default async function createPagination() {
  //получаем данные из json
  const data = await getOurFriendsData();
  const paginationData = propagateAndShakeCards(6);

  // перемешиваем и размножаем карточки
  function propagateAndShakeCards(num: number) {
    const result = [];
    while (num > 0) {
      let arr = shakeArr(data);
      result.push(...arr);
      num--;
    }
    return result;
  }

  // кнопки управления
  const paginationStartBtn = PagenationView.startBtn;
  const paginationPrevBtn = PagenationView.prevBtn;
  const paginationNextBtn = PagenationView.nextBtn;
  const paginationEndBtn = PagenationView.endBtn;
  // количество карточек на одной странице
  let amountItems = toCountItems();
  // текущая страница
  let currentPage = 1;
  // последняя страница
  let lastPage = Math.ceil(paginationData.length / amountItems);

  function toCountItems() {
    if (window.innerWidth >= 1280) {
      return 8;
    } else if (window.innerWidth >= 768) {
      return 6;
    } else {
      return 3;
    }
  }

  // отрисовка данных
  function showList(paginationData: OurFriendsData[], amountItems: number, currentPage: number) {
    currentPage--;
    // общий контейнер для карточек
    const paginationList = PagenationView.list;

    // обрезаем массив данных
    const start = amountItems * currentPage;
    const end = start + amountItems;
    const paginatedData = paginationData.slice(start, end);

    paginationList.innerHTML = "";
    paginatedData.forEach((el) => {
      paginationList.innerHTML += `<div class="pagination__item">
         <div class="our-friend__card">
            <div class="photo"><img src="${el.img}" alt="pet"></div>
            <h3 class="title">${el.name}</h3>
            <button class="button batton-transparent">Learn more</button>
         </div>
         </div>`;
    });
    createPopap();
  }
  showList(paginationData as OurFriendsData[], amountItems, currentPage);

  // показывает количество страниц
  function showStatus() {
    const paginationStatus = PagenationView.status;
    paginationStatus.textContent = `${currentPage}`;
  }
  showStatus();

  function checkActiveBtn() {
    showStatus();
    paginationStartBtn.classList.remove("inactive");
    paginationPrevBtn.classList.remove("inactive");
    paginationStartBtn.disabled = false;
    paginationPrevBtn.disabled = false;
    paginationEndBtn.classList.remove("inactive");
    paginationNextBtn.classList.remove("inactive");
    paginationEndBtn.disabled = false;
    paginationNextBtn.disabled = false;

    if (currentPage === 1) {
      paginationStartBtn.classList.add("inactive");
      paginationPrevBtn.classList.add("inactive");
      paginationStartBtn.disabled = true;
      paginationPrevBtn.disabled = true;
    }

    if (currentPage === lastPage) {
      paginationEndBtn.classList.add("inactive");
      paginationNextBtn.classList.add("inactive");
      paginationEndBtn.disabled = true;
      paginationNextBtn.disabled = true;
    }
  }

  //start
  paginationStartBtn.addEventListener("click", () => {
    currentPage = 1;
    showList(paginationData as OurFriendsData[], amountItems, currentPage);
    checkActiveBtn();
    return currentPage;
  });

  // end
  paginationEndBtn.addEventListener("click", () => {
    currentPage = lastPage;
    showList(paginationData as OurFriendsData[], amountItems, currentPage);
    checkActiveBtn();
    return currentPage;
  });

  //prev
  paginationPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showList(paginationData as OurFriendsData[], amountItems, currentPage);
      checkActiveBtn();
      return currentPage;
    }
  });

  // next
  paginationNextBtn.addEventListener("click", () => {
    if (currentPage < lastPage) {
      currentPage++;
      showList(paginationData as OurFriendsData[], amountItems, currentPage);
      checkActiveBtn();
      return currentPage;
    }
  });

  // следим за размером окна браузера, чтобы при изменении количества карточки на странице пагинация пересчитывалась
  window.addEventListener("resize", () => {
    if (amountItems !== toCountItems()) {
      amountItems = toCountItems();
      currentPage = 1;
      lastPage = Math.ceil(paginationData.length / amountItems);
      showList(paginationData as OurFriendsData[], amountItems, currentPage);
      checkActiveBtn();
    }
  });
}
