import { rollDie } from './dice';

const calculateNetDamage = ({ dieCount, dieSides, target }) => {
  const defendModifier = target.currentActionCategory === 'defends' ? target.defendModifier : 0;
  const damageCounts = [];
  while (damageCounts.length < dieCount) {
    damageCounts.push(rollDie(dieSides));
  }

  const rawDamage = damageCounts.reduce((acc, cur) => acc + cur);
  const netDamage = Math.ceil(rawDamage * (1 - defendModifier));

  // #here change this to also display npc defend message
  if (defendModifier > 0) { console.log('Your unwavering defenses halved the enemy\'s damage!'); }

  return netDamage;
};

export { calculateNetDamage };
