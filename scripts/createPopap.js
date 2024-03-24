import getOurFriendsData from "./getOurFriendsData";

export default async function createPopap() {
  const popapData = await getOurFriendsData();
  const body = document.body;
  const popap = document.querySelector(".popap");
  const activePopapBtns = document.querySelectorAll(".our-friend__card");
  const closePopapBtn = document.querySelector(".popap__x");
  const popapBlock = document.querySelector(".popap__block");

  function showPopap() {
    popap.classList.add("active");
    body.classList.add("lock");

    const cardTitle = this.querySelector(".title").textContent;
    const photo = document.getElementById("pet_photo").querySelector("img");
    const name = document.getElementById("pet_name");
    const typeAndBreed = document.getElementById("type_and_breed");
    const description = document.getElementById("description");
    const age = document.getElementById("age");
    const inoculations = document.getElementById("inoculations");
    const diseases = document.getElementById("diseases");
    const parasites = document.getElementById("parasites");

    for (let key in popapData) {
      if (popapData[key].name === cardTitle) {
        photo.src = popapData[key].img;
        name.textContent = popapData[key].name;
        typeAndBreed.textContent = `${popapData[key].type} - ${popapData[key].breed}`;
        description.textContent = popapData[key].description;
        age.textContent = popapData[key].age;
        inoculations.textContent = popapData[key].inoculations.reduce(
          (accum, el, item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = arr);
          }
        );
        diseases.textContent = popapData[key].diseases.reduce(
          (accum, el, item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = arr);
          }
        );
        parasites.textContent = popapData[key].parasites.reduce(
          (accum, el, item, arr) => {
            return arr.length > 1 ? (accum = arr.join(", ")) : (accum = arr);
          }
        );
      }
    }
  }
  function hidePopap() {
    popap.classList.remove("active");
    body.classList.remove("lock");
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
