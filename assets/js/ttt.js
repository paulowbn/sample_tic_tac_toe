const cells = document.querySelectorAll('.cell-ttt');
let currentPlayer = "X";
let placarX = 0, placarO = 0;

function handleClick(e) {
  const cell = e.target;
  const text = cell.querySelector("p");
  if (text.textContent === "") {
    text.textContent = currentPlayer;
    checkDraw();
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const textA = cells[a].querySelector("p").textContent;
    const textB = cells[b].querySelector("p").textContent;
    const textC = cells[c].querySelector("p").textContent;

    if (textA === textB && textB === textC && textA !== "") {
      document.getElementById("div_tic-tac-toe").style.visibility = "hidden";
      document.getElementById("modal").style.display = 'flex';
      document.getElementById("modalAviso").textContent = "Jogador " + textA + " venceu o jogo!";
      if (textA === "X") {
        placarX += 1;
        document.getElementById("placarX").setAttribute("value", placarX)
      } else if (textA === "O") {
        placarO += 1;
        document.getElementById("placarO").setAttribute("value", placarO)
      }
    }
  }
}

function checkDraw() {
  for(const cell of cells) {
    if (!cell.querySelector("p").textContent) {
      return false;
    }
  }
  document.getElementById("modal").style.display = 'flex';
  document.getElementById("modalAviso").textContent = "Empate!";
}

function resetGame() {
  cells.forEach(cell => {
    cell.querySelector("p").textContent = "";
  });
  currentPlayer = "X";
  document.getElementById("modal").style.display = 'none';
  document.getElementById("div_tic-tac-toe").style.visibility = "visible";
}

document.getElementById("btnReset").addEventListener('click', resetGame);
document.getElementById("modalBotao").addEventListener('click', resetGame);