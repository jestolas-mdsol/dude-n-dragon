import { enemy } from '../constants';

const renderActionMessage = ({ entityType, entityName }) => {
  if (entityType === 'player_character') {
    console.log(`You swing your weapon at ${enemy.name}...`);
  } else {
    console.log(`${entityName} locks its menacing gaze upon you...`);
  }
}

const continueRound = ({ e, entityType }) => {
  if (entityType === 'player_character') {
    e.emit('dragonAction');
  } else {
    e.emit('loopGame');
  }
}

export {
  renderActionMessage,
  continueRound,
}
