const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const pickMove = pickComputerMove();
      playGame(pickMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-autoPlay-button").innerText = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-autoPlay-button").innerText = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose 💔";
    } else if (computerMove === "paper") {
      result = "You win 🎉";
    } else if (computerMove === "scissors") {
      result = "Tie 🤝";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win 🎉";
    } else if (computerMove === "paper") {
      result = "Tie 🤝";
    } else if (computerMove === "scissors") {
      result = "You Lose 💔";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "paper") {
      result = "You Lose 💔";
    } else if (computerMove === "rock") {
      result = "Tie 🤝";
    } else if (computerMove === "scissors") {
      result = "You win 🎉";
    }
  }
  if (result === "You win 🎉") {
    score.wins = score.wins + 1;
  } else if (result === "You Lose 💔") {
    score.losses = score.losses + 1;
  } else if (result === "Tie 🤝") {
    score.ties = score.ties + 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML =
    `  You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Opponent`;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document
  .querySelector(".js-resetScore-button")
  .addEventListener("click", () => {
    document.querySelector(".js-resetScore-confirmation").innerHTML =
      `Are you sure you want to reset score?
      <button class="js-yes-button">
        Yes
      </button>
      <button class="js-no-button">No</button>`;
    document.querySelector(".js-yes-button").addEventListener("click", () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem("score");
      updateScoreElement();
      document.querySelector(".js-resetScore-confirmation").innerHTML = "";
    });
    document.querySelector(".js-no-button").addEventListener("click", () => {
      document.querySelector(".js-resetScore-confirmation").innerHTML = "";
    });
  });

document.querySelector(".js-autoPlay-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame("rock");
  } else if (event.key === "p" || event.key === "P") {
    playGame("paper");
  } else if (event.key === "s" || event.key === "S") {
    playGame("scissors");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "Backspace") {
    document.querySelector(".js-resetScore-confirmation").innerHTML =
      `Are you sure you want to reset score?
      <button class="js-yes-button">
        Yes
      </button>
      <button class="js-no-button">No</button>`;
    document.querySelector(".js-yes-button").addEventListener("click", () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem("score");
      updateScoreElement();
      document.querySelector(".js-resetScore-confirmation").innerHTML = "";
    });
    document.querySelector(".js-no-button").addEventListener("click", () => {
      document.querySelector(".js-resetScore-confirmation").innerHTML = "";
    });
  }
});
