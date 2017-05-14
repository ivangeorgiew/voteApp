export { setState, vote, next };




/* SET STATE */
function setState(state) {
  return { type: 'SET_STATE', state };
}




/* VOTE */
function vote(entry) {
  return { reload: true, type: 'VOTE', entry };
}




/* NEXT */
function next() {
  return { reload: true, type: 'NEXT'}; 
}
