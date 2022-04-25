"use strict";

//Variable declaration
let score = 25;
let multiplier = 1;
let secretNumber = selectNumber(multiplier);
let highScore = 0;
let avgSum = 1;
let attemptCount = 1;
let currentLevel = "easy";

//Selectors
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const number = document.querySelector(".number");
const overlay = document.querySelector(".overlay");
const betweenText = document.querySelector(".between");
const btnCloseModal = document.querySelector(".close-modal");

//Event listeners
overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);
document.querySelector(".check").addEventListener("click", checkInput);
document.querySelector(".again").addEventListener("click", restartGame);

//Functions
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function openModal(message) {
  document.querySelector(".modelMessage").textContent = message;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function rangeOfNumbers() {
  betweenText.innerText = `(Between 1 and ${multiplier * 25})`;
}
//Generate the secret number🤫
function selectNumber(multiplier) {
  return 10;
  return Math.trunc(Math.random() * multiplier * 25) + 1;
}

function calcAttempt() {
  avgSum += score;
  attemptCount++;
  if (attemptCount > 5) {
    if (currentLevel === "hard") {
      openModal("you have already masterd this Game, Let's play again!!");
      currentLevel = "easy";
    } else if (currentLevel === "easy" && avgSum / 5 > 15) {
      currentLevel = "medium";
      multiplier = 2;
      openModal("Your level upgraded to MEDIUM!");
    } else if (currentLevel === "medium" && avgSum / 5 > 20) {
      currentLevel = "hard";
      multiplier = 4;
      openModal("Your level upgraded to HARD!!");
    } else openModal("Let's give one more try!!");
    restartGame();
  } else {
    openModal(6 - attemptCount + " attempt left...");
    restartGame(true);
  }
}

function checkInput() {
  const guess = Number(document.querySelector(".guess").value);
  // When there is no input
  if (!guess) {
    displayMessage("⛔️ Enter a valid Number!");
    return;
    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    number.textContent = secretNumber;
    body.style.background = "#52c234";
    number.style.width = "30rem";

    if (score > highScore) highScore = score;
    setTimeout(calcAttempt, 1000);
  } else if (guess !== secretNumber) {
    // When guess is wrong
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // When player lose
      displayMessage("💥 You lost the game!");
      body.style.background = "#f11712";
      document.querySelector(".score").textContent = 0;
      number.textContent = secretNumber;
      setTimeout(calcAttempt, 1000);
    }
  }
}

function restartGame(isPartial = false) {
  score = 25;
  attemptCount = isPartial === true ? attemptCount : 1;
  avgSum = isPartial === true ? avgSum : 0;
  highScore = isPartial === true ? highScore : 0;
  secretNumber = selectNumber(multiplier);
  rangeOfNumbers();

  displayMessage("Start guessing...");
  document.querySelector(".attempt").textContent = attemptCount;
  document.querySelector(".score").textContent = score;
  document.querySelector(".highscore").textContent = highScore;
  number.textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".levelBtn").textContent = currentLevel;

  if (currentLevel === "easy")
    document.body.style.background = `linear-gradient(90deg, rgba(62,180,58,1) 0%, rgba(69,146,252,1) 100%)`;
  else if (currentLevel === "medium")
    document.body.style.background = `linear-gradient(90deg, rgba(58,116,180,1) 0%, rgba(252,69,202,1) 100%)`;
  else if (currentLevel === "hard")
    document.body.style.background = `linear-gradient(90deg, rgba(58,155,180,1) 0%, rgba(252,69,79,1) 100%)`;
  number.style.width = "15rem";
}
