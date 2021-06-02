"use strict";

class Button {
  constructor(button) {
    this.button = button;
  }
  buttonHandler() {
    this.button.addEventListener("click", startGame);
  }
  beginGame() {
    startGame.bind(this.button)();
  }
  changeDifficulty(time) {
    this.button.addEventListener("click", () => {
      updateGame();
      difficultyLevel.difficulty = time;
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
    return Math.floor(Math.random() * 100);
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
    alert = document.querySelector(".game_alert"),
    alertTitle = document.querySelector(".game_title"),
    alertMsg = document.querySelector(".game_message")
  ) {
    this.alert = alert;
    this.alertTitle = alertTitle;
    this.alertMsg = alertMsg;
  }
  addTitleMsg(alertTitleMsg) {
    this.alertTitle.textContent = alertTitleMsg;
  }
  addMsgText(alertText) {
    this.alertMsg.textContent = alertText;
  }
  showAlert() {
    this.alert.classList.add("display_block");
  }
  hideAlert() {
    this.alert.classList.remove("display_block");
  }
}

class MainTitle {
  constructor(title) {
    this.title = title;
  }
  changeColor() {
    this.title.addEventListener("mousemove", () => {
      const titleArr = this.title.textContent.split("");
      const colorTitleArr = titleArr.map((element) => {
        const span = document.createElement("span");
        span.textContent = element;
        span.style.color = getRandomColor();
        return span;
      });
      this.title.textContent = "";
      this.title.append(...colorTitleArr);
    });
  }
}

const userScore = new GameScore(document.querySelector(".user_number"), 0);

const computerScore = new GameScore(
  document.querySelector(".computer_number"),
  0
);

const difficultyLevel = new DifficultyLevel(1000);

const startButton = new Button(document.querySelector(".button"));

startButton.buttonHandler();

const tableCell = new TableCell(document.querySelectorAll("td"));

const easyBtn = new Button(document.querySelector(".easy_btn"));
const mediumBtn = new Button(document.querySelector(".medium_btn"));
const hardBtn = new Button(document.querySelector(".hard_btn"));

easyBtn.changeDifficulty(1500);
mediumBtn.changeDifficulty(1000);
hardBtn.changeDifficulty(500);

const mainTitle = new MainTitle(document.querySelector(".main_title"));

mainTitle.changeColor();

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const computerScoreAlert = (arg) => {
  clearTimeout(arg);
  const gameAlert = new GameAlert();
  gameAlert.addTitleMsg("Computer win");
  gameAlert.addMsgText(
    `Computer score: ${computerScore.counter}, your score: ${userScore.counter}`
  );
  gameAlert.showAlert();
};

const userScoreAlert = (arg) => {
  clearTimeout(arg);
  const gameAlert = new GameAlert();
  gameAlert.addTitleMsg("You win");
  gameAlert.addMsgText(
    `Computer score: ${computerScore.counter}, your score: ${userScore.counter}`
  );
  gameAlert.showAlert();
};

let timer, redTimer, isFinished;

const scoreReset = () => {
  userScore.score.textContent = 0;
  computerScore.score.textContent = 0;
  userScore.counter = 0;
  computerScore.counter = 0;
};

const updateGame = () => {
  tableCell.tableCell.forEach((element) => {
    element.className = "";
  });
  const gameAlert = new GameAlert(document.querySelector(".game_alert"));
  gameAlert.hideAlert();
  scoreReset();
  startButton.button.className = "button";
  startButton.beginGame();
};

function startGame() {
  if (!isFinished) startButton.button.textContent = "Start Game";
  if (this.className === "button game_started") {
    clearTimeout(redTimer);
    clearTimeout(timer);
    this.classList.remove("game_started");
    startButton.button.textContent = "Resume game";
    return;
  }
  this.classList.add("game_started");
  tableCell.listenClick();
  timer = setTimeout(function tick() {
    let activeCell = tableCell.activateRndCell();
    activeCell.addEventListener("click", () => {
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
    if (computerScore.counter >= 50) {
      computerScoreAlert(timer);
      isFinished = true;
      return;
    } else if (userScore.counter >= 50) {
      userScoreAlert(timer);
      isFinished = true;
      return;
    }
    timer = setTimeout(tick, difficultyLevel.difficulty);
  }, difficultyLevel.difficulty);
}
