export { aiMove };

function aiMove(boardMatrix) {
  const sizeCol = boardMatrix.length;
  const sizeRow = boardMatrix[0].length;

  const result = {
    weight: 0,
    row: 0,
    col: 0,
  };

  /* let testMatrix = [];
  let testArr = [];

  for (let row = 0; row < sizeCol; row++) {
    for (let col = 0; col < sizeRow; col++) {
      testArr.push(boardMatrix[row][col]);
    }
    testMatrix.push(testArr);
    testArr = [];
  }*/

  for (let row = 0; row < sizeCol; row++) {
    for (let col = 0; col < sizeRow; col++) {
      if (!boardMatrix[row][col]) {
        let weight = weightСell(row, col, boardMatrix);
        // testMatrix[row][col] = weight;

        if (sizeCol === 3) {
          weight = weightСellClassicBot(row, col, boardMatrix);
        }

        if (result.weight <= weight) {
          result.weight = weight;

          result.row = row;
          result.col = col;
        }
      }
    }
  }
  //console.log('testMatrix: ', testMatrix);
  return result;
}

function weightСell(row, col, boardMatrix) {
  let arr = [];
  let numberMainElement = 0;
  let weight = [
    [0, 0],
    [0, 0],
  ];
  let number = 0;

  for (let i = -5; i <= 6; i++) {
    if (col + i >= 0 && col + i < boardMatrix[0].length) {
      arr.push(boardMatrix[row][col + i]);
      if (i === 0) {
        numberMainElement = number;
      }
      number++;
    }
  }
  weigthSum(weigthCalc(arr, numberMainElement));

  removeCount();
  for (let i = -5; i <= 6; i++) {
    if (row + i >= 0 && row + i < boardMatrix.length) {
      arr.push(boardMatrix[row + i][col]);
      if (i === 0) {
        numberMainElement = number;
      }
      number++;
    }
  }
  weigthSum(weigthCalc(arr, numberMainElement));

  removeCount();
  for (let i = -5; i <= 6; i++) {
    if (
      row + i >= 0 &&
      row + i < boardMatrix.length &&
      col + i >= 0 &&
      col + i < boardMatrix[0].length
    ) {
      arr.push(boardMatrix[row + i][col + i]);
      if (i === 0) {
        numberMainElement = number;
      }
      number++;
    }
  }
  weigthSum(weigthCalc(arr, numberMainElement));

  removeCount();
  for (let i = -5; i <= 6; i++) {
    if (
      row - i >= 0 &&
      row - i < boardMatrix.length &&
      col + i >= 0 &&
      col + i < boardMatrix[0].length
    ) {
      arr.push(boardMatrix[row - i][col + i]);
      if (i === 0) {
        numberMainElement = number;
      }
      number++;
    }
  }
  weigthSum(weigthCalc(arr, numberMainElement));

  if (weight[1][0] > weight[0][0]) {
    weight[1][0] *= 1.3;
  }

  if (weight[0][1] >= 2) {
    weight[0][0] += 50;
  }

  if (weight[1][1] >= 2) {
    weight[1][0] += 50;
  }

  return weight[0][0] + weight[1][0];

  function removeCount() {
    arr = [];
    numberMainElement = 0;
    number = 0;
  }

  function weigthSum(arrWeight) {
    weight[0][0] += arrWeight[0][0];
    if (arrWeight[0][1]) {
      weight[0][1]++;
    }

    weight[1][0] += arrWeight[1][0];
    if (arrWeight[1][1]) {
      weight[1][1]++;
    }
  }
}

function weigthCalc(arr, numberMainElement) {
  return [
    weigthCalcSign(arr, numberMainElement, 'x'),
    weigthCalcSign(arr, numberMainElement, 'o'),
  ];
}

function weigthCalcSign(arr, numberMainElement, sign) {
  let elementProhibition;
  if (sign === 'x') {
    elementProhibition = 'o';
  } else {
    elementProhibition = 'x';
  }

  arr[numberMainElement] = sign;

  if (!islengthMove(arr, numberMainElement)) {
    return [0, false];
  }

  let attack = {};
  let isStartAttack = false;
  let isEndAttack = false;
  let result = [];

  removeAttack();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '' && !isStartAttack && !isEndAttack) {
      attack.freeMoves = 1;
    }

    if (arr[i] === '' && !isStartAttack && isEndAttack) {
      attack.spaceNumber++;
    }

    if (arr[i] === '' && isStartAttack) {
      attack.freeMoves++;
      isEndAttack = true;
      isStartAttack = false;
      attack.spaceNumber = 1;
    }

    if (i === numberMainElement) {
      attack.isMain = true;
    }

    if (arr[i] === sign && !isStartAttack & isEndAttack) {
      result.push(attack);
      removeAttack();
      isEndAttack = false;
      isStartAttack = true;

      if (result[result.length - 1].spaceNumber > 0) {
        attack.freeMoves = 1;
      }
    }

    if (arr[i] === sign && isStartAttack & !isEndAttack) {
      attack.weight++;
    }

    if (arr[i] === sign && !isStartAttack & !isEndAttack) {
      attack.weight = 1;
      isStartAttack = true;
    }

    if (arr[i] === elementProhibition && i > numberMainElement) {
      break;
    }

    if (arr[i] === elementProhibition && !attack.isMain) {
      removeAttack();
    }
  }
  result.push(attack);
  return weightCalcArrAttack(result);

  function removeAttack() {
    attack = {};
    attack.weight = 0;
    attack.freeMoves = 0;
    attack.isMain = false;
    attack.spaceNumber = 0;
    isStartAttack = false;
    isEndAttack = false;
  }
}

