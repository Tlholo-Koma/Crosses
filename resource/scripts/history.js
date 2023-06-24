const gameButton = document.getElementById("gameButton");
const POSSIBLE_WINNERS = ["O", "X", "—"];
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token") || null;

gameButton.addEventListener("click", async () => {
  try {
    if (!token) {
      token = sessionStorage.getItem("jwtToken");
    }
    if (token !== null) {
      const url = "/Game";
      window.location.href = `${url}?token=${token}`;
    }
  } catch (e) {
    console.log(e);
  }
});

async function getWins() {
  const response = await fetch(
    `http://localhost:3001/data/games?token=${token}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.map((game) => POSSIBLE_WINNERS[game.lookup_result_type_id - 1]);
}

function addWinBlock(winsGrid, win, blockNumber) {
  const section = document.createElement("section");
  const h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(blockNumber));
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(win));
  section.appendChild(h3);
  section.appendChild(p);
  winsGrid.appendChild(section);
}

async function drawCurrentPlayer() {
  const currPlayerText = document.getElementById("currentPlayer");
  const response = await fetch("http://localhost:3000/login/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  const email = await response.json();
  currPlayerText.innerText = `Win history for games by ${email}`;
}

drawCurrentPlayer();

async function drawWins() {
  const winsGrid = document.getElementById("winsBlock");
  const wins = await getWins();
  wins.forEach((win, index) => addWinBlock(winsGrid, win, index + 1));
}

drawWins();
