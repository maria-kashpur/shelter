import getOurFriendsData from "./getOurFriendsData";

class PopapView {
  static get wrapper() {
    const popap = document.querySelector(".popap");
    if (!popap || !(popap instanceof HTMLElement))
      throw new Error(".popap is not found");
    return popap;
  }

  static get closeBtn() {
    const btn = document.querySelector(".popap__x");
    if (!btn || !(btn instanceof HTMLElement))
      throw new Error(".popap__x is not found");
    return btn;
  }

  static get content() {
    const el = document.querySelector(".popap__block");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".popap__block is not found");
    return el;
  };
}

class PopapContentView {
  static get cardTitle() {
    const el = document.querySelector(".title");
    if (!el || !(el instanceof HTMLElement))
      throw new Error(".title is not found");
    return el;
  }

  static get photo() {
    const el = document.getElementById("pet_photo")?.querySelector("img");
    if (!el || !(el instanceof HTMLImageElement))
      throw new Error("photo is not found");
    return el;
  }

  static get name() {
    const el = document.getElementById("pet_name");
    if (!el || !(el instanceof HTMLImageElement))
      throw new Error("#pet_name is not found");
    return el;
  }

  static get typeAndBreed() {
    const el = document.getElementById("type_and_breed");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#type_and_breed is not found");
    return el;
  }

  static get description() {
    const el = document.getElementById("description");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#description is not found");
    return el;
  }

  static get age() {
    const el = document.getElementById("age");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#age is not found");
    return el;
  }

  static get inoculations() {
    const el = document.getElementById("inoculations");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#inoculations is not found");
    return el;
  }

  static get diseases() {
    const el = document.getElementById("diseases");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#diseases is not found");
    return el;
  }

  static get parasites() {
    const el = document.getElementById("parasites");
    if (!el || !(el instanceof HTMLElement))
      throw new Error("#parasites is not found");
    return el;
  }
}

export default async function createPopap() {
  const popapData = await getOurFriendsData();
  const popap = PopapView.wrapper;
  const activePopapBtns = document.querySelectorAll(".our-friend__card");
  const closePopapBtn = PopapView.closeBtn;
  const popapBlock = PopapView.content;

  function showPopap() {
    popap.classList.add("active");
    document.body.classList.add("lock");

    const cardTitle = PopapContentView.cardTitle.textContent;
    const photo = PopapContentView.photo;
    const name = PopapContentView.name;
    const typeAndBreed = PopapContentView.typeAndBreed;
    const description = PopapContentView.description;
    const age = PopapContentView.age;
    const inoculations = PopapContentView.inoculations;
    const diseases = PopapContentView.diseases;
    const parasites = PopapContentView.parasites;

    for (let key in popapData) {
      if (popapData[key].name === cardTitle) {
        photo.src = popapData[key].img;
        name.textContent = popapData[key].name;
        typeAndBreed.textContent = `${popapData[key].type} - ${popapData[key].breed}`;
        description.textContent = popapData[key].description;
        age.textContent = popapData[key].age;
        inoculations.textContent = popapData[key].inoculations.reduce(
          (accum, _el, _item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = "");
          }
        );
        diseases.textContent = popapData[key].diseases.reduce(
          (accum, _el, _item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = "");
          }
        );
        parasites.textContent = popapData[key].parasites.reduce(
          (accum, _el, _item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = "");
          }
        );
      }
    }
  }
  function hidePopap() {
    popap.classList.remove("active");
    document.body.classList.remove("lock");
  }

  activePopapBtns.forEach((el) => el.addEventListener("click", showPopap));
  closePopapBtn.addEventListener("click", hidePopap);
  popap.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(popapBlock);
    if (!withinBoundaries) {
      hidePopap();
    }
  });
}
