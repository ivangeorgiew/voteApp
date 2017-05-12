export { reducer };




function setState(state, newState) {
  return state.merge(newState);
}




function reducer(state={}, action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    default:
      return state;
  }
}
