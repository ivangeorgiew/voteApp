export { vote, next, restart, setState };




/* VOTE */
function vote(entry) {
  return { reload: true, type: 'VOTE', entry };
}




/* NEXT */
function next() {
  return { reload: true, type: 'NEXT' }; 
}




/* RESTART */
function restart(entries) {
  return { reload: true, type: 'RESTART' , entries};
}




/* SET STATE */
function setState(state) {
  return { type: 'SET_STATE', state };
}
