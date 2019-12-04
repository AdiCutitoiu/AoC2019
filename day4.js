const FROM = 278384;
const TO = 824795;

function check(number, filter) {
  const digits = ("" + number).split("");

  const orderedDigits = [...digits].sort();
  if (digits.join("") !== orderedDigits.join("")) {
    return false;
  }

  const freqs = digits
    .reduce(
      (acc, current) => ({
        ...acc,
        [current]: (acc[current] || 0) + 1
      }),
      {}
    );

  const matchingFreq = Object.keys(freqs)
    .map(key => freqs[key])
    .filter(filter);

  return matchingFreq.length !== 0;
}

let count = 0;
for (let i = FROM; i <= TO; i++) {
  if (check(i, value => value >= 2)) {
    count++;
  }
}

console.log(count);

count = 0;
for (let i = FROM; i <= TO; i++) {
  if (check(i, value => value === 2)) {
    count++;
  }
}

console.log(count);
