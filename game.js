import readline from 'readline';
import EventEmitter from 'events';

import { gameState, player, enemy } from './gameStates';
import { initializeEventListeners } from './listeners';
import { gameMessages, playerActionNames } from './constants';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const e = new EventEmitter();

const emit = (eventName) => {
  e.emit(eventName);
};

const incrementRounds = () => {
  console.log(`current round count: ${gameState.currentRoundCount}`);
  gameState.previousRoundCount = gameState.currentRoundCount;
  gameState.currentRoundCount += 1;
};

const closeAndExit = () => {
  console.log('(╯°□°）╯︵ ┻━┻\nGoodbye...');
  gameState.exitInvoked = true;
  rl.close();
  process.exit(0);
};

// #combat
const initiateCombat = () => {
  // #here
  // trigger exit on death!

  // replace with current player status
  console.log(`You are in combat with ${enemy.name}.`);
  rl.question('What do you want to do?\n', (input) => {
    console.log(`You attempt to ${input}...`);
    if (playerActionNames.includes(input)) {
      emit(input);
    } else if (input === 'exit') {
      emit('shutdown');
    } else {
      console.log(`You can't do ${input}... Your turn has been wasted\n`);
      emit('dragonAction');
    }
  });
};

const gameStart = () => {
  if (player.name.length) {
    initiateCombat();
  } else {
    rl.question('What is your name?\n', (answer) => {
      if (!answer.length) {
        player.name = 'Nameless One';
      } else {
        player.name = answer;
      }

      console.log(`\nGreetings, ${player.name}!\n`);
      console.log(`${gameMessages.encounter}\n\n\n`);
      emit('loopGame');
    });
  }
};

// ! ! ! on gameState change, loop the game ! ! !
const gameLoop = () => {
  // #here
  //validate - only re-run game if current turn has ended!
  gameStart();
};

const initializeReadlineListeners = () => {
  rl.on('line', (input) => {
    switch (input) {
      case 'exit' || 'Exit':
        emit('shutdown');
        break;
      case 'superloop': // #debug #here
        emit('loopGame');
        break;
      default:
        break;
    }
  });
};

// #init
const initializeGame = () => {
  console.log('booting up...');
  initializeReadlineListeners();
  initializeEventListeners(e);

  console.log(gameMessages.prompt);

  rl.question('<(७° ʖ°७)~ "Hey, wanna play a game?" (y/n)\n', answer => (
    answer === 'y' ? gameLoop() : emit('shutdown')
  ));
};

export {
  incrementRounds,
  closeAndExit,
  gameLoop,
  initializeGame,
};
