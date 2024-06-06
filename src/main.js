import "@fortawesome/fontawesome-free/js/brands.js";
import "@fortawesome/fontawesome-free/js/fontawesome.js";
import "@fortawesome/fontawesome-free/js/regular.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import "./main.css";
import Dropdown from "./modules/dropdown.js";
import Carousel from "./modules/carousel.js";

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    Dropdown.create(dropdown);
  });
}

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    Carousel.create(carousel);
  });
}

function domLoaded() {
  initDropdowns();
  initCarousels();
}

document.addEventListener("DOMContentLoaded", domLoaded);
