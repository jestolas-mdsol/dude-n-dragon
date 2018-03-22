import { rollDie } from './dice';

const calculateNetDamage = ({ dieCount, dieSides, defendModifier }) => {
  const damageCounts = [];
  while (damageCounts.length < dieCount) {
    damageCounts.push(rollDie(dieSides));
  }

  if (defendModifier > 0) { console.log('Your unwavering defenses halved the enemy\'s damage!'); }

  const rawDamage = damageCounts.reduce((acc, cur) => acc + cur);
  const netDamage = Math.ceil(rawDamage * (1 - defendModifier));
  console.log('raw damage: ', rawDamage);
  console.log('net damage: ', netDamage);

  return netDamage;
};

export { calculateNetDamage };
