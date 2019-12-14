class Input {
    constructor(data) {
        this.data = data;
        this.index = 0;
    }

    read() {
        if (this.index >= this.data.length) {
            return null;
        }

        return this.data[this.index++];
    }

    canRead() {
        return this.index < this.data.length;
    }

    push(x) {
        this.data.push(x);
    }
}

let INPUT = "3,8,1005,8,290,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,28,1006,0,59,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,53,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,76,1006,0,81,1,1005,2,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,105,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,126,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,148,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,171,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,193,1,1008,8,10,1,106,3,10,1006,0,18,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,225,1,1009,9,10,1006,0,92,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,254,2,1001,8,10,1,106,11,10,2,102,13,10,1006,0,78,101,1,9,9,1007,9,987,10,1005,10,15,99,109,612,104,0,104,1,21102,1,825594852136,1,21101,0,307,0,1106,0,411,21101,0,825326580628,1,21101,0,318,0,1105,1,411,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,179557207043,1,1,21101,0,365,0,1106,0,411,21101,0,46213012483,1,21102,376,1,0,1106,0,411,3,10,104,0,104,0,3,10,104,0,104,0,21101,988648727316,0,1,21102,399,1,0,1105,1,411,21102,988224959252,1,1,21101,0,410,0,1106,0,411,99,109,2,21201,-1,0,1,21101,0,40,2,21102,1,442,3,21101,432,0,0,1105,1,475,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,437,438,453,4,0,1001,437,1,437,108,4,437,10,1006,10,469,1102,0,1,437,109,-2,2105,1,0,0,109,4,2102,1,-1,474,1207,-3,0,10,1006,10,492,21101,0,0,-3,21202,-3,1,1,22102,1,-2,2,21101,0,1,3,21102,511,1,0,1105,1,516,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,539,2207,-4,-2,10,1006,10,539,21201,-4,0,-4,1106,0,607,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,558,0,0,1106,0,516,22101,0,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,577,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,599,21201,-1,0,1,21101,0,599,0,105,1,474,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0";
//INPUT = "1002,4,3,4,33";

/**
 *
 * @param {string} opcode
 */
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

    return function () {
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

                writeMem(getAddress(typeC, i + 1), input.read())
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
                    writeMem(third, first === second ? 1 : 0)
                    i += 4;
                }
            }
        }
    }
}

const rotateMap = {
    up: {
        0: "left",
        1: "right"
    },
    down: {
        0: "right",
        1: "left"
    },
    left: {
        0: "down",
        1: "up"
    },
    right: {
        0: "up",
        1: "down"
    }
};

const velMap = {
    right: [1, 0],
    left: [-1, 0],
    down: [0, -1],
    up: [0, 1]
};

function part1() {
    let outputBuffer = [];

    const input = new Input([0]);

    const panels = {};
    let position = [0, 0];
    let rotation = "up";

    const compute = computer(input, (x) => {
        outputBuffer.push(x);
        if (outputBuffer.length === 2) {
            const [color, dir] = outputBuffer;

            panels['' + position] = color;
            rotation = rotateMap[rotation][dir];
            const [vx, vy] = velMap[rotation];

            const [x, y] = position;
            position = [x + vx, y + vy];

            input.push(panels['' + position] ? 1 : 0);

            outputBuffer = [];
        }
    });

    while (compute()) {
    }

    console.log(Object.keys(panels).length)
}

part1();

function part2() {
    let outputBuffer = [];

    const input = new Input([1]);

    const panels = {};
    let position = [0, 0];
    let rotation = "up";

    panels['' + position] = 1;

    const compute = computer(input, (x) => {
        outputBuffer.push(x);
        if (outputBuffer.length === 2) {
            const [color, dir] = outputBuffer;

            panels['' + position] = color;
            rotation = rotateMap[rotation][dir];
            const [vx, vy] = velMap[rotation];

            const [x, y] = position;
            position = [x + vx, y + vy];

            input.push(panels['' + position] ? 1 : 0);

            outputBuffer = [];
        }
    });

    while (compute()) {
    }

    const xs = Object.keys(panels).map(x => parseInt(x.split(',')[0]))
    const ys = Object.keys(panels).map(x => parseInt(x.split(',')[1]))
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    for (let j = maxY; j >= minY; j--) {
        let line = '';
        for (let i = minX; i < maxX; i++) {
            const key = `${i},${j}`;
            line += panels[key] ? '#' : ' ';
        }
        console.log(line);
    }
}

part2();
