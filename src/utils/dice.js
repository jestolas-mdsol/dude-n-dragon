const rollDie = n => (Math.floor((Math.random() * n) + 1));

const rollTwentyVsDc = dc => (rollDie(20) >= dc);

export {
  rollDie,
  rollTwentyVsDc,
};
