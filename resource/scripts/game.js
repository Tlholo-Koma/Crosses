const baseURLGame = window.location.href.split("/").slice(0, 3).join("/");
let currentPlayer = "O";
const historyButton = document.getElementById("history");
const profile = document.getElementById("profile");
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token") || null;

profile.addEventListener("click", async () => {
  try {
    if (!token) {
      token = sessionStorage.getItem("jwtToken");
    }
    if (token !== null) {
      const url = "/profile";
      window.location.href = `${url}?token=${token}`;
    }
  } catch (e) {
    console.log(e);
  }
});

historyButton.addEventListener("click", async () => {
  try {
    if (!token) {
      token = sessionStorage.getItem("jwtToken");
    }
    if (token !== null) {
      const url = "/history";
      window.location.href = `${url}?token=${token}`;
    }
  } catch (e) {
    console.log(e);
  }
});

function postResult(result) {
  fetch(`${baseURLGame}/data/game?token=${token}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      result_type_id: result,
    }),
  });
}

async function handleClick(button) {
  if (button.innerText !== "") {
    return;
  }
  button.innerText = currentPlayer;
  const currentPlayerDisplay = document.querySelector(".current-player");
  currentPlayerDisplay.innerText = currentPlayer === "O" ? "X" : "O";
  const messageOverlay = document.getElementById("message-overlay");
  const messageContent = document.getElementById("message-content");
  if (checkWinner()) {
    messageContent.innerText = "Player " + currentPlayer + " wins!";
    messageOverlay.style.display = "flex";
    postResult(currentPlayer === "O" ? 1 : 2);
  } else if (checkTie()) {
    messageContent.innerText = "It's a tie!";
    messageOverlay.style.display = "flex";
    postResult(3);
  } else {
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  }
}

function playAgain() {
  const messageOverlay = document.getElementById("message-overlay");
  messageOverlay.style.display = "none";

  const playAgainButton = document.getElementById("play-again-button");
  playAgainButton.removeAttribute("data-state");
  playAgainButton.style.display = "block";

  resetBoard();

  playAgainButton.innerText = "Play Again";
}

function resetBoard() {
  const buttons = document.querySelectorAll("button");
  for (const button of buttons) {
    button.innerText = "";
    button.dataset.state = "";
  }
  const currentPlayerDisplay = document.querySelector(".current-player");
  currentPlayerDisplay.innerText = "O";
  currentPlayer = "O";
}

function checkWinner() {
  const winningCombinations = [
    // Rows
    ["top-left", "top-middle", "top-right"],
    ["middle-left", "center", "middle-right"],
    ["bottom-left", "bottom-middle", "bottom-right"],
    // Columns
    ["top-left", "middle-left", "bottom-left"],
    ["top-middle", "center", "bottom-middle"],
    ["top-right", "middle-right", "bottom-right"],
    // Diagonals
    ["top-left", "center", "bottom-right"],
    ["top-right", "center", "bottom-left"],
  ];

  for (const combination of winningCombinations) {
    const [cell1, cell2, cell3] = combination;
    const button1 = document.getElementById(cell1);
    const button2 = document.getElementById(cell2);
    const button3 = document.getElementById(cell3);

    if (
      button1.innerText === currentPlayer &&
      button2.innerText === currentPlayer &&
      button3.innerText === currentPlayer
    ) {
      return true;
    }
  }

  return false; // No winner lol typical tic tac toe take
}

function checkTie() {
  const buttons = document.querySelectorAll("button");

  for (const button of buttons) {
    if (button.innerText === "") {
      return false;
    }
  }

  return true;
}
