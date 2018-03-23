// ideally, these should run a state change method instead of mutating the state object
// #here todo: move away from mutation!!!

const setActionState = ({ entity, actionCategory }) => {
  entity.currentActionCategory = actionCategory;
};

const updateHitPoints = ({ adjustmentType, entity, hpAdjustmentAmount }) => {
  if (adjustmentType === '+') {
    entity.hitPoints += hpAdjustmentAmount;
  } else {
    entity.hitPoints -= hpAdjustmentAmount;
  }
};

export {
  setActionState,
  updateHitPoints,
};
