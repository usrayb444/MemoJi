// Initializing cards
var emojis = [
  "😊",
  "🌟",
  "🐯",
  "🍕",
  "🎈",
  "🚀",
  "🌺",
  "🐧",
  "😊",
  "🌟",
  "🐯",
  "🍕",
  "🎈",
  "🚀",
  "🌺",
  "🐧",
];

// Shuffling cards
emojis = shuffle(emojis);

// Generating
var container = document.querySelector(".memory-game");
var openCards = [];
var firstMoveMade = false;
var timerInterval;
var moves = 0;
var seconds = 0;

for (let i = 0; i < emojis.length; i++) {
  var card = document.createElement("div");
  card.classList.add("card");

  card.onclick = function () {
    moves++;
    onFirstMove();
    if (!this.classList.contains("boxOpen") && openCards.length < 2) {
      this.classList.add("boxOpen");
      openCards.push(this);
        
      if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  };

  var emo = document.createElement("span");
  emo.textContent = emojis[i];
  card.appendChild(emo);
  container.appendChild(card);
}

// Needed functions
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards.forEach(function (card) {
      card.classList.add("boxMatch");
    });

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        stopTimer()
        var score = Math.round((moves / 2) * (100 - seconds));
        var alertMessage = "Congratulations!\nYou completed the game in " + seconds + " seconds with " + moves + " moves.\nYour score is: " + score;
        alert(alertMessage);
    }
  } else {
    openCards.forEach(function (card) {
      card.classList.remove("boxOpen");
    });
  }

  openCards = [];
}

function onFirstMove() {
  if (!firstMoveMade) {
    firstMoveMade = true;
    startTimer();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    seconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimer() {
  document.getElementById("time").textContent = seconds;
}

function restartGame() {
  window.location.reload();
  seconds = 0;
  updateTimer();
  stopTimer();
  firstMoveMade = false;
}