export const saveStateToStorage = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
};

export const getStateFromStorage = () => {
  const resultState = localStorage.getItem('state');

  return resultState ? JSON.parse(resultState) : null;
};
