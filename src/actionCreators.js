export { setState, vote };




function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}




function vote(entry) {
  return {
    type: 'VOTE',
    entry
  };
}
