
import { attack, defend, flee } from './playerActions';
import { gameLoop, incrementRounds, closeAndExit } from './game';

const initializeEventListeners = (e) => {
  const emit = (eventName) => {
    e.emit(eventName);
  };

  e.on('attack', () => {
    attack(e);

    // STEPS::
    // attack
    // roll to hit
      // if hit -- adjust enemy hp
      // if miss -- proceed to enemy action
  });

  e.on('defend', () => {
    defend(e);
  });

  e.on('flee', () => {
    flee(e);
  });

  e.on('dragonAction', () => {
    console.log('dragon attacks...\n\n');
    emit('loopGame');
  });

  e.on('loopGame', () => {
    gameLoop();
  });

  e.on('shutdown', () => {
    closeAndExit();
  });
};

export { initializeEventListeners };
