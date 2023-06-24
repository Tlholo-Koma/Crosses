const baseURLGame = window.location.href.split("/").slice(0, 3).join("/");
let currentPlayer = 'O';
const historyButton = document.getElementById('history');

historyButton.addEventListener("click", async () => {
  try{
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token') || null;
    if(!token){
        token = sessionStorage.getItem('jwtToken')
    }
    if (token !== null) {
        const url = "/game/history"
        window.location.href=`${url}?token=${token}`
}
}catch(e){
    console.log(e);
}
});

 async function handleClick(button) {
  if (button.innerText !== '') {
    return;
  }
  button.innerText = currentPlayer;
  const currentPlayerDisplay = document.querySelector('.current-player');
  currentPlayerDisplay.innerText = currentPlayer === 'O' ? 'X' : 'O';
  const messageOverlay = document.getElementById('message-overlay');
  const messageContent = document.getElementById('message-content');
  if (checkWinner()) {
    messageContent.innerText = 'Player ' + currentPlayer + ' wins!';
    messageOverlay.style.display = 'flex';
  } else if (checkTie()) {
    messageContent.innerText = 'It\'s a tie!';
    messageOverlay.style.display = 'flex';
    resetBoard();
  } else {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  }
}

function playAgain() {
  const messageOverlay = document.getElementById('message-overlay');
  messageOverlay.style.display = 'none';
  resetBoard(); // Reset the board
}

function resetBoard() {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    button.innerText = '';
    button.dataset.state = ''; 
  }
  const currentPlayerDisplay = document.querySelector('.current-player');
  currentPlayerDisplay.innerText = 'O';
  currentPlayer = 'O';
}


function checkWinner() {
  const winningCombinations = [
    // Rows
    ['top-left', 'top-middle', 'top-right'],
    ['middle-left', 'center', 'middle-right'],
    ['bottom-left', 'bottom-middle', 'bottom-right'],
    // Columns
    ['top-left', 'middle-left', 'bottom-left'],
    ['top-middle', 'center', 'bottom-middle'],
    ['top-right', 'middle-right', 'bottom-right'],
    // Diagonals
    ['top-left', 'center', 'bottom-right'],
    ['top-right', 'center', 'bottom-left']
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
  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    if (button.innerText === '') {
      return false;
    }
  }

  return true;
}
