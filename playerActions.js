import { gameState, playerCharacters, nonPlayerCharacters } from './gameStates';
import { actionCategories, playerData, enemyData, currentActionData } from './constants';

// ==============
// misc roll
// ==============
const rollDie = n => (Math.floor((Math.random() * n) + 1));

console.log(playerCharacters, nonPlayerCharacters);

const fetchPlayerData = code => (playerCharacters.find(pc => pc.code === code));
const fetchEnemyrData = code => (nonPlayerCharacters.find(npc => npc.code === code));

const playerCode = 'PC01';
const enemyCode = 'EN01';
const playerAttackCodes = ['ATK_01'];
const dragonAttackCodes = ['ATK_101', 'ATK_102', 'ATK_103'];

const player = fetchPlayerData(playerCode);
const enemy = fetchEnemyrData(enemyCode);

// prop validations???
const fetchPlayerAction = keys => (player.actions[keys.category].find(action => (action.code === keys.actionCode)));

const fetchEnemyAction = keys => (enemy.actions[keys.category].find(action => (action.code === keys.actionCode)));


// ==============
// action logic
// ==============
const rollTwentyVsDc = dc => (rollDie(20) >= dc);

const calculateDamage = (dieCount, dieSides) => {
  const damageCounts = [];
  while (damageCounts.length < dieCount) {
    damageCounts.push(rollDie(dieSides));
  }

  return damageCounts.reduce((acc, cur) => acc + cur);
};

const updateHitPoints = (data) => {
  if (data.adjustmentType === '+') {
    enemy.hitPoints += data.hpAdjustment;
  } else {
    enemy.hitPoints -= data.hpAdjustment;
  }
};

// ==============
// event actions
// ==============
const attack = (e) => {
  console.log(`You swing your weapon at ${enemy.name}...`);
  const hit = rollTwentyVsDc(enemy.armorClass);

  if (hit) {
    const actioParams = { category: actionCategories.attacks, actionCode: playerAttackCodes[0] };
    const attackAction = fetchPlayerAction(actioParams);
    const damage = calculateDamage(attackAction.damageDieCount, attackAction.dieSides);

    // #here change this const name...
    const hpAdjustmentData = {
      adjustmentType: '-', // string
      hpAdjustment: damage, // number
    };

    updateHitPoints(hpAdjustmentData);

    console.log(`${attackAction.name} deals ${damage} damage`);
    // subtract damage from dragon's hp
  } else {
    console.log('Your attack missed');
  }

  // #here
  // DRY up this call
  console.log('\n.\n.\n.\n');
  e.emit('dragonAction');
};

const defend = (e) => {
  console.log('Defending...');
  console.log('\n.\n.\n.\n');
  e.emit('dragonAction');
};

const flee = (e) => {
  console.log('You attempt to run...');
  console.log('\n.\n.\n.\n');
  e.emit('dragonAction');
};

export {
  attack,
  defend,
  flee,
};
