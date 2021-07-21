ATTACK_WEIGHT = [[], [], [], [], [], []];
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

class Attack {
  constructor(cap = 0, pot = 0, div = 1) {
    this.capability = cap; //Мощность
    this.potential = pot; //Потенциал
    this.divider = div; //Делитель
  }

  countWeigth() {
    return ATTACK_WEIGHT[(this.capability, this.potential)] / this.divider;
  }
}

class checkLine {
  constructor() {
    //Фигура, которую мы подставляем на место сканируемой клетки
    this.subFig = '×';
    //Массив всех атак на данной линии. Атака с индексом «0» - центральная.
    this.Attacks = [];
    //Текущая атака
    this.curAttack = new Attack();
    //Итератор (нужен для определения расстояния от центральной клетки)
    this.iter = 1;
    //Флаг, активирующий проверку шестых клеток
    this.checkEdge = false;
    //Место для атаки
    this.attackplace = 1;
  }
  getAttacks(cellX, cellY, subFig, dx, dy) {
    this.substitudeFigure(subFig);

    //Уменьшаем итераторы – перебираем клетки...
    for (
      let x = cellX - dx, y = cellY - dy;
      Math.abs(x - cellX) <= 5 && Math.abs(y - cellY) <= 5;
      x -= dx, y -= dy
    )
      if (this.checkCell(x, y)) break;

    //разворачиваемся:
    //возвращаемся в центральную клетку (позже опишу подробнее)
    this.turnAround();

    //Увеличиваем итераторы - двигаемся в обратном направлении...
    for (
      let x = cellX + dx, y = cellY + dy;
      Math.abs(x - cellX) <= 5 && Math.abs(y - cellY) <= 5;
      x += dx, y += dy
    )
      if (this.checkCell(x, y)) break;

    return this.Attacks;
  }

  checkCell(x, y) {
    let fig =
      Model.Field[x] && Model.Field[x][y] !== undefined
        ? Model.Field[x][y]
        : 'b';
    if (fig == '○' || fig == '×') {
      if (this.subFig != fig) {
        //разные фигуры
        this.Attacks.push(this.curAttack); //записываем атаку
        return fig; //завершаем функцию и выходим из цикла
      } else {
        //фигура совпадает с подставленной
        this.curAttack.capability++; // + к мощности
        this.attackplace++; // + к месту
      }
    } else if (fig == 'b') {
      //граница
      this.Attacks.push(this.curAttack);
      return 'b';
    } else {
      //Пустая клетка
      if (this.curAttack.capability) {
        this.curAttack.potential++;
        this.Attacks.push(this.curAttack);
        this.curAttack = new Attack();
        this.curAttack.potential++;
      }
      this.curAttack.divider++;
      this.attackplace++;
    }
    if (this.iter == 4 && fig == this.subFig)
      //Это 5-ая клетка
      this.checkEdge = true;
    else if (this.iter == 5) {
      if (this.checkEdge) {
        if (fig == this.curFig || fig == 0) this.curAttack.potential++;
        this.Attacks.push(this.curAttack);
      }
      return 0;
    }
    this.iter++;
  }

  turnAround() {
    this.iter = 1;
    this.checkEdge = false;
    this.curAttack = this.Attacks[0];
    this.Attacks.splice(0, 1);
  }
}

function getAllAttacks(cellX, cellY) {
  //не забываем, что клетка,
  //куда мы собираемся пойти должна быть пустой
  if (Model.Field[cellX][cellY]) return false;

  let cX = [];
  let cO = [];

  //все линии крестиков ...
  cX['0'] = this.getAttacksLine(cellX, cellY, '×', 1, 0);
  cX['90'] = this.getAttacksLine(cellX, cellY, '×', 0, 1);
  cX['45'] = this.getAttacksLine(cellX, cellY, '×', 1, -1);
  cX['135'] = this.getAttacksLine(cellX, cellY, '×', 1, 1);

  //а теперь нолики...
  cO['0'] = this.getAttacksLine(cellX, cellY, '○', 1, 0);
  cO['90'] = this.getAttacksLine(cellX, cellY, '○', 0, 1);
  cO['45'] = this.getAttacksLine(cellX, cellY, '○', 1, -1);
  cO['135'] = this.getAttacksLine(cellX, cellY, '○', 1, 1);

  return {
    //возвращаем объект со всеми атаками
    x: cX,
    o: cO,
  };
}

function getAttacksLine(cellX, cellY, subFig, dx, dy) {
  //тут то мы и создаем объекты
  let C = new checkLine();
  C.getAttacks(cellX, cellY, subFig, dx, dy);
  return this.filterAttacks(C); //про это отдельно
}

function filterAttacks(attackLine) {
  let res = [];
  if (attackLine.attackplace >= 5)
    attackLine.Attacks.forEach((a) => {
      if ((a.capability && a.potential) || a.capability >= 5) res.push(a);
    });
  attackLine.Attacks = res;
  return res;
}

function isBreakPoint(attackLine) {
  if (!attackLine || !attackLine.length) return false;
  let centAtk;
  attackLine.forEach((a) => {
    if (a.divider == 1) centAtk = a;
  });
  if (centAtk.capability >= 4) return true;
  if (centAtk.potential == 2 && centAtk.capability >= 3) return true;
  let res = false;
  attackLine.forEach((a) => {
    let score = centAtk.capability;
    if (a.divider == 2) {
      //side attack
      if (centAtk.potential == 2 && a.potential == 2) score++;
      if (score + a.capability >= 4) {
        res = true;
        return;
      }
    }
  });
  return res;
}

function countWeight(x, y) {
  var attacks = this.getAttacks(x, y);
  if (!attacks) return;
  let sum = 0;

  sum += count.call(this, attacks.x, '×');
  sum += count.call(this, attacks.o, '○');

  return sum;

  function count(atks, curFig) {
    let weight = 0;
    let breakPoints = 0;

    ['0', '45', '90', '135'].forEach((p) => {
      if (this.isBreakPoint(atks[p])) {
        debug('Break point');
        if (++breakPoints == 2) {
          weight += 100;
          debug('Good cell');
          return;
        }
      }
      atks[p].forEach((a) => {
        if (a.capability > 5) a.capability = 5;
        if (a.capability == 5 && curFig == Model.whoPlays.char) weight += 100;
        weight += a.getWeight();
      });
    });
    return weight;
  }
}
