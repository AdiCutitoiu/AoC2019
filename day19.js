class Input {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }

  read() {
    return this.data.shift();
  }

  canRead() {
    return !!this.data.length;
  }

  push(x) {
    this.data.push("" + x);
  }
}

let INPUT =
  "109,424,203,1,21101,11,0,0,1105,1,282,21102,18,1,0,1105,1,259,2102,1,1,221,203,1,21102,1,31,0,1106,0,282,21101,0,38,0,1106,0,259,20102,1,23,2,21202,1,1,3,21101,0,1,1,21102,57,1,0,1105,1,303,2101,0,1,222,20102,1,221,3,20101,0,221,2,21102,259,1,1,21101,0,80,0,1106,0,225,21102,135,1,2,21101,0,91,0,1105,1,303,2102,1,1,223,21001,222,0,4,21102,259,1,3,21102,1,225,2,21101,0,225,1,21101,118,0,0,1106,0,225,20101,0,222,3,21101,0,12,2,21101,0,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,1,148,0,1105,1,259,1202,1,1,223,21002,221,1,4,20102,1,222,3,21101,0,17,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,1,195,0,105,1,109,20207,1,223,2,21001,23,0,1,21101,0,-1,3,21101,214,0,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1202,-4,1,249,21201,-3,0,1,22102,1,-2,2,22102,1,-1,3,21102,250,1,0,1106,0,225,21202,1,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21201,-2,0,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22102,1,-2,3,21101,0,343,0,1106,0,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,384,1,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2106,0,0";

function parseOpcode(opcode) {
  const digits = ("" + opcode).split("");
  while (digits.length < 5) {
    digits.unshift("0");
  }

  const [typeA, typeB, typeC] = digits.splice(0, 3).map(x => parseInt(x));
  return {
    typeA,
    typeB,
    typeC,
    opcode: parseInt(digits.join(""))
  };
}

function computer(input, output) {
  const numbers = INPUT.split(",").map(x => parseInt(x));
  let i = 0;
  let relativeBase = 0;

  return function() {
    function getAddress(type, index) {
      if (type === 2) {
        return relativeBase + numbers[index];
      }

      return type ? index : numbers[index];
    }

    function readMem(address) {
      numbers[address] = numbers[address] || 0;
      return numbers[address];
    }

    function writeMem(address, value) {
      numbers[address] = value;
    }

    while (true) {
      const instr = numbers[i];
      const { opcode, typeA, typeB, typeC } = parseOpcode(instr);

      if (opcode === 99) return false;

      const first = readMem(getAddress(typeC, i + 1));
      const second = readMem(getAddress(typeB, i + 2));
      const third = getAddress(typeA, i + 3);

      if (opcode === 1) {
        writeMem(third, first + second);
        i += 4;
      } else if (opcode === 2) {
        writeMem(third, first * second);
        i += 4;
      } else if (opcode === 3) {
        if (!input.canRead()) {
          return true;
        }

        writeMem(getAddress(typeC, i + 1), input.read());
        i += 2;
      } else if (opcode === 4) {
        output(first);
        i += 2;
      } else if (opcode === 9) {
        relativeBase += first;
        i += 2;
      } else {
        if (opcode === 5) {
          if (first) {
            i = second;
          } else {
            i += 3;
          }
        } else if (opcode === 6) {
          if (!first) {
            i = second;
          } else {
            i += 3;
          }
        } else if (opcode === 7) {
          writeMem(third, first < second ? 1 : 0);
          i += 4;
        } else if (opcode === 8) {
          writeMem(third, first === second ? 1 : 0);
          i += 4;
        }
      }
    }
  };
}

function part1() {
  let count = 0;

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let output = 0;
      const input = new Input([]);
      const compute = computer(input, o => (output = o));

      input.push(x);
      input.push(y);

      compute();

      if (output) {
        count++;
      }
    }
  }

  console.log(count);
}

part1();

function part2() {
  const cache = new Map();

  function check(x, y) {
    if (cache.has('' + [x, y])) {
      return cache.get('' + [x, y]);
    }

    const input = new Input([]);
    const compute = computer(input, o => (output = o));

    input.push(x);
    input.push(y);

    compute();

    cache.set('' + [x, y], !!output);
    return !!output;
  }

  let current = [5, 15];

  while (true) {
    const [x, y] = current;
    let topRight = check(x, y + 99);
    let botLeft = check(x + 99, y);

    if (topRight && botLeft) {
      console.log(current);
      break;
    }

    if (topRight) {
      current = [x, y + 1];
      continue;
    }

    if (botLeft) {
      current = [x + 1, y];
      continue;
    }

    let pointRight = [x, y + 1];
    while (check(...pointRight)) {
      pointRight[1]++;
    }

    let pointDown = [x + 1, y];
    while (check(...pointDown)) {
      pointDown[0]++;
    }

    const distRight = pointRight[1] - y;
    const distDown = pointDown[0] - x;

    if (distRight > distDown) {
      current = [x, y + 1];
    } else if (distRight < distDown) {
      current = [x + 1, y];
    } else {
      current = [x + 1, y + 1];
    }
  }
}

part2();
