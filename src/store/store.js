import reducers from '../reducers/reducers';

let listeners = [];
let currentState = {};

export const createStore = (initialState) => {
  currentState = Object.assign(currentState, initialState);
};

export const getState = () => currentState;
export const dispatch = (action) => {
  currentState = reducers(currentState, action);

  listeners.forEach((listener) => {
    listener();
  });
};

export const subscribe = (newListener) => {
  listeners.push(newListener);

  const unsubscribe = () => {
    listeners = listeners.filter((l) => l !== newListener);
  };

  return unsubscribe;
};
