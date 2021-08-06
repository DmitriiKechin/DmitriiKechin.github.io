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
  animationBoardGrid,
  createBackground,
  createMenu,
  isDraw,
} from './GameUI.js';

const ANIMATION_DURATION = 0.5;
const signO = createSignO(ANIMATION_DURATION);
const signX = createSignX(ANIMATION_DURATION);

let boardMatrix = [];
let isFirstPlayer = true;
const moveAI = new Event('click', { bubbles: true });
let moveAIFinish = true;

window.addEventListener('load', loadStartMenu());
/*
window.addEventListener('load', async () => {
  if (navigator.serviceWorker) {
    try {
      await navigator.serviceWorker.register('SW.js');
      console.log('Service worcer register succes');
    } catch (e) {
      console.log('Service worcer register fail');
    }
  }
});*/

export function loadStartMenu() {
  createBackground();
  const page = document.getElementById('game');
  const menu = document.getElementById('game-menu');

  page.innerHTML = '';
  menu.innerHTML = '';
  menu.style.width = '0';

  const startMenu = document.createElement('div');
  startMenu.classList.add('startMenu');
  page.append(startMenu);
  animationBorder(startMenu, '1s', 'blue');

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
    createButtonGame(mediumGameButton, '5 in row');
  }, 3500);
  setTimeout(() => {
    createButtonGame(largeGameButton, '5 in row BIG');
  }, 5500);

  classicGameButton.addEventListener('click', startClassicGame);
  mediumGameButton.addEventListener('click', startMediumGame);
  largeGameButton.addEventListener('click', startlargeGame);

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
    animationBorder(elem, '1s', 'blue');
  }
}

function startGame(element, boardSizeRow, boardSizeCol) {
  moveAIFinish = true;
  const board = document.createElement('div');
  board.classList.add('board');

  const boardGrid = document.createElement('div');
  boardGrid.classList.add('board__grid-line');

  element.append(board);
  board.innerHTML = createBoard(boardSizeRow, boardSizeCol);
  board.prepend(boardGrid);
  boardGrid.innerHTML = createBoardGrid(boardSizeRow, boardSizeCol);

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

  const signMove = document.getElementById('signMore');

  const signOMove = createSignO(0.2);
  const signXMove = createSignX(0.2);

  target.dataset.isEmpty = true;

  if (isFirstPlayer) {
    signMove.innerHTML = signOMove;
    target.innerHTML = signX;
    boardMatrix[row][col] = 'x';

    moveAIFinish = false;
  } else {
    signMove.innerHTML = signXMove;
    target.innerHTML = signO;
    boardMatrix[row][col] = 'o';
  }

  target.style.cursor = 'auto';

  if (isWinner(boardMatrix)) {
    moveAIFinish = false;
    log('Победа');
    return;
  }

  if (isDraw(boardMatrix)) {
    moveAIFinish = false;
    log('Ничья');

    const pageGame = document.getElementById('game');
    const banner = document.createElement('div');
    banner.classList.add('victory');
    pageGame.append(banner);

    const messangeDrow = document.getElementById('empty');
    messangeDrow.classList.add('move');
    messangeDrow.textContent = 'Drow';
    messangeDrow.dataset.title = 'Drow';

    return;
  }

  setTimeout(clickAI, ANIMATION_DURATION * 1000);
}

function clickAI() {
  if (!isFirstPlayer) {
    const move = aiMove(boardMatrix);

    let elem = [...document.querySelectorAll(`[data-row="${move.row}"]`)];
    elem = elem.filter((item) => item.dataset.col == move.col);

    moveAIFinish = true;
    elem[0].dispatchEvent(moveAI);
    moveAIFinish = false;
    setTimeout(() => {
      moveAIFinish = true;
    }, ANIMATION_DURATION * 1000);
  }
}

window.addEventListener(
  `resize`,
  (event) => {
    const startMenu = document.querySelector('.startMenu');
    const background = document.querySelector('.background');

    if (background) {
      background.remove();
      createBackground();
    }

    if (startMenu) {
      startMenu.remove();
      loadStartMenu();
    }
  },
  false
);

function preStartGame() {
  const page = document.getElementById('game');
  page.innerHTML = '';
  const startMenu = document.querySelector('.startMenu');
  if (startMenu) {
    startMenu.remove();
  }

  isFirstPlayer = true;

  return page;
}

function startClassicGame() {
  createMenu(startClassicGame);

  startGame(preStartGame(), 3, 3);
  boardMatrix = createBoardMatrix(3, 3);

  const board = document.querySelector('.board');
  board.style.maxWidth = '450px';
  board.style.maxHeight = '450px';

  setTimeout(animationBoardGrid, 0);
}

function startMediumGame() {
  createMenu(startMediumGame);

  startGame(preStartGame(), 9, 9);
  boardMatrix = createBoardMatrix(9, 9);

  const board = document.querySelector('.board');
  board.style.maxWidth = '550px';
  board.style.maxHeight = '550px';

  setTimeout(animationBoardGrid, 0);
}

function startlargeGame() {
  createMenu(startlargeGame);

  const page = preStartGame();

  const row = Math.round((page.offsetHeight * 0.94) / 70);
  const col = Math.round((page.offsetWidth * 0.94) / 70);

  startGame(page, row, col);
  boardMatrix = createBoardMatrix(row, col);

  const board = document.querySelector('.board');
  board.style.maxWidth = '94%';
  board.style.maxHeight = '94%';

  setTimeout(animationBoardGrid, 0);
}
