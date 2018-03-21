import { gameState, playerCharacters, nonPlayerCharacters } from './gameStates';
import { actionCategories, playerData, enemyData, currentActionData } from './constants';

// ==============
// misc roll
// ==============
const rollDie = n => (Math.floor((Math.random() * n) + 1));

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

const calculateDamage = (data) => {
  const damageCounts = [];
  while (damageCounts.length < data.dieCount) {
    damageCounts.push(rollDie(data.dieSides));
  }

  const totalDamage = damageCounts.reduce((acc, cur) => acc + cur);
  if (data.defendModifier < 1) { console.log('damage reduced!'); }

  return Math.ceil(totalDamage * (1 - data.defendModifier));
};

const setActionState = (data) => {
  // shape: { initiator, actionCategory }
  if (data.initiator === 'player_character') {
    player.currentActionCategory = data.actionCategory;
  } else {
    enemy.currentActionCategory = data.actionCategory;
  }
};

// #here move away from mutation!!!
const updateHitPoints = ({ adjustmentType, target, hpAdjustmentAmount }) => {
  if (adjustmentType === '+') {
    target.hitPoints += hpAdjustmentAmount; // ideally, this should run a state change method instead of mutating the state object
  } else {
    target.hitPoints -= hpAdjustmentAmount;
  }
};

// ==============
// event actions
// ==============

// find a cloth and DRY this up!!!
const attack = (e, initiator) => {
  let actionCode = initiator === 'player_character' ? playerAttackCodes[0] : dragonAttackCodes[0];

  if (!initiator) {
    console.error('initiator cannot be null');
    return;
  } else if (initiator !== 'player_character') {
    const idx = Math.floor(Math.random() * dragonAttackCodes.length);
    actionCode = dragonAttackCodes[idx];
    console.log(`${enemy.name} locks its menacing eyes on you...`);
  } else {
    console.log(`You swing your weapon at ${enemy.name}...`);
  }

  const actionStateParams = { initiator, actionCategory: actionCategories.attacks };
  setActionState(actionStateParams);

  const hit = rollTwentyVsDc(enemy.armorClass);

  if (hit) {
    // randomize or weight dragon action
    const actionParams = { category: actionCategories.attacks, actionCode };
    const attackAction = initiator === 'player_character' ? fetchPlayerAction(actionParams) : fetchEnemyAction(actionParams);
    // currently set to player defendModifier only (dragon can't take defend action yet)
    const defendModifier = player.currentActionCategory === 'defends' ? player.defendModifier : 0;
    const damage = calculateDamage({ dieCount: attackAction.damageDieCount, dieSides: attackAction.dieSides, defendModifier });

    // #here change this const name...
    const hpAdjustmentData = {
      adjustmentType: '-', // string
      hpAdjustmentAmount: damage, // number
      target: initiator === 'player_character' ? enemy : player,
    };

    updateHitPoints(hpAdjustmentData);

    console.log(`${attackAction.name} deals ${damage} damage`);
  } else {
    console.log(`${initiator === 'player_character' ? player.name : enemy.name} missed!`);
  }

  console.log('\n.\n.\n.\n');

  // DRY up this call
  if (initiator === 'player_character') {
    e.emit('dragonAction');
  } else {
    e.emit('loopGame');
  }
};

const defend = (e, initiator) => {
  const actionStateParams = { initiator, actionCategory: actionCategories.defends };
  setActionState(actionStateParams);

  console.log('Shield up! You brqce yourself for an impending hit...');

  console.log('\n.\n.\n.\n');
  e.emit('dragonAction');
};

const flee = (e) => {
  console.log('You turn your back and attempt to flee...');
  e.emit('dragonAction');
};

export {
  attack,
  defend,
  flee,
};
