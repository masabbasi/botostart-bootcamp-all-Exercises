import getData from "./httpRequest.js";
const getDog = document.getElementById("getDog");
const image = document.querySelector("img");
const p = document.querySelector("p");
const span = document.querySelector("span");

function saveImage(img) {
  localStorage.setItem("img", `${img}`);
}

async function showDog() {
  p.style.display = "none";
  image.style.display = "none";
  span.style.display = "block";

  try {
    const data = await getData();
    saveImage(data.message);
    span.style.display = "none";
    p.style.display = "none";
    image.style.display = "block";
    image.src = data.message;
  } catch (error) {
    image.style.display = "none";
    span.style.display = "none";
    p.style.display = "block";
    throw TypeError(error.message);
  }
}

function loadImage() {
  const img = localStorage.getItem("img");
  if (img) {
    span.style.display = "none";
    p.style.display = "none";
    image.style.display = "block";
    image.src = `${img}`;
  }
}

getDog.addEventListener("click", showDog);
window.addEventListener("DOMContentLoaded", loadImage);
