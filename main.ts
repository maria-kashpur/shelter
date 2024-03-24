import "./src/styles/style.scss";

import createBurger from './src/scripts/createBurger'
import createPagination from "./src/scripts/createPagination";
import createSlider from "./src/scripts/createSlider";
import createPopap from "./src/scripts/createPopap";

createBurger()

const sliderBox = document.querySelector(".slider");
if (sliderBox) {
  createSlider()
}

const paginationBox = document.querySelector(".pagination");
if (paginationBox) {
  createPagination()
}

const popapBox = document.querySelector(".popap"); 
if (popapBox) {
  createPopap()
}