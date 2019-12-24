let bugs = `..##.
#....
.....
#.#.#
#..#.`.split("\n");

const SIZE = 5;

function getNeighbours(line, col) {
  return [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ]
    .map(([x, y]) => [x + line, y + col])
    .filter(([x, y]) => x >= 0 && y >= 0 && x < SIZE && y < SIZE);
}

function computeNewBugs() {
  let newBugs = [];

  for (let i = 0; i < SIZE; i++) {
    let line = "";

    for (let j = 0; j < SIZE; j++) {
      const neighbours = getNeighbours(i, j);

      const aliveBugCount = neighbours.filter(([x, y]) => bugs[x][y] === "#")
        .length;

      if (bugs[i][j] === "#") {
        line += aliveBugCount === 1 ? "#" : ".";
      } else {
        line += [1, 2].includes(aliveBugCount) ? "#" : ".";
      }
    }

    newBugs.push(line);
  }

  return newBugs;
}

function print(bugs) {
  // console.log(bugs.join("\n"));
  // console.log("\n");
}

const bugSet = new Set();

function addToSet(bugs) {
  const str = bugs.join("");
  if (bugSet.has(str)) {
    return false;
  }

  bugSet.add(str);
  return true;
}

addToSet(bugs);
while (true) {
  const newBugs = computeNewBugs();
  print(newBugs);
  bugs = newBugs;

  if (!addToSet(newBugs)) {
    break;
  }
}

let biodiversity = 0;
for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    if (bugs[i][j] === "#") {
      biodiversity = biodiversity + Math.pow(2, i * SIZE + j);
    }
  }
}

console.log(biodiversity);
