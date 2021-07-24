const { log } = console;

import { isWinner } from './victory.js';
import { aiMove } from './AI.js';

let isFirstPlayer = true;
let boardMatrix = [];

window.addEventListener('load', startGame(11));
function startGame(boardSize) {
  const board = document.createElement('div');
  board.classList.add('board');

  const boardGrid = document.createElement('div');
  boardGrid.classList.add('board__grid-line');

  document.body.append(board);
  board.innerHTML = createBoard(boardSize);
  board.prepend(boardGrid);
  boardGrid.innerHTML = createBoardGrid(boardSize);

  createBoardMatrix(boardSize);

  board.addEventListener('click', clickCell);
}

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

function clickCell(event) {
  let cell = event.target.closest('.board__cell');
  if (!cell) return;

  if (cell.closest('.sign_x')) return;
  if (cell.closest('.sign_o')) return;

  click(cell, isFirstPlayer);
  isFirstPlayer = !isFirstPlayer;
}

function click(target, isFirstPlayer) {
  const row = target.dataset.row;
  const col = target.dataset.col;

  if (isFirstPlayer) {
    target.classList.add('sign_x');
    boardMatrix[row][col] = 'x';
  } else {
    target.classList.add('sign_o');
    boardMatrix[row][col] = 'o';
  }

  target.style.cursor = 'auto';

  /*##############################
#############testAI#############
###############################*/

  log(aiMove(boardMatrix));

  if (isWinner(boardMatrix, isFirstPlayer)) {
    log('Победа');
  }
}

function createBoardMatrix(boardSize) {
  let matrixRow = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      matrixRow.push('');
    }
    boardMatrix.push(matrixRow);
    matrixRow = [];
  }
}
