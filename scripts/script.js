const { log } = console;

import { isWinner } from './victory.js';
import { aiMove } from './AI.js';
import { createBoard, createBoardGrid, createBoardMatrix } from './GameUI.js';

const boardSize = 11;
let isFirstPlayer = true;
const boardMatrix = createBoardMatrix(boardSize);
const moveAI = new Event('click', { bubbles: true });

window.addEventListener('load', startGame(boardSize));
function startGame(boardSize) {
  const board = document.createElement('div');
  board.classList.add('board');

  const boardGrid = document.createElement('div');
  boardGrid.classList.add('board__grid-line');

  document.body.append(board);
  board.innerHTML = createBoard(boardSize);
  board.prepend(boardGrid);
  boardGrid.innerHTML = createBoardGrid(boardSize);

  board.addEventListener('click', clickCell);
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

  if (isWinner(boardMatrix, isFirstPlayer)) {
    log('Победа');
  }
  setTimeout(clickAI, 0);
}

function clickAI() {
  if (!isFirstPlayer) {
    const move = aiMove(boardMatrix);
    console.log('move: ', move);
    let elem = [...document.querySelectorAll(`[data-row="${move.row}"]`)];
    elem = elem.filter((item) => item.dataset.col == move.col);

    console.log('elem: ', elem[0]);
    elem[0].dispatchEvent(moveAI);
  }
}
