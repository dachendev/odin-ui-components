import "@fortawesome/fontawesome-free/js/brands.js";
import "@fortawesome/fontawesome-free/js/fontawesome.js";
import "@fortawesome/fontawesome-free/js/regular.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import Image2 from "./assets/google-deepmind-LuzT78A1g7M-unsplash.jpg";
import Image1 from "./assets/google-deepmind-dxtkv8qLaY0-unsplash.jpg";
import Image3 from "./assets/google-deepmind-q3BV2kQvoUU-unsplash.jpg";
import "./main.css";
import Carousel from "./modules/carousel.js";
import Dropdown from "./modules/dropdown.js";

function domLoaded() {
  // Create dropdown
  const dropdown = document.querySelector(".dropdown");
  Dropdown.create(dropdown);

  // Create carousel
  const carousel = document.querySelector(".carousel");
  const inner = carousel.querySelector(".carousel-inner");

  const images = [
    {
      src: Image1,
      alt: "Image 1",
      caption: "Photo by Google DeepMind on Unsplash",
    },
    {
      src: Image2,
      alt: "Image 2",
      caption: "Photo by Google DeepMind on Unsplash",
    },
    {
      src: Image3,
      alt: "Image 3",
      caption: "Photo by Google DeepMind on Unsplash",
    },
  ];

  images.forEach(async (image) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    item.appendChild(img);

    const caption = document.createElement("div");
    caption.classList.add("carousel-caption");
    caption.textContent = image.caption;
    item.appendChild(caption);

    inner.appendChild(item);
  });

  Carousel.create(carousel);
}

document.addEventListener("DOMContentLoaded", domLoaded);
