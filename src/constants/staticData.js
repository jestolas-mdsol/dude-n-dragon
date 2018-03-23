const gameMessages = {
  prompt: 'Enter "exit" at any time to quit the program and lose all game data!\n\n\n',
  encounter: 'You snap back to consciousness in the middle of a fight against a young dragon. You can\'t remember how the fight started, only that you must survive this encounter somehow.\n\n',
};

// future improvement -- may not be necessary yet....
const attackCommands = ['a', 'attack', 'hit', 'slash', 'hit it'];
const defendCommands = ['d', 'defend', 'shield', 'shield up', 'curl into a ball', 'brace thyself', 'brace', 'brace self'];

const actionCategories = {
  attacks: 'attacks',
  defends: 'defends',
};

// consider changing to:
// const actionCategories = [
//   {
//     code: 'ACTION_01',
//     names: 'attack',
//   },
//   {
//     code: 'ACTION_02',
//     names: 'defend',
//   },
//   {
//     code: 'ACTION_03',
//     names: 'flee',
//   },
// ];

export {
  gameMessages,
  attackCommands,
  defendCommands,
  actionCategories,
};