function islengthMove(arr, numberMainElement) {
  let length = 1;
  let elementProhibition;

  if (arr[numberMainElement] === 'x') {
    elementProhibition = 'o';
  } else {
    elementProhibition = 'x';
  }

  for (let i = 1; i < 5; i++) {
    if (arr[numberMainElement + i] !== undefined) {
      if (arr?.[numberMainElement + i] !== elementProhibition) {
        length++;
      } else {
        break;
      }
    }
  }

  for (let i = 1; i < 5; i++) {
    if (arr[numberMainElement - i] !== undefined) {
      if (arr[numberMainElement - i] !== elementProhibition) {
        length++;
      } else {
        break;
      }
    }
  }

  if (length >= 5) {
    return true;
  }
  return false;
}

function weightCalcArrAttack(arrAttack) {
  const ATTACK_WEIGHT = [[], [], [], [], [], []];
  ATTACK_WEIGHT[1][1] = 0.1;
  ATTACK_WEIGHT[2][1] = 2;
  ATTACK_WEIGHT[3][1] = 4;
  ATTACK_WEIGHT[4][1] = 6;
  ATTACK_WEIGHT[5][1] = 200;

  ATTACK_WEIGHT[1][2] = 0.25;
  ATTACK_WEIGHT[2][2] = 5;
  ATTACK_WEIGHT[3][2] = 7;
  ATTACK_WEIGHT[4][2] = 100;
  ATTACK_WEIGHT[5][2] = 200;

  ATTACK_WEIGHT[5][0] = 200;

  let result = 0;

  let score = 0;
  let isBreakPoint = false;
  let isTwoMove = true;

  arrAttack.forEach((attack, i, arr) => {
    if (attack.isMain) {
      score += attack.weight;

      if (attack.freeMoves !== 2) {
        isTwoMove = false;
      }

      if (attack.spaceNumber === 1 && arr[i + 1]?.weight) {
        score += arr[i + 1].weight;

        if (arr[i + 1]?.freeMoves !== 2) {
          isTwoMove = false;
        }
      }

      if (arr[i - 1]?.spaceNumber === 1) {
        score += arr[i - 1].weight;

        if (arr[i - 1].freeMoves !== 2) {
          isTwoMove = false;
        }
      }
    }
  });

  if (isTwoMove) {
    score++;
  }

  if (score >= 4) {
    isBreakPoint = true;
  }

  arrAttack.forEach((attack, i, arr) => {
    if (attack.isMain) {
      result += ATTACK_WEIGHT[attack.weight][attack.freeMoves];
    }

    if (!attack.isMain && arr[i + 1]?.isMain) {
      result +=
        ATTACK_WEIGHT[attack.weight][attack.freeMoves] /
        (attack.spaceNumber + 1);
    }

    if (!attack.isMain && arr[i + 2]?.isMain) {
      result +=
        ATTACK_WEIGHT[attack.weight][attack.freeMoves] /
        (attack.spaceNumber + arr[i + 1].weight + arr[i + 1].spaceNumber + 1);
    }

    if (!attack.isMain && arr[i - 1]?.isMain) {
      result +=
        ATTACK_WEIGHT[attack.weight][attack.freeMoves] /
        (arr[i - 1].spaceNumber + 1);
    }

    if (!attack.isMain && arr[i - 2]?.isMain) {
      result +=
        ATTACK_WEIGHT[attack.weight][attack.freeMoves] /
        (arr[i - 2].spaceNumber +
          arr[i - 1].weight +
          arr[i - 1].spaceNumber +
          1);
    }
  });

  return [result, isBreakPoint];
}

function weightСellClassicBot(row, col, boardMatrix) {
  let result = 0;

  let boardMatrixMirror = [];
  let arr = [];

  for (let row of boardMatrix) {
    for (let item of row) {
      arr.push(item);
    }
    boardMatrixMirror.push(arr);
    arr = [];
  }

  boardMatrixMirror[row][col] = 'x';
  result += weigthSignCalc(row, col, boardMatrixMirror);

  boardMatrixMirror[row][col] = 'o';
  result += weigthSignCalc(row, col, boardMatrixMirror);

  function weigthSignCalc(row, col, boardMatrix) {
    let result = 0;
    result += weigthClassicCalc([
      boardMatrix[row][0],
      boardMatrix[row][1],
      boardMatrix[row][2],
    ]);

    result += weigthClassicCalc([
      boardMatrix[0][col],
      boardMatrix[1][col],
      boardMatrix[2][col],
    ]);

    if (row === col) {
      result += weigthClassicCalc([
        boardMatrix[0][0],
        boardMatrix[1][1],
        boardMatrix[2][2],
      ]);
    }

    if (
      (row === 0 && col === 2) ||
      (row === 1 && col === 1) ||
      (row === 2 && col === 0)
    ) {
      result += weigthClassicCalc([
        boardMatrix[0][2],
        boardMatrix[1][1],
        boardMatrix[2][0],
      ]);
    }
    return result;
  }

  return result;
}

function weigthClassicCalc(line) {
  const mapLine = {};

  line.forEach((elem) => {
    if (elem in mapLine) {
      mapLine[elem]++;
    } else {
      mapLine[elem] = 1;
    }
  });

  for (let sign of Object.keys(mapLine)) {
    if (mapLine[sign] === 3) {
      return 100;
    }
  }
  if (!('' in mapLine)) {
    return 0;
  }
  if (mapLine[''] === 2) {
    return 1;
  }

  for (let sign of Object.keys(mapLine)) {
    if (mapLine[''] === 1 && mapLine[sign] === 2) {
      return 10;
    }
  }

  return 0;
}
