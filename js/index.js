"use strict";

class Button {
  constructor(button) {
    this.button = button;
  }
  buttonHandler() {
    this.button.addEventListener("click", startGame);
  }
  changeDifficulty(time) {
    this.button.addEventListener("click", () => {
      difficultyLevel.level = time;
      updateGame();
    });
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
  getRndCell(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  activateRndCell() {
    for (const key in this) {
      const currentCell = this[key][this.getRndCell(0, 99)];
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
  constructor(
    alert,
    alertTitle = document.querySelector(".game_title"),
    alertTitleMsg = 0,
    alertMsg = document.querySelector(".game_message"),
    alertText = 0
  ) {
    this.alert = alert;
    this.alertTitle = alertTitle;
    this.alertTitle.textContent = alertTitleMsg;
    this.alertMsg = alertMsg;
    this.alertMsg.textContent = alertText;
  }
  // addTitleMsg(titleMsg) {
  //   this.alertTitle.textContent = alertTitleMsg;
  // }
  showAlert() {
    this.alert.classList.add("display_block");
  }
}

class Timer {
  constructor(delay) {
    this.delay = delay;
    this.remaining = this.delay;
    this.timerId;
    this.start;
  }
  pause() {}
  resume() {
    start = Date.now();
    timerId = setTimeout(() => {}, timeout);
  }
}

const userScore = new GameScore(document.querySelector(".user_number"), 0);

const computerScore = new GameScore(
  document.querySelector(".computer_number"),
  0
);

const difficultyLevel = new DifficultyLevel(5);

const startButton = new Button(document.querySelector(".button"));

const tableCell = new TableCell(document.querySelectorAll("td"));

startButton.buttonHandler();

const easyBtn = new Button(document.querySelector(".easy_btn"));
const mediumBtn = new Button(document.querySelector(".medium_btn"));
const hardBtn = new Button(document.querySelector(".hard_btn"));

easyBtn.changeDifficulty(1500);
mediumBtn.changeDifficulty(1000);
hardBtn.changeDifficulty(500);

const computerScoreAlert = (arg) => {
  clearTimeout(arg);
  const gameAlert = new GameAlert(
    document.querySelector(".game_alert"),
    document.querySelector(".game_title"),
    "Computer win",
    document.querySelector(".game_message"),
    `Computer score: ${computerScore.counter}, your score: ${userScore.counter}`
  );
  gameAlert.showAlert();
};

const userScoreAlert = (arg) => {
  clearTimeout(arg);
  const gameAlert = new GameAlert(
    document.querySelector(".game_alert"),
    document.querySelector(".game_title"),
    "You win",
    document.querySelector(".game_message"),
    `Computer score: ${computerScore.counter}, your score: ${userScore.counter}`
  );
  gameAlert.showAlert();
};

let timer, redTimer, isFinished;

// function updateGame() {
//   tableCell.tableCell.forEach((element) => {
//     element.className = "";
//     const gameAlert = new GameAlert(document.querySelector(".game_alert"));
//   });
// }
function startGame() {
  if (!isFinished) startButton.button.textContent = "Start game";
  if (this.className === "button game_started") {
    clearTimeout(timer);
    this.classList.remove("game_started");
    startButton.button.textContent = "Resume game";
    return;
  }
  this.classList.add("game_started");
  tableCell.listenClick();
  timer = setTimeout(function tick() {
    if (computerScore.counter >= 50) {
      computerScoreAlert(timer);
      isFinished = true;
      return;
    } else if (userScore.counter >= 50) {
      userScoreAlert(timer);
      isFinished = true;
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
    redTimer = setTimeout(function redTick() {
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
