import {
  player,
  enemy,
  gameMessages,
} from '../constants';
import { gameState } from '../store';

const clearMessages = () => { console.log('\x1Bc'); };

const renderDynamicActionMessage = () => { console.log('foobar'); };

// #here - make this dynamic action message;
const renderActionMessage = ({ entityType, entityName }) => {
  if (entityType === 'player_character') {
    console.log(`You swing your weapon at ${enemy.name}...`);
  } else {
    console.log(`${entityName} locks its menacing gaze upon you...`);
  }
};

const continueRound = ({ e, entityType }) => {
  if (entityType === 'player_character') {
    e.emit('dragonAction');
  } else {
    e.emit('loopGame');
  }
};

const incrementRounds = () => {
  console.log(`current round count: ${gameState.currentRoundCount}`);
  gameState.previousRoundCount = gameState.currentRoundCount;
  gameState.currentRoundCount += 1;
};

const showCurrentHp = () => {
  console.log(`You are in combat with ${enemy.name}.`);
  console.log(`\n\n${player.name}: ${player.hitPoints}HP`);
  console.log(`${enemy.name}: ${enemy.hitPoints}HP\n\n`);
};

const showBattleStartMessage = () => {
  console.log(`\nGreetings, ${player.name}!\n`);
  console.log(`${gameMessages.encounter}\n\n\n`);
};

const updatePlayerName = (name) => { player.name = name; };

const renderGameLogo = () => {
  const flair = [
    '    ____            __        ___        ____                             ',
    '   / __ \\__  ______/ /__     ( _ )      / __ \\_________ _____ _____  ____ ',
    '  / / / / / / / __  / _ \\   / __ \\/|   / / / / ___/ __ `/ __ `/ __ \\/ __ \\',
    ' / /_/ / /_/ / /_/ /  __/  / /_/  <   / /_/ / /  / /_/ / /_/ / /_/ / / / /',
    '/_____/\\__,_/\\__,_/\\___/   \\____/\\/  /_____/_/   \\__,_/\\__, /\\____/_/ /_/ ',
    '                                                      /____/',
    '\n\n\n',
  ];

  console.log('booting up...\n\n\n');
  console.log(flair.join('\n'));
};

export {
  renderActionMessage,
  continueRound,
  renderGameLogo,
  incrementRounds,
  showCurrentHp,
  showBattleStartMessage,
  updatePlayerName,
  clearMessages,
  renderDynamicActionMessage,
};
