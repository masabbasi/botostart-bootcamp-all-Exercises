import { saveData, getData } from "./db.js";

const progressSteps = document.querySelector(".progressSteps__steps");
const nextButton = document.querySelector(".progressSteps__next");
const prevButton = document.querySelector(".progressSteps__prev");
const circles = document.querySelectorAll(".circle");
const lines = document.querySelectorAll(".line");
const bodies = document.querySelectorAll(".progressSteps__body");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const cardNumberInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvv2Input = document.getElementById("cvv2");
const cardNumber = document.querySelector(".cardNumber");
const cardFullName = document.querySelector(".cardFullName");
const cardDate = document.querySelector(".cardDate");
const cardCvv2 = document.querySelector(".cardCvv2");

let step = 0;
let cardValues = {
  name: null,
  lastName: null,
  cardNumber: null,
  month: null,
  year: null,
  cvv2: null,
};
let allStep = bodies.length;

const nextHandler = () => {
  if (step < allStep - 1) {
    step++;
    cardValue();
    saveData(step, cardValues);
    circles[step].style.borderColor = "#3096d7";
    lines[step - 1].style.backgroundColor = "#3096d7";
    showBody();
  }
};

const prevHandler = () => {
  if (step > 0) {
    --step;
    cardValue();
    saveData(step, cardValues);
    circles[step + 1].style.borderColor = "gray";
    lines[step].style.backgroundColor = "gray";
    showBody();
  }
};

const setStepColor = () => {
  for (let i = 0; i <= step; i++) {
    circles[i].style.borderColor = "#3096d7";
    if (i > 0) lines[i - 1].style.backgroundColor = "#3096d7";
  }

  for (let i = +step + 1; i <= allStep - 1; i++) {
    console.log(circles[i]);
    circles[i].style.borderColor = "gray";
    if (i > 0) lines[i - 1].style.backgroundColor = "gray";
  }
};

const stepHandler = (e) => {
  if (e.target.className === "circle") {
    step = +e.target.dataset.circlenumber;
    cardValue();
    saveData(step, cardValues);
    setStepColor();
    showBody();
  }
};

const cardValue = () => {
  cardValues = {
    name: nameInput.value,
    lastName: lastNameInput.value,
    cardNumber: cardNumberInput.value,
    month: monthInput.value,
    year: yearInput.value,
    cvv2: cvv2Input.value,
  };
  cardFullName.innerHTML = `${cardValues.name} ${cardValues.lastName}`;
  cardNumber.innerHTML = cardValues.cardNumber || "";
  cardDate.innerHTML = `${cardValues.month}/${cardValues.year}` || "";
  cardCvv2.innerHTML = cardValues.cvv2 || "";
};

const showBody = () => {
  bodies.forEach((body, index) => {
    if (step == index) {
      body.style.display = "flex";
    } else {
      body.style.display = "none";
    }
  });

  if (step == allStep - 1) {
    nextButton.style.backgroundColor = "gray";
    nextButton.style.disabled = true;
  } else {
    nextButton.style.backgroundColor = "#3096d7";
    nextButton.style.disabled = false;
  }
  if (step == 0) {
    prevButton.style.backgroundColor = "gray";
    prevButton.style.disabled = true;
  } else {
    prevButton.style.backgroundColor = "#3096d7";
    prevButton.style.disabled = false;
  }
  if (step == allStep - 1) {
    cardValue();
  }
};

nextButton.addEventListener("click", nextHandler);
prevButton.addEventListener("click", prevHandler);
progressSteps.addEventListener("click", (e) => stepHandler(e));
document.addEventListener("DOMContentLoaded", () => {
  let inputs = [
    nameInput,
    lastNameInput,
    cardNumberInput,
    monthInput,
    yearInput,
    cvv2Input,
  ];
  const data = getData(inputs);
  step = data.step;
  cardValues = data.values;
  setStepColor();
  cardValue();
  showBody();
});
