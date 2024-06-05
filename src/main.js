import "./main.css";

function domLoaded() {
  const p = document.createElement("p");
  p.textContent = "Webpack is working!";

  document.body.appendChild(p);
}

window.addEventListener("DOMContentLoaded", domLoaded);
