const playerData = {
  hitPoints: 100,
  armorClass: 10,
  defendModifier: 0.5,
  attacks: [
    {
      name: 'Sword Slash',
      chargeTime: 0,
      damageDieCount: 2,
      dieSides: 6,
    },
  ],
  deathMessage: 'You died!',
};

const enemyData = {
  hitPoints: 100,
  armorClass: 10,
  attacks: [
    {
      name: 'Flame Breath',
      chargeTime: 1,
      damageDieCount: 2,
      dieSides: 8,
    },
    {
      name: 'Claw Slash',
      chargeTime: 0,
      damageDieCount: 2,
      dieSides: 4,
    },
    {
      name: 'Tail Whip',
      chargeTime: 0,
      damageDieCount: 1,
      dieSides: 6,
    },
  ],
  deathMessage: 'You have slain the young wyrm!',
};

const gameMessages = {
  prompt: 'Enter "exit" at any time to quit the program and lose all game data!\n\n\n',
  encounter: 'You snap back to consciousness in the middle of a fight against a young dragon. You can\'t remember how the fight started, only that you must survive this encounter somehow.\n\n',
};

// future improvement -- may not be necessary yet....
const playerActionNames = ['attack', 'defend', 'run'];

const actionCategories = {
  attacks: 'attacks',
  defends: 'defenses',
  miscs: 'misc',
};

export {
  gameMessages,
  playerActionNames,
  actionCategories,
  playerData,
  enemyData,
};
