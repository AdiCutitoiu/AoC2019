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

    push(x) {
        this.data.push(x);
    }

    canRead() {
        return this.index < this.data.length;
    }
}

let INPUT =
    "3,8,1001,8,10,8,105,1,0,0,21,34,55,68,85,106,187,268,349,430,99999,3,9,1001,9,5,9,1002,9,5,9,4,9,99,3,9,1002,9,2,9,1001,9,2,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,102,3,9,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99";

/**
 *
 * @param {string} opcode
 */
function parseOpcode(opcode) {
    const digits = ("" + opcode).split("");
    while (digits.length < 5) {
        digits.unshift("0");
    }

    const [immediateA, immediateB, immediateC] = digits
        .splice(0, 3)
        .map(x => !!parseInt(x));
    return {
        immediateA,
        immediateB,
        immediateC,
        opcode: parseInt(digits.join(""))
    };
}

function compute(input, output) {
    const numbers = INPUT.split(",").map(x => parseInt(x));
    let i = 0;
    return function () {
        while (true) {
            const instr = numbers[i];
            const { opcode, immediateA, immediateB, immediateC } = parseOpcode(instr);

            if (opcode === 99) {
                return true;
            }

            const first = immediateC ? numbers[i + 1] : numbers[numbers[i + 1]];
            const second = immediateB ? numbers[i + 2] : numbers[numbers[i + 2]];
            const third = immediateA ? i + 3 : numbers[i + 3];

            if (opcode === 1) {
                numbers[third] = first + second;
                i += 4;
            } else if (opcode === 2) {
                numbers[third] = first * second;
                i += 4;
            } else if (opcode === 3) {
                if (!input.canRead()) {
                    return false;
                }

                numbers[numbers[i + 1]] = input.read();
                i += 2;
            } else if (opcode === 4) {
                output(first);
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
                    numbers[third] = first < second ? 1 : 0;
                    i += 4;
                } else if (opcode === 8) {
                    numbers[third] = first === second ? 1 : 0;
                    i += 4;
                }
            }
        }


    }
}

function isPermutation(inputs) {
    const temp = [...inputs];
    temp.sort();
    for (let i = 1; i < temp.length; i++) {
        if (temp[i] === temp[i - 1]) {
            return false;
        }
    }
    return true;
}

let max = -Infinity;

const nums = [9, 8, 7, 6, 5];
nums.forEach(a => {
    nums.forEach(b => {
        nums.forEach(c => {
            nums.forEach(d => {
                nums.forEach(e => {
                    if (!isPermutation([a, b, c, d, e])) {
                        return;
                    }
                    console.log([a, b, c, d, e])

                    let inputSignal = 0;

                    let inputA = new Input([a, 0])
                    let inputB = new Input([b])
                    let inputC = new Input([c])
                    let inputD = new Input([d])
                    let inputE = new Input([e])

                    const amps = [
                        compute(inputA, x => inputB.push(x)),
                        compute(inputB, x => inputC.push(x)),
                        compute(inputC, x => inputD.push(x)),
                        compute(inputD, x => inputE.push(x)),
                        compute(inputE, x => {
                            inputA.push(x);
                            inputSignal = x;
                        })
                    ];

                    let done = false;
                    while (!done) {
                        const [ampA, ampB, ampC, ampD, ampE] = amps;
                        let res = ampA();
                        res = ampB();
                        res = ampC();
                        res = ampD();
                        res = ampE();

                        if(res) {
                            done = true;
                        }
                    }

                    if (inputSignal > max) {
                        max = inputSignal;
                    }
                })
            })
        })
    })
})

console.log(max);
