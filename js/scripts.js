"use restrict";

// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// elements
const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height-input");
const weightInput = document.querySelector("#weight-input");
const calcBtn = document.querySelector("#calc-btn");
const cleanBtn = document.querySelector("#clean-btn");
const imcResult = document.querySelector("#imc-result span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

// functions
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("line-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcResult.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function showOrHide() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// initial setup
createTable(data);

// events
[heightInput, weightInput].forEach((element) => {
  element.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);
    e.target.value = updateValue;
  });
});

cleanBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");
  // console.log(height,weight);
  if (!height || !weight) return;
  const imc = calcImc(height, weight);
  //   console.log(imc);
  let info;
  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  //   console.log(info);
  if (!info) return;
  imcResult.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcResult.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcResult.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcResult.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcResult.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcResult.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }
  showOrHide();
});

backBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHide();
});
