"use strict";

class StartButton {
  constructor(button) {
    this.button = button;
  }
  buttonHandler() {
    this.button.addEventListener("click", startGame);
  }
}

class GameScore {
  constructor(score, counter) {
    this.score = score;
    this.counter = counter;
    this.score.textContent = counter;
  }
  addOnePoint() {
    this.counter += 1;
    this.score.textContent = this.counter;
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
        return currentCell;
      } else {
        currentCell.classList.add("blue");
        return currentCell;
      }
    }
  }
  listenClick() {
    for (const key in this.tableCell) {
      if (this.tableCell[key].tagName === "TD") {
        this.tableCell[key].addEventListener("click", () => {
          if (this.tableCell[key].className === "blue") {
            this.tableCell[key].classList.remove("blue");
            this.tableCell[key].classList.toggle("green");
          }
        });
      }
    }
  }
}

class DifficultyLevel {
  constructor(difficulty) {
    this.difficulty = difficulty;
  }
}

class GameAlert {
  constructor(alert, alertTitle, alertTitleMsg, alertMsg, alertText) {
    this.alert = alert;
    // this.alertTitle = alertTitle;
    // this.alertTitle.textContent = alertTitleMsg;
    // this.alertMsg = alertMsg;
    // this.alertMsg.textContent = alertText;
  }
  showAlert() {
    this.alert.classList.add("display_block");
  }
}

const userScore = new GameScore(document.querySelector(".user_number"), 0);

const computerScore = new GameScore(
  document.querySelector(".computer_number"),
  0
);

const difficultyLevel = new DifficultyLevel(10);

const startButton = new StartButton(document.querySelector(".button"));

const tableCell = new TableCell(document.querySelectorAll("td"));

startButton.buttonHandler();

function startGame() {
  if (this.className === "button active") return;
  this.classList.add("active");
  tableCell.listenClick();
  let timer = setTimeout(function tick() {
    if (computerScore.counter >= 50 || userScore.counter >= 50) {
      clearTimeout(timer);
      const gameAlert = new GameAlert(document.querySelector(".game_alert"));
      console.log(gameAlert);
      gameAlert.showAlert();
      return;
    }
    let activeCell = tableCell.activateRndCell();
    activeCell.addEventListener("click", () => {
      console.log(activeCell.classList, activeCell.className);
      if (activeCell.className === "green") {
        activeCell.classList.add("clicked");
        userScore.addOnePoint();
      }
    });
    let redTimer = setTimeout(function redTick() {
      if (activeCell.className === "blue") {
        activeCell.classList.remove("blue");
        activeCell.classList.add("red");
        computerScore.addOnePoint();
      }
      redTimer = setTimeout(redTick, difficultyLevel.difficulty);
    }, difficultyLevel.difficulty);

    timer = setTimeout(tick, difficultyLevel.difficulty);
  }, difficultyLevel.difficulty);
}
