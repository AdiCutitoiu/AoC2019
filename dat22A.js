const CARDS = 10007;


let deck = Array.from(new Array(CARDS).fill(0).map((_, index) => index));

for (const command of INPUT().split('\n')) {
    if (command === 'deal into new stack') {
        deck.reverse();
        continue;
    }

    const tokens = command.split(' ');
    if (tokens[0] === 'cut') {
        let amount = parseInt(tokens[1]);
        if (amount < 0) {
            const cutCards = deck.splice(deck.length - Math.abs(amount), Math.abs(amount));
            deck = [...cutCards, ...deck];
        } else {
            const cutCards = deck.splice(0, amount);
            deck = [...deck, ...cutCards];
        }
    } else {
        const increment = parseInt(tokens[3]);

        const newDeck = [...deck];
        for(let i = 0; i < deck.length; i++) {
            newDeck[(i * increment) % deck.length] = deck[i];
        }

        deck = newDeck;
    }
}

console.log(deck.indexOf(2019));

function INPUT() {
    return `cut -1468
deal with increment 19
cut -7127
deal with increment 8
cut -8697
deal with increment 58
cut 4769
deal into new stack
cut 4921
deal with increment 16
cut -1538
deal with increment 55
cut 3387
deal with increment 41
cut 4127
deal with increment 26
cut 5512
deal with increment 21
deal into new stack
deal with increment 44
cut -7989
deal with increment 28
cut 569
deal into new stack
cut -9795
deal into new stack
cut -6877
deal with increment 60
cut -6500
deal with increment 37
cut -9849
deal with increment 66
cut -4821
deal with increment 50
deal into new stack
cut 9645
deal with increment 22
cut -6430
deal with increment 17
cut 658
deal with increment 67
cut -9951
deal into new stack
deal with increment 31
cut -2423
deal with increment 39
cut -5126
deal with increment 7
cut 432
deal with increment 8
cut 682
deal with increment 45
deal into new stack
deal with increment 41
cut -130
deal with increment 74
deal into new stack
cut -9207
deal into new stack
cut 7434
deal with increment 31
cut -5165
deal into new stack
cut 6209
deal with increment 25
cut 2734
deal with increment 53
deal into new stack
cut -1528
deal with increment 25
deal into new stack
deal with increment 68
cut 6458
deal into new stack
cut 1895
deal with increment 16
cut -6137
deal with increment 53
cut 2761
deal with increment 73
deal into new stack
cut 1217
deal with increment 69
deal into new stack
deal with increment 54
cut -6639
deal into new stack
cut -2891
deal with increment 10
cut -6297
deal with increment 31
cut 4591
deal with increment 35
cut -4035
deal with increment 65
cut -7504
deal into new stack
deal with increment 54
deal into new stack
cut 1313`
}
