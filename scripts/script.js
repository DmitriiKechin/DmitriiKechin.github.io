const { log } = console;

import { isWinner } from './victory.js';
import { aiMove } from './AI.js';
import {
  createBoard,
  createBoardGrid,
  createBoardMatrix,
  createSignO,
  createSignX,
  animationBorder,
} from './GameUI.js';

const ANIMATION_DURATION = 0.5;
const signO = createSignO(ANIMATION_DURATION);
const signX = createSignX(ANIMATION_DURATION);

const boardSize = 5;
let isFirstPlayer = true;
const boardMatrix = createBoardMatrix(boardSize);
const moveAI = new Event('click', { bubbles: true });
let moveAIFinish = true;

window.addEventListener('load', loadStartMenu());

function loadStartMenu() {
  const page = document.getElementById('game');

  const startMenu = document.createElement('div');
  startMenu.classList.add('startMenu');
  page.append(startMenu);
  animationBorder(startMenu, '1s');

  const startMenuTitle = document.createElement('div');
  startMenuTitle.classList.add('startMenuTitle');
  startMenu.append(startMenuTitle);

  const cross = document.createElement('div');
  const text = document.createElement('div');
  const circle = document.createElement('div');

  setTimeout(() => {
    cross.innerHTML = signX;
    cross.classList.add('startMenuTitle__item');
    startMenuTitle.append(cross);

    text.textContent = 'VS';
    text.classList.add('startMenuTitle__item');
    text.classList.add('startMenuTitle__text');
    text.style.fontSize = startMenuTitle.offsetWidth / 4.517 + 'px';
    startMenuTitle.append(text);

    circle.innerHTML = signO;
    circle.classList.add('startMenuTitle__item');
    startMenuTitle.append(circle);
  }, 1000);

  const buttonHeight = startMenu.offsetHeight / 7.857;
  const classicGameButton = document.createElement('div');
  const mediumGameButton = document.createElement('div');
  const largeGameButton = document.createElement('div');

  setTimeout(() => {
    createButtonGame(classicGameButton, 'Classic Game');
  }, 1500);
  setTimeout(() => {
    createButtonGame(mediumGameButton, '5 in row medium');
  }, 3500);
  setTimeout(() => {
    createButtonGame(largeGameButton, '5 in row large');
  }, 5500);

  classicGameButton.addEventListener('click', startClassicGame);

  function createButtonGame(elem, textContent) {
    elem.classList.add('gameButton');
    elem.style.height = buttonHeight + 'px';
    elem.style.marginTop = buttonHeight - 20 + 'px';
    setTimeout(() => {
      elem.style.fontSize = buttonHeight / 3.5 + 'px';
      elem.style.color = 'white';
    }, 1000);
    elem.style.lineHeight = buttonHeight + 'px';
    elem.textContent = textContent;
    elem.dataset.title = textContent;
    startMenu.append(elem);
    animationBorder(elem, '1s');
  }
}
function startClassicGame() {
  const page = document.getElementById('game');

  const startmenu = document.querySelector('.startMenu');
  startmenu.remove();
  startGame(page, 3);

  const board = document.querySelector('.board');
  board.style.maxWidth = '450px';
  board.style.maxHeight = '450px';
}

function startGame(element, boardSize) {
  const board = document.createElement('div');
  board.classList.add('board');

  const boardGrid = document.createElement('div');
  boardGrid.classList.add('board__grid-line');

  element.append(board);
  board.innerHTML = createBoard(boardSize);
  board.prepend(boardGrid);
  boardGrid.innerHTML = createBoardGrid(boardSize);

  board.addEventListener('click', clickCell);
}

function clickCell(event) {
  let cell = event.target.closest('.board__cell');

  if (!cell) return;

  if (cell.dataset.isEmpty) return;

  if (!moveAIFinish) return;

  click(cell, isFirstPlayer);

  isFirstPlayer = !isFirstPlayer;
}

function click(target, isFirstPlayer) {
  const row = target.dataset.row;
  const col = target.dataset.col;

  target.dataset.isEmpty = true;

  if (isFirstPlayer) {
    target.innerHTML = signX;
    boardMatrix[row][col] = 'x';
    moveAIFinish = false;
  } else {
    target.innerHTML = signO;
    boardMatrix[row][col] = 'o';
  }

  target.style.cursor = 'auto';

  if (isWinner(boardMatrix, isFirstPlayer)) {
    log('Победа');
  }
  setTimeout(clickAI, ANIMATION_DURATION * 1000);
}

function clickAI() {
  if (!isFirstPlayer) {
    const move = aiMove(boardMatrix);
    console.log('move: ', move);
    let elem = [...document.querySelectorAll(`[data-row="${move.row}"]`)];
    elem = elem.filter((item) => item.dataset.col == move.col);

    console.log('elem: ', elem[0]);
    moveAIFinish = true;
    elem[0].dispatchEvent(moveAI);
    moveAIFinish = false;
    setTimeout(() => {
      moveAIFinish = true;
    }, ANIMATION_DURATION * 1000);
  }
}
