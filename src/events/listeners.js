
import { attack, defend } from '../engine';
import { gameLoop, closeAndExit } from '../game';

const initializeEventListeners = (e) => {
  const emit = (eventName) => {
    e.emit(eventName);
  };

  e.on('attack', (initiatorType) => {
    attack(e, initiatorType);
  });

  e.on('defend', (initiatorType) => {
    defend(e, initiatorType);
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
