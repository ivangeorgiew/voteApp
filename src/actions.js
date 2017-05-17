export { vote, next, restart, setState, setClientId };




/* VOTE */
function vote(entry) {
  const clientId = sessionStorage.getItem('clientId');
  return { reload: true, type: 'VOTE', entry, clientId };
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




/* SET CLIENT ID */
function setClientId(clientId) {
  return { type: 'SET_CLIENT_ID', clientId };
}
