import {
  counterIncerement,
  counterDecrement,
  counterSetZero,
} from "./actions.js";

const incrementAction = () => {
  return {
    type: counterIncerement,
  };
};
const decrementAction = () => {
  return {
    type: counterDecrement,
  };
};
const setZeroAction = () => {
  return {
    type: counterSetZero,
  };
};

export { incrementAction, decrementAction, setZeroAction };
