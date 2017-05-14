export { setState, vote };




/* SET STATE */
function setState(state) {
  return { type: 'SET_STATE', state };
}




/* VOTE */
function vote(entry) {
  return { meta: {remote: true}, type: 'VOTE', entry };
}
