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
  updateHitPoints,
  renderActionMessage,
  continueRound,
} from '../utils';

const attack = ({
  e,
  entity,
  target,
  actionCategory,
}) => {
  const hit = rollTwentyVsDc(enemy.armorClass);
  setActionState({ entity, actionCategory });
  renderActionMessage({ entityType: entity.type, entityName: entity.name });

  if (hit) {
    const attackAction = fetchEntityAction({ category: actionCategory, entityCode: entity.code, actions: entity.actions });
    const damage = calculateNetDamage({ dieCount: attackAction.damageDieCount, dieSides: attackAction.dieSides, target });
    // #here change this const name...
    const hpAdjustmentData = {
      adjustmentType: '-',
      hpAdjustmentAmount: damage,
      target,
    };

    updateHitPoints(hpAdjustmentData);

    console.log(`${attackAction.name} deals ${damage} damage`);
  } else {
    console.log(`${entity.name} missed!`);
  }

  console.log('\n.\n.\n.\n');
  continueRound({ e, entityType: entity.type });
};

const defend = ({ e, entity, target, actionCategory }) => {
  // target is currently unused for this action
  setActionState({ entity, actionCategory });

  console.log('You raise your shield and brace yourself...');
  console.log('\n.\n.\n.\n');

  continueRound({ e, entityType: entity.type });
};

const actionRouter = ({ e, initiator, actionName }) => {
  const entity = initiator === 'player_character' ? player : enemy;
  // #here future improvement: set targeting logic
  const target = initiator === 'player_character' ? enemy : player;
  const data = {
    e,
    entity,
    target,
    actionCategory: `${actionName}s`,
  };

  switch (actionName) {
    case 'attack':
      attack(data);
      break;
    case 'defend':
      defend(data);
      break;
    default:
      console.log('That action does not exist! (╯°□°)╯︵ ┻━┻');
      e.emit('shutdown');
      break;
  }
};

export { actionRouter };
