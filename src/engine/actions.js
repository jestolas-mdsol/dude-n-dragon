import {
  playerAttackCodes,
  dragonAttackCodes,
  player,
  enemy,
  actionCategories,
} from '../constants';

import {
  rollTwentyVsDc,
  fetchEntityAction,
  calculateNetDamage,
  setActionState,
  updateHitPoints
} from '../utils';

// find a cloth and DRY this up!!!
const attack = (e, initiator) => {
  if (!initiator) {
    console.error('initiator cannot be null');
    e.emit('shutdown');
  } else if (initiator !== 'player_character') {
    console.log(`${enemy.name} locks its menacing gaze upon you...`);
  } else {
    console.log(`You swing your weapon at ${enemy.name}...`);
  }

  const entity = initiator === 'player_character' ? player : enemy;
  const actionParams = { entity, category: actionCategories.attacks };
  setActionState(actionParams);
  const hit = rollTwentyVsDc(enemy.armorClass);

  if (hit) {
    const attackAction = fetchEntityAction(actionParams);
    // currently set to player defendModifier only (dragon can't take defend action yet)
    const defendModifier = player.currentActionCategory === 'defends' ? player.defendModifier : 0;
    const damage = calculateNetDamage({ dieCount: attackAction.damageDieCount, dieSides: attackAction.dieSides, defendModifier });

    // #here change this const name...
    const hpAdjustmentData = {
      adjustmentType: '-', // string
      hpAdjustmentAmount: damage, // number
      target: entity,
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
  // DRY this up
  const entity = initiator === 'player_character' ? player : enemy;
  const actionParams = { entity, category: actionCategories.defends };
  setActionState(actionParams);

  console.log('You raise your shield and brace yourself...');

  console.log('\n.\n.\n.\n');
  e.emit('dragonAction');
};

export {
  attack,
  defend,
};
