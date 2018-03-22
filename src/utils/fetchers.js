import { playerCharacters, nonPlayerCharacters } from '../store';

// ==============
// private methods
// ==============
const fetchActionCode = (entity, category) => {
  if (entity.code === 'EN01') {
    const enemyActionsList = entity.actions[category];
    const idx = Math.floor(Math.random() * enemyActionsList.length);

    return enemyActionsList[idx].code;
  }

  return 'ATK_01';
};

// ==============
// exported methods
// ==============
const fetchPlayerData = code => (playerCharacters.find(pc => pc.code === code));

const fetchEnemyrData = code => (nonPlayerCharacters.find(npc => npc.code === code));

const fetchEntityAction = ({ entity, category }) => {
  const actionCode = fetchActionCode(entity, category);

  return entity.actions[category]
  .find(action => (action.code === actionCode))
};


export {
  fetchPlayerData,
  fetchEnemyrData,
  fetchEntityAction,
};
