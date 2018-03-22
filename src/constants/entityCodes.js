import { fetchPlayerData, fetchEnemyrData } from '../utils';

const playerCode = 'PC01';
const enemyCode = 'EN01';

// ==========================
// exported constants
// ==========================
// ideally, these should be fetched from the appropriate state objects... WIP
const playerAttackCodes = ['ATK_01'];
const dragonAttackCodes = ['ATK_101', 'ATK_102', 'ATK_103'];

const player = fetchPlayerData(playerCode);
const enemy = fetchEnemyrData(enemyCode);

export {
  playerAttackCodes,
  dragonAttackCodes,
  player,
  enemy,
};
