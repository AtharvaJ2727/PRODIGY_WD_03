//   const cells = document.querySelectorAll(".cell");
//   const xWinsText = document.getElementById("xWins");
//   const oWinsText = document.getElementById("oWins");
//   const drawsText = document.getElementById("draws");

//   console.log("AI mode loaded!");

//   let board = ["", "", "", "", "", "", "", "", ""];
//   let xWins = 0, oWins = 0, draws = 0;
//   let currentPlayer = "X";

  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  function renderMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player === "X" ? "neon-x" : "neon-o");
  }

  function checkWinner(player) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winCombos.find(combo => combo.every(i => board[i] === player)) || null;
}


  function getEmptyCells() {
    return board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  }

  function aiMove() {
    let empty = getEmptyCells();

    // 1. Can AI win?
    for (let i of empty) {
      board[i] = "O";
      if (checkWinner("O")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }

    // 2. Can AI block X?
    for (let i of empty) {
      board[i] = "X";
      if (checkWinner("X")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }

    // 3. Pick random
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function endGame(winner) {
    if (winner === "X") {
      xWins++;
      xWinsText.textContent = xWins;
    } else if (winner === "O") {
      oWins++;
      oWinsText.textContent = oWins;
    } else {
      draws++;
      drawsText.textContent = draws;
    }

    setTimeout(resetGame, 1200);
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("neon-x", "neon-o");
    });
    currentPlayer = "X";
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (board[index] === "" && currentPlayer === "X") {
        renderMove(index, "X");
        if (checkWinner("X")) return endGame("X");

        if (getEmptyCells().length === 0) return endGame("draw");

        currentPlayer = "O";
        setTimeout(() => {
          let move = aiMove();
          renderMove(move, "O");

          if (checkWinner("O")) return endGame("O");

          if (getEmptyCells().length === 0) return endGame("draw");

          currentPlayer = "X";
        }, 500);
      }
    });
  });

  const winningCombo = checkWinner(currentPlayer);
if (winningCombo) {
  winningCombo.forEach(i => cells[i].classList.add("winning-cell"));

  if (currentPlayer === "X") xWinsText.textContent = ++xWins;
  else oWinsText.textContent = ++oWins;

  setTimeout(() => {
    winningCombo.forEach(i => cells[i].classList.remove("winning-cell"));
    resetBoard();
  }, 1200);
}
