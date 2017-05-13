export { reducer };




function setState(state, newState) {
  return Object.assign({}, state, newState);
}




function reducer(state = {vote: {}}, action) {
  console.log(state, action.state);
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    default:
      return state;
  }
}
