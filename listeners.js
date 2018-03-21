
import { attack, defend, flee } from './playerActions';
import { gameLoop, incrementRounds, closeAndExit } from './game';

const initializeEventListeners = (e) => {
  const emit = (eventName) => {
    e.emit(eventName);
  };

  e.on('attack', (initiatorType) => {
    console.log('initiatorType -- listener: ', initiatorType);

    attack(e, initiatorType);
  });

  e.on('defend', (initiatorType) => {
    defend(e, initiatorType);
  });

  e.on('flee', (initiatorType) => {
    flee(e, initiatorType);
  });

  e.on('dragonAction', () => {
    console.log('\npreparing dragon action...\n\n');
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
