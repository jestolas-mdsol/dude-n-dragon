
import { attack, defend, flee } from './playerActions';
import { gameLoop, incrementRounds, closeAndExit } from './game';

const initializeEventListeners = (e) => {
  const emit = (eventName) => {
    e.emit(eventName);
  };

  e.on('attack', () => {
    attack(e);
  });

  e.on('defend', () => {
    defend(e);
  });

  e.on('flee', () => {
    flee(e);
  });

  e.on('dragonAction', () => {
    console.log('dragon attacks...');
    emit('loopGame');
  });

  e.on('loopGame', () => {
    incrementRounds();
    gameLoop();
  });

  e.on('shutdown', () => {
    closeAndExit();
  });
};

export { initializeEventListeners };
