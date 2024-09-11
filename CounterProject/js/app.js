import {
  counterIncerement,
  counterDecrement,
  counterSetZero,
} from "../Redux/actions.js";

import {
  incrementAction,
  decrementAction,
  setZeroAction,
} from "../Redux/actionsCreator.js";

const decBtn = document.querySelector(".dec");
const resetBtn = document.querySelector(".reset");
const incBtn = document.querySelector(".inc");
const numberElem = document.querySelector("#num");

// Declare Counter Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case counterIncerement: {
      return state + 1;
    }
    case counterDecrement: {
      return state - 1;
    }
    case counterSetZero: {
      return state - state;
    }
    default: {
      return state;
    }
  }
};
const store = Redux.createStore(counterReducer);
// Handle Events
decBtn.addEventListener("click", () => {
  store.dispatch(incrementAction());
  let newValue = store.getState();
  numberElem.innerHTML = newValue;
});

resetBtn.addEventListener("click", () => {
  store.dispatch(setZeroAction());
  let newValue = store.getState();
  numberElem.innerHTML = newValue;
});

incBtn.addEventListener("click", () => {
  store.dispatch(decrementAction());
  let newValue = store.getState();
  numberElem.innerHTML = newValue;
});
