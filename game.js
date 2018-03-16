import readline from 'readline';
import EventEmitter from 'events';

import { gameState, playerCharacters, nonPlayerCharacters } from './gameStates';
import { initializeEventListeners } from './listeners';
import { gameMessages, playerActionNames } from './constants';

// ====================================================================================
// NEED TO DRY!!! #here
const fetchPlayerData = code => (playerCharacters.find(pc => pc.code === code));
const fetchEnemyrData = code => (nonPlayerCharacters.find(pc => pc.code === code));

const player = fetchPlayerData('PC01');
const enemy = fetchEnemyrData('EN01');

// ====================================================================================

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

// #here move this...
const currentStatuses = () => {
  console.log(`${player.name}: ${player.hitPoints}HP`);
  console.log(`${enemy.name}: ${enemy.hitPoints}HP`);
};

// #combat
const initiateCombat = () => {
  // #here
  // trigger exit on death!

  // replace with current player status
  console.log(`You are in combat with ${enemy.name}.`);
  currentStatuses();

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

// #here move this Util
const updatePlayerName = (name) => { player.name = name; };

const gameStart = () => {
  if (!player.name) {
    rl.question('What is your name?\n', (answer) => {
      if (!answer.length) {
        updatePlayerName('Nameless One');
      } else {
        updatePlayerName(answer);
      }

      console.log(`\nGreetings, ${player.name}!\n`);
      console.log(`${gameMessages.encounter}\n\n\n`);
      emit('loopGame');
    });
  } else {
    initiateCombat();
  }
};

// ! ! ! on gameState change, loop the game ! ! !
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
