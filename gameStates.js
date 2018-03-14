const gameState = {
  previousRoundCount: 0,
  currentRoundCount: 0,
  exitInvoked: false,
  // stiff...
};

const currentActionData = {
  initiatorCode: null, // player/enemy.code
  targetCode: null, // player/enemy.code
  actionType: null, // attack/defend/other targetaable actions
  hitPointDelta: null, // +/- change in hp
  hitPointDeltaType: null, // null by default || incr/decr
  // other...
};

const player = {
  code: 'PL01',
  name: '',
  hitPoints: 100,
  currentTarget: 'enemy', // can expand to target selection using targets array
  // stuff...
};

const enemy = {
  code: 'EN01',
  name: 'Skald The Wyrm',
  hitPoints: 300,
  currentTarget: 'player',
  // stuff...
};

export {
  gameState,
  player,
  enemy,
  currentActionData,
};
