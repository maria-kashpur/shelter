
import getOurFriendsData from "./getOurFriendsData";

export default async function createPagination() {
  //получаем данные из json
  const data = await getOurFriendsData();
  const paginationData = propagateAndShakeCards(6);

  // перемешиваем и размножаем карточки
  function propagateAndShakeCards(num) {
    const result = [];

    function shakeArr(arr) {
      return arr.reduce((accum, el) => {
        let index = getRamdomNum(0, 8);
        while (accum[index] !== undefined) {
          index = getRamdomNum(0, 8);
        }
        accum[index] = el;
        return accum;
      }, []);
    }
    function getRamdomNum(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    }

    while (num > 0) {
      let arr = shakeArr(data);
      result.push(...arr);
      num--;
    }
    return result;
  }

  // кнопки управления
  const paginationStartBtn = document.querySelector(".pagination__start");
  const paginationPrevBtn = document.querySelector(".pagination__prev");
  const paginationNextBtn = document.querySelector(".pagination__next");
  const paginationEndBtn = document.querySelector(".pagination__end");
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
  function showList(paginationData, amountItems, currentPage) {
    currentPage--;
    // общий контейнер для карточек
    const paginationList = document.querySelector(".pagination__list");

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
  showList(paginationData, amountItems, currentPage);

  // показывает количество страниц
  function showStatus() {
    const paginationStatus = document.querySelector(".pagination__num span");
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
    showList(paginationData, amountItems, currentPage);
    checkActiveBtn();
    return currentPage;
  });

  // end
  paginationEndBtn.addEventListener("click", () => {
    currentPage = lastPage;
    showList(paginationData, amountItems, currentPage);
    checkActiveBtn();
    return currentPage;
  });

  //prev
  paginationPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showList(paginationData, amountItems, currentPage);
      checkActiveBtn();
      return currentPage;
    }
  });

  // next
  paginationNextBtn.addEventListener("click", () => {
    if (currentPage < lastPage) {
      currentPage++;
      showList(paginationData, amountItems, currentPage);
      checkActiveBtn();
      return currentPage;
    }
  });

  // следим за размером окна браузера, чтобы при изменении количества карточер на странице пагинация пересчитывалась
  window.addEventListener("resize", (e) => {
    if (amountItems !== toCountItems()) {
      amountItems = toCountItems();
      currentPage = 1;
      lastPage = Math.ceil(paginationData.length / amountItems);
      showList(paginationData, amountItems, currentPage);
      checkActiveBtn();
    }
  });
}
