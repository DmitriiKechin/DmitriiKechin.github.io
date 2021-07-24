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
  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row]?.[col + i]) {
      return false;
    }
  }
  console.log('horizont');
  return true;
}

function verticalVictory(boardMatrix, row, col, lineSize) {
  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col]) {
      return false;
    }
  }
  console.log('vertical');
  return true;
}

function diagonalVictory(boardMatrix, row, col, lineSize) {
  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col + i]) {
      return false;
    }
  }
  console.log('diagonal');
  return true;
}

function diagonalReverseVictory(boardMatrix, row, col, lineSize) {
  for (let i = 1; i < lineSize; i++) {
    if (boardMatrix[row][col] !== boardMatrix?.[row + i]?.[col - i]) {
      return false;
    }
  }
  console.log('diagonalReverse');
  return true;
}
