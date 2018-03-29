// ideally, these should run a state change method instead of mutating the state object
// #here todo: move away from mutation!!!

const setActionState = ({ entity, actionCategory }) => {
  entity.currentActionCategory = actionCategory;
};

const updateHitPoints = ({ adjustmentType, target, hpAdjustmentAmount }) => {
  if (adjustmentType === '+') {
    target.hitPoints += hpAdjustmentAmount;
  } else {
    target.hitPoints -= hpAdjustmentAmount;
  }
};

export {
  setActionState,
  updateHitPoints,
};
