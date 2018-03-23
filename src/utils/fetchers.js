import { playerCharacters, nonPlayerCharacters } from '../store';

// ==============
// private methods
// ==============
const fetchActionCode = ({ category, entityCode, actionsList, }) => {
  // #here this condition should only be applied to an npc
  if (entityCode === 'EN01') {
    const idx = Math.floor(Math.random() * actionsList.length);

    return actionsList[idx].code;
  }

  return 'ATK_01';
};

// ==============
// exported methods
// ==============
const fetchPlayerData = code => (playerCharacters.find(pc => pc.code === code));

const fetchEnemyrData = code => (nonPlayerCharacters.find(npc => npc.code === code));

const fetchEntityAction = ({ category, entityCode, actions }) => {
  const actionCode = fetchActionCode({ category, entityCode, actionsList: actions[category] });

  return actions[category].find(action => (action.code === actionCode))
};


export {
  fetchPlayerData,
  fetchEnemyrData,
  fetchEntityAction,
};
