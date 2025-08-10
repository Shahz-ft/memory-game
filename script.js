const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let round = 0;
let acceptingInput = false;

const colorButtons = document.querySelectorAll(".color-btn");
const startButton = document.getElementById("start");
const info = document.getElementById("info");

// Light up a color briefly
function flashColor(color) {
  const btn = document.querySelector(`.${color}`);
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 400);
}

// Play the sequence for the player
async function playSequence() {
  acceptingInput = false;
  info.textContent = `Round ${round}`;
  for (let color of sequence) {
    flashColor(color);
    await new Promise(res => setTimeout(res, 600));
  }
  acceptingInput = true;
  playerSequence = [];
}

// Start a new round
function newRound() {
  round++;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  playSequence();
}

// Handle player clicks
function handleClick(e) {
  if (!acceptingInput) return;

  const chosenColor = e.target.dataset.color;
  flashColor(chosenColor);
  playerSequence.push(chosenColor);

  const currentStep = playerSequence.length - 1;

  if (playerSequence[currentStep] !== sequence[currentStep]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(newRound, 1000);
  }
}

// Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  round = 0;
  info.textContent = "Get Ready!";
  newRound();
}

// Game over
function gameOver() {
  acceptingInput = false;
  info.textContent = `Game Over! You reached round ${round}. Press Start to try again.`;
}

// Event listeners
colorButtons.forEach(btn => btn.addEventListener("click", handleClick));
startButton.addEventListener("click", startGame);
