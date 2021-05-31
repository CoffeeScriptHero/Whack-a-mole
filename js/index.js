"use strict";

const startButton = document.querySelector(".button");
const tableCell = document.querySelectorAll("td");

startButton.addEventListener("click", startGame);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  tableCell[getRndInteger(1, 100)].classList.add("green");
}
