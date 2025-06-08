let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

const clickSound = new Audio("click.wav");
const winSound = new Audio("win.wav");

// Play vs Computer flag
const playVsComputer = true;  // 👉 Change to false if you want 2 player

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive && currentPlayer === "X") {
      clickSound.currentTime = 0;
      clickSound.play();

      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();

      if (gameActive) {
        currentPlayer = "O";
        status.textContent = `Player ${currentPlayer}'s turn`;

        if (playVsComputer) {
          setTimeout(computerMove, 500); // Small delay for better feel
        }
      }
    }
  });
});

function computerMove() {
  // Find empty cells
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

  if (emptyIndexes.length > 0) {
    // Pick random empty cell
    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    board[randomIndex] = "O";
    let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = "O";

    clickSound.currentTime = 0;
    clickSound.play();

    checkWinner();

    if (gameActive) {
      currentPlayer = "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      status.textContent = `Player ${board[a]} wins!`;
      winSound.currentTime = 0;
      winSound.play();
      gameActive = false;

      // Highlight winning cells
      document.querySelector(`.cell[data-index='${a}']`).classList.add("winning-cell");
      document.querySelector(`.cell[data-index='${b}']`).classList.add("winning-cell");
      document.querySelector(`.cell[data-index='${c}']`).classList.add("winning-cell");

      // Mark losing cells
      cells.forEach(cell => {
        const index = cell.getAttribute("data-index");
        if (index != a && index != b && index != c) {
          cell.classList.add("losing-cell");
        }
      });

      return;
    }
  }

  // Draw
  if (!board.includes("")) {
    status.textContent = "It's a draw!";
    status.classList.add("draw");
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  status.classList.remove("draw");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning-cell", "losing-cell");
  });
}
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("toggle-music");

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.innerText = "🎵 Mute Music";
  } else {
    bgMusic.pause();
    musicBtn.innerText = "🔇 Play Music";
  }
}
