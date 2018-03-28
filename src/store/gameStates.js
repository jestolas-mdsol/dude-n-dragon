const gameState = {
  previousRoundCount: 0,
  currentRoundCount: 0,
};

const playerCharacters = [
  {
    code: 'PC01', // primary key
    type: 'player_character',
    name: null,
    inCombat: false, // set to true at beginning of combat
    hitPoints: 100,
    armorClass: 10,
    defendModifier: 0.5, // 0 through 1
    currentActionCategory: null,
    actions: {
      attacks: [ // category || actionType
        {
          code: 'ATK_01',
          name: 'Sword Slash',
          chargeTime: 0,
          damageDieCount: 2,
          dieSides: 6,
        },
      ],
    },
  },
];

const nonPlayerCharacters = [
  {
    code: 'EN01',
    type: 'non_player_character',
    npcClass: 'wyrm', // can have other classes like civilian, "key" npcs, bandit, etc...
    reputationWithPlayer: 0, // 0 to 10, determines hostility towards PC
    name: 'Skald The Wyrm',
    inCombat: false, // set to true at beginning of combat
    hitPoints: 300,
    armorClass: 10,
    defendModifier: 0,
    currentActionCategory: null,
    actions: {
      attacks: [
        {
          code: 'ATK_101',
          name: 'Flame Breath',
          chargeTime: 1,
          damageDieCount: 2,
          dieSides: 8,
        },
        {
          code: 'ATK_102',
          name: 'Claw Slash',
          chargeTime: 0,
          damageDieCount: 2,
          dieSides: 4,
        },
        {
          code: 'ATK_103',
          name: 'Tail Whip',
          chargeTime: 0,
          damageDieCount: 1,
          dieSides: 6,
        },
      ],
    },
  },
];

export {
  gameState,
  playerCharacters,
  nonPlayerCharacters,
};
