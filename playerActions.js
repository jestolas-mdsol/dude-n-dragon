import { gameState, player, enemy } from './gameStates';
import { playerData, enemyData, currentActionData } from './constants';

// ==============
// dice roll
// ==============
const rollDie = (n) => {
  const result = Math.floor((Math.random() * n) + 1);
  console.log(`rolling a d${n}...\nRolled a ${result}`);
  return result;
};

// ==============
// action logic
// ==============
const attackConnects = DC => (rollDie(20) >= DC);

const damageCount = (dieCount, dieSides) => {
  const damageCounts = [];
  while (damageCounts.length < dieCount) {
    damageCounts.push(rollDie(dieSides));
  }
  return damageCounts.reduce((acc, cur) => acc + cur);
};

// const updateHitPoints = (data) => {
//   if (data.target === 'player') {
//     player.hitPoints -= data.damageReceived;
//   } else {
//     enemy.hitPoints -= data.damageReceived;
//   }
// };

const updateActionData = (data) => {
  currentActionData.actionSuccess = data.actionSuccess || null;
  currentActionData.initiatorCode = data.initiatorCode || null;
  currentActionData.targetCode = data.targetCode || null;
  currentActionData.actionType = data.actionType || null;
  currentActionData.hitPointDelta = data.hitPointDelta || null;
  currentActionData.hitPointDeltaType = data.hitPointDeltaType || null;
};

const setDefaultActiondata = () => {
  currentActionData.actionSuccess = null;
  currentActionData.initiatorCode = null;
  currentActionData.targetCode = null;
  currentActionData.actionType = null;
  currentActionData.hitPointDelta = null;
  currentActionData.hitPointDeltaType = null;
};

// ==============
// event actions
// ==============
const attack = (e) => {
  const hit = attackConnects(enemyData.armorClass);
  console.log(`You swing your weapon at ${enemyData.name}...`);
  if (hit) {
    const swordSlash = playerData.attacks[0];
    const damage = damageCount(swordSlash.damageDieCount, swordSlash.dieSides);
    console.log(`${swordSlash.name} deals ${damage} damage`);
    // subtract damage from dragon's hp
  } else {
    console.log('Your attack missed');
  }

  // #here
  // DRY up this call
  e.emit('dragonAction');
};
const defend = (e) => {
  console.log('Defending...');
  e.emit('dragonAction');
};
const flee = (e) => {
  console.log('You attempt to run...');
  e.emit('dragonAction');
};

export {
  attack,
  defend,
  flee,
};
