import './styles/style.scss';
import createBurger from './scripts/createBurger';
import createPagination from './scripts/createPagination';
import createSlider from "./scripts/createSlider";
import createPopap from './scripts/createPopap';

createBurger()



const sliderBox = document.querySelector(".slider");
if (!sliderBox) {
  createSlider()
}

const paginationBox = document.querySelector(".pagination");
if (!paginationBox) {
  createPagination()
}

const popapBox = document.querySelector(".popap"); 
if (!popapBox) {
  createPopap()
}