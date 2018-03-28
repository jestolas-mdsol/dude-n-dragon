import readline from 'readline';
import EventEmitter from 'events';

import { initializeEventListeners } from './events';
import { gameState } from './store';
import {
  player,
  gameMessages,
  attackCommands,
  defendCommands,
} from './constants';
import {
  renderGameLogo,
  incrementRounds,
  showCurrentHp,
  showBattleStartMessage,
  updatePlayerName,
} from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const e = new EventEmitter();

const emit = (emitter, initiator) => { e.emit(emitter, initiator); };

const closeAndExit = () => {
  console.log('Shutting down...\n(╯°□°）╯︵ ┻━┻\nGoodbye...');
  rl.close();
  process.exit(0);
};

const runCombatPrompts = () => {
  // #here - trigger exit on death!
  showCurrentHp();

  rl.question('What do you want to do?\n', (input) => {
    if (attackCommands.includes(input)) {
      emit('attack', 'player_character');
    } else if (defendCommands.includes(input)) {
      emit('defend', 'player_character');
    } else if (input === 'exit') {
      emit('shutdown');
    } else {
      console.log(`You can't do ${input || 'nothing'}... Your turn has been wasted\n`);
      emit('dragonAction');
    }
  });
};

const gameStart = () => {
  if (!player.name) {
    rl.question('What is your name?\n', (answer) => {
      if (!answer.length) {
        updatePlayerName('Nameless One');
      } else {
        updatePlayerName(answer);
      }

      showBattleStartMessage();
      emit('loopGame');
    });
  } else {
    runCombatPrompts();
  }
};

const gameLoop = () => {
  // #here
  // validate - only re-run game if current turn has ended!
  if (gameState.previousRoundCount === gameState.currentRoundCount) {
    incrementRounds();
    emit('loopGame');
  } else {
    gameStart();
  }
};

const initializeReadlineListeners = () => {
  rl.on('line', (input) => {
    switch (input) {
      case 'exit' || 'Exit':
        emit('shutdown');
        break;
      case 'superloop': // #debug #here #remove
        emit('loopGame');
        break;
      default:
        break;
    }
  });
};

const initializeGame = () => {
  renderGameLogo();
  initializeReadlineListeners();
  initializeEventListeners(e);

  console.log(gameMessages.HELP_01);

  rl.question('ノ(°□°)~ "Hey, wanna play a game?" (y/n)\n', answer => (
    answer === 'y' ? gameLoop() : emit('shutdown')
  ));
};

export {
  closeAndExit,
  gameLoop,
  initializeGame,
};
