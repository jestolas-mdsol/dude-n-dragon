
import { actionRouter } from '../engine';
import { gameLoop, closeAndExit } from '../game';

const initializeEventListeners = (e) => {

  e.on('attack', (initiatorType) => {
    actionRouter({e, initiator: initiatorType, actionName: 'attack'});
  });

  e.on('defend', (initiatorType) => {
    actionRouter({e, initiator: initiatorType, actionName: 'defend'});
  });

  e.on('dragonAction', () => {
    e.emit('attack', 'non_player_character')
  });

  e.on('loopGame', () => {
    gameLoop();
  });

  e.on('shutdown', () => {
    closeAndExit();
  });
};

export { initializeEventListeners };
