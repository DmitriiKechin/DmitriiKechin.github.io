export { createBoard, createBoardGrid, createBoardMatrix };

function createBoard(boardSize) {
  const innerText = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      innerText.push(`
			<div
			class="board__cell"
			data-row="${i}"
			data-col="${j}"
			style="grid-row: ${i + 1}; grid-column: ${j + 1};"
		>
				</div>`);
    }
  }

  return innerText.join('');
}

function createBoardGrid(boardSize) {
  const innerText = [];

  for (let i = 0; i < boardSize + 1; i++) {
    innerText.push(`
			<div
          class="board__line-horizon"
          style="grid-row: ${i + 1}; 
					grid-column: 1/span ${boardSize + 1};"
					${i === 0 || i === boardSize ? `hidden` : ``}
        ></div>
        <div
          class="board__line-vertical"
          style="grid-row: 1/span ${boardSize + 1}; grid-column: ${i + 1};"
					${i === 0 || i === boardSize ? `hidden` : ``}
        ></div>`);
  }
  return innerText.join('');
}

function createBoardMatrix(boardSize) {
  let matrixRow = [];
  const boardMatrix = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      matrixRow.push('');
    }
    boardMatrix.push(matrixRow);
    matrixRow = [];
  }

  return boardMatrix;
}
