import "./main.css";
import Dropdown from "./modules/dropdown.js";

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    Dropdown.create(dropdown);
  });
}

function domLoaded() {
  initDropdowns();
}

document.addEventListener("DOMContentLoaded", domLoaded);
