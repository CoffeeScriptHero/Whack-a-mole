"use strict";

class StartButton {
  constructor(button) {
    this.button = button;
  }
  buttonHandler() {
    this.button.addEventListener("click", startGame);
  }
}

class TableCell {
  constructor(tableCell) {
    this.tableCell = tableCell;
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  activateRndCell() {
    for (const key in this) {
      const currentCell = this[key][this.getRndInteger(0, 99)];
      if (currentCell.className === "blue") {
        return;
      } else {
        currentCell.classList.add("blue");
      }
    }
  }
  listenClick() {
    for (const key in this.tableCell) {
      if (this.tableCell[key].tagName === "TD") {
        this.tableCell[key].addEventListener("click", () => {});
      }
    }
  }
}

class DifficultyLevel {
  constructor(difficulty) {
    this.difficulty = difficulty;
  }
}

const difficultyLevel = new DifficultyLevel(1500);

const startButton = new StartButton(document.querySelector(".button"));

startButton.buttonHandler();

const tableCell = new TableCell(document.querySelectorAll("td"));

function startGame() {
  tableCell.listenClick();
  setInterval(() => {
    tableCell.activateRndCell();
  }, difficultyLevel.difficulty);
}
