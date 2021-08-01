export { isWinner };
function isWinner(boardMatrix, isFirstPlayer) {
  const size = boardMatrix.length;
  let lineSize;
  if (size < 5) {
    lineSize = 3;
  } else {
    lineSize = 5;
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (boardMatrix[row][col]) {
        if (searchVictoryLine(boardMatrix, row, col, lineSize)) {
          return true;
        }
      }
    }
  }
}

function searchVictoryLine(boardMatrix, row, col, lineSize) {
  return (
    horizontVictory(boardMatrix, row, col, lineSize) ||
    verticalVictory(boardMatrix, row, col, lineSize) ||
    diagonalVictory(boardMatrix, row, col, lineSize) ||
    diagonalReverseVictory(boardMatrix, row, col, lineSize)
  );
}

function horizontVictory(boardMatrix, row, col, lineSize) {
  const arrVictory = [[row, col]];

  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row]?.[col + i]) {
      return false;
    }
    arrVictory.push([row, col + i]);
  }
  victory(arrVictory);
  console.log('horizont');
  return true;
}

function verticalVictory(boardMatrix, row, col, lineSize) {
  const arrVictory = [[row, col]];

  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col]) {
      return false;
    }
    arrVictory.push([row + i, col]);
  }
  victory(arrVictory);
  console.log('vertical');
  return true;
}

function diagonalVictory(boardMatrix, row, col, lineSize) {
  const arrVictory = [[row, col]];

  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col + i]) {
      return false;
    }
    arrVictory.push([row + i, col + i]);
  }
  victory(arrVictory);
  console.log('diagonal');
  return true;
}

function diagonalReverseVictory(boardMatrix, row, col, lineSize) {
  const arrVictory = [[row, col]];

  for (let i = 1; i < lineSize; i++) {
    arrVictory.push([row + i, col - i]);
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col - i]) {
      return false;
    }
    arrVictory.push([row + i, col - i]);
  }
  victory(arrVictory);
  console.log('diagonalReverse');
  return true;
}

function victory(arrVictory) {
  const pageGame = document.getElementById('game');

  const banner = document.createElement('div');
  banner.classList.add('victory');
  pageGame.append(banner);

  arrVictory.forEach((element) => {
    let elem = [...document.querySelectorAll(`[data-row="${element[0]}"]`)];
    elem = elem.filter((item) => item.dataset.col == element[1]);
    elem[0].classList.add('victory__elem');
  });
}
