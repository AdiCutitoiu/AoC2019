const INPUT = `17 -7 -11
1 4 -1
6 -2 -6
19 11 9`;

const moons = INPUT.split("\n").map(line => {
  const tokens = line.split(" ");
  return {
    x: parseInt(tokens[0]),
    y: parseInt(tokens[1]),
    z: parseInt(tokens[2]),
    vX: 0,
    vY: 0,
    vZ: 0
  };
});

function computeUpdate(first, second) {
  if (first < second) {
    return 1;
  }

  if (first > second) {
    return -1;
  }

  return 0;
}

function computeEnergy(moon) {
  const { x, y, z, vX, vY, vZ } = moon;

  return (
    (Math.abs(x) + Math.abs(y) + Math.abs(z)) *
    (Math.abs(vX) + Math.abs(vY) + Math.abs(vZ))
  );
}

function move() {
  const copy = JSON.parse(JSON.stringify(moons));

  for (let i = 0; i < moons.length; i++) {
    for (let j = 0; j < moons.length; j++) {
      if (i === j) {
        continue;
      }

      moons[i].vX += computeUpdate(copy[i].x, copy[j].x);
      moons[i].vY += computeUpdate(copy[i].y, copy[j].y);
      moons[i].vZ += computeUpdate(copy[i].z, copy[j].z);
    }
  }

  for (const moon of moons) {
    moon.x += moon.vX;
    moon.y += moon.vY;
    moon.z += moon.vZ;
  }
}

const state = {
  x: new Set(),
  y: new Set(),
  z: new Set()
};

let step = 0;
for (let step = 0; step !== 500000; step++) {
  move();

  state.x.add(JSON.stringify(moons.map(({ x, vX }) => ({ x, vX }))));
  state.y.add(JSON.stringify(moons.map(({ y, vY }) => ({ y, vY }))));
  state.z.add(JSON.stringify(moons.map(({ z, vZ }) => ({ z, vZ }))));
}

function gcd(a, b) {
  const r = a % b;
  if (r == 0) return b;
  else return gcd(b, r);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log({
  part1: moons.reduce((acc, moon) => {
    return computeEnergy(moon) + acc;
  }, 0),
  part2: lcm(state.z.size, lcm(state.x.size, state.y.size))
});
