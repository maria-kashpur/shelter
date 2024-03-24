export default async function createSlider() {
  const sliderData = await getOurFriendsData();
  const sliderTrack = document.querySelector(".slider__track");
  const controls = document.querySelector(".slider__controls");
  const sliderNext = document.querySelector(".slider__next");
  const sliderPrev = document.querySelector(".slider__prev");
  let cardsOrder = [];

  // формируем слайды на основе данных из json
function createSliderTrack() {
    sliderTrack.innerHTML = "";
    for (let key in sliderData) {
      sliderTrack.innerHTML += `<div class="slider__item">
         <div class="our-friend__card">
            <div class="photo"><img src="${sliderData[key].img}" alt="pet"></div>
            <h3 class="title">${sliderData[key].name}</h3>
            <button class="button batton-transparent">Learn more</button>
         </div>
      </div>`;
    }
  }
  createSliderTrack();

  const sliderItems = document.querySelectorAll(".slider__item");

  // присваиваем каждому слайду случайный order
  function createQueueCards() {
    const amountSliderItems = sliderItems.length;

    function getRandomOrder() {
      let randomOrder = getRamdomNum(1, amountSliderItems + 1);
      if (cardsOrder.includes(randomOrder)) {
        return getRandomOrder();
      } else {
        cardsOrder.push(randomOrder);
        return randomOrder;
      }
    }
    sliderItems.forEach((el) => (el.style.order = `${getRandomOrder()}`));
    console.log(cardsOrder);
  }
  createQueueCards();

  // получаем случайное число в нужном диапазоне
  function getRamdomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  function getCurrentCarsOrder() {
    cardsOrder = [];
    sliderItems.forEach((el) => cardsOrder.push(+el.style.order));
    return cardsOrder;
  }

  function shakeCards() {
    let newOrders = getCurrentCarsOrder().reduce((accum, el, index, arr) => {
      if (
        el <= getQuantitySliderItem() * 2 &&
        el > arr.length - getQuantitySliderItem()
      ) {
        accum.push(el);
      } else {
        let order = getRamdomNum(1, sliderItems.length + 1);
        while (accum.includes(order)) {
          order = getRamdomNum(1, sliderItems.length + 1);
        }
        accum.push(order);
      }
      return accum;
    }, []);
    sliderItems.forEach(
      (el, index) => (el.style.order = `${newOrders[index]}`)
    );
    cardsOrder = newOrders;
  }

  // высчитываем, сколько сейчас колонок в слайдере
  function getQuantitySliderItem() {
    const sliderItems = document.querySelectorAll(".slider__item");
    let numberOfVisibleSlides = 0;
    sliderItems.forEach((el) => {
      if (el.offsetTop === 0) numberOfVisibleSlides += 1;
    });
    return numberOfVisibleSlides;
  }

  function countClickOfControls() {
    let counterClickNext = 0;
    let counterClickPrev = 0;
    controls.addEventListener("click", (e) => {
      const clickNext = e.composedPath().includes(sliderNext);
      const clickPrev = e.composedPath().includes(sliderPrev);
      if (clickPrev) {
        counterClickPrev === 2 ? counterClickPrev : (counterClickPrev += 1);
      }
      if (clickNext) {
        counterClickNext === 2 ? counterClickNext : (counterClickNext += 1);
      }
      if (counterClickPrev === 1 && counterClickNext === 1) {
        counterClickNext = 0;
        counterClickPrev = 0;
      }
      if (counterClickPrev === 2 && counterClickNext === 2) {
        shakeCards();
        counterClickNext = 0;
        counterClickPrev = 0;
      }
    });
  }
  countClickOfControls();

  sliderPrev.addEventListener("click", () => {
    sliderItems.forEach((el, index, arr) => {
      function createCarouselAnimation() {
        if (+el.style.order > arr.length - getQuantitySliderItem()) {
          el.classList.add("click");
          el.style.setProperty("--x", `${sliderTrack.offsetWidth}px`);
          el.style.setProperty("--y", `-${el.offsetTop}px`);
        } else {
          el.classList.add("move");
          el.style.setProperty("--x", `-${sliderTrack.offsetWidth}px`);
        }
      }

      function deleteClass() {
        el.classList.remove("click");
        el.classList.remove("move");
      }

      function increaseOrder() {
        let num = getQuantitySliderItem();
        let order = Number(el.style.order);
        if (order > arr.length - num) {
          el.style.order = `${order - arr.length + num}`;
        } else {
          el.style.order = `${order + num}`;
        }
      }
      createCarouselAnimation();
      setTimeout(increaseOrder, 200);
      setTimeout(deleteClass, 200);
    });
  });

  sliderNext.addEventListener("click", () => {
    sliderItems.forEach((el, index, arr) => {
      function createCarouselAnimation() {
        if (
          +el.style.order > getQuantitySliderItem() &&
          +el.style.order <= getQuantitySliderItem() * 2
        ) {
          el.classList.add("click");
          el.style.setProperty("--x", `-${sliderTrack.offsetWidth}px`);
          el.style.setProperty("--y", `-${el.offsetTop}px`);
        } else {
          el.classList.add("move");
          el.style.setProperty("--x", `${sliderTrack.offsetWidth}px`);
        }
      }

      function deleteClass() {
        el.classList.remove("click");
        el.classList.remove("move");
      }

      function decreaseOrder() {
        let num = getQuantitySliderItem();
        let order = Number(el.style.order);
        if (order <= num) {
          el.style.order = `${arr.length - (num - order)}`;
        } else {
          el.style.order = `${order - num}`;
        }
      }

      createCarouselAnimation();
      setTimeout(decreaseOrder, 200);
      setTimeout(deleteClass, 200);
    });
  });
}
