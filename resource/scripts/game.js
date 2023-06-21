let currentPlayer = 'O';

function handleClick(button) {
  if (button.innerText !== '') {
    return;
  }
  button.innerText = currentPlayer;
  const currentPlayerDisplay = document.querySelector('.current-player');
  currentPlayerDisplay.innerText = currentPlayer === 'O' ? 'X' : 'O';

  if (checkWinner()) {
    console.log('Player ' + currentPlayer + ' wins!');
    resetBoard();
  } else if (checkTie()) {
    console.log('It\'s a tie!');
    resetBoard();
  } else {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  }
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
