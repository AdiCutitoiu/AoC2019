const INPUT =
  "59796332430280528211060657577039744056609636505111313336094865900635343682296702094018432765613019371234483818415934914575717134617783515237300919201989706451524069044921384738930172026234872525254689609787752401342687098918804210494391161531008341329016626922990938854681575317559821067933058630688365067790812341475168200215494963690593873250884807840611487288560291748414160551508979374335267106414602526249401281066501677212002980616711058803845336067123298983258010079178111678678796586176705130938139337603538683803154824502761228184209473344607055926120829751532887810487164482307564712692208157118923502010028250886290873995577102178526942152";

function compute(initial) {
  let digits = [...initial];

  for (let count = 0; count < 100; count++) {
    const newDigits = [...digits];

    const partialSums = [...newDigits];
    for (let i = 1; i < newDigits.length; i++) {
      partialSums[i] += partialSums[i - 1];
    }

    for (let i = 0; i < digits.length; i++) {
      let number = 0;
      const length = i + 1;
      const step = length * 4;

      for (let j = i; j < digits.length; j += step) {
        const begin = j;
        const end = j + length;

        const toSubstract = begin === 0 ? 0 : partialSums[begin - 1];
        const toAdd =
          end >= partialSums.length
            ? partialSums[partialSums.length - 1]
            : partialSums[end - 1];
        number += toAdd - toSubstract;
      }

      for (let j = i + 2 * length; j < digits.length; j += step) {
        const begin = j;
        const end = j + length;

        const toSubstract = begin === 0 ? 0 : partialSums[begin - 1];
        const toAdd =
          end >= partialSums.length
            ? partialSums[partialSums.length - 1]
            : partialSums[end - 1];
        number -= toAdd - toSubstract;
      }

      newDigits[i] = Math.abs(number) % 10;
    }

    digits = newDigits;
  }

  return digits;
}

const originalDigits = INPUT.split("").map(x => parseInt(x));
let digits = [];
for (let i = 0; i < 10000; i++) {
  digits.push(...originalDigits);
}

const part1 = compute(originalDigits)
  .splice(0, 8)
  .join("");

const offset = parseInt(INPUT.substr(0, 7));
const part2 = compute(digits)
  .splice(offset, 8)
  .join("");

console.log({ part1, part2 });
