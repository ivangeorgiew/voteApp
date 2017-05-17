export { reducer };




/* INITIAL STATE */
const initState = {
  entries: [
    'Shallow Grave',
    'Trainspotting',
    "127 Hours",
    "Trance",
    "Steve Jobs"
  ]
};




/* SET STATE */
function setState(state, newState) {
  return Object.assign({}, state, newState);
}




/* NEXT */
function next(state) {
  const copy = JSON.parse(JSON.stringify(state));

  function getWinners(vote) {
    if(!vote)
      return [];

    const [a, b] = Object.keys(vote);
    
    if(vote[a] > vote[b])
      return [a];

    if(vote[a] < vote[b])
      return [b];

    return [a, b];
  }

  const entries = copy.entries
  .concat(getWinners(copy.vote));

  if(entries.length === 1) {
    return {winner: entries[0]};
  }

  copy.entries = entries.slice(2);
  copy.vote = { [entries[0]]: 0, [entries[1]]: 0 };
  copy.voteEntry = '';
  copy.winner = '';
  copy.hasVoted = '';

  return Object.assign({}, state, copy);
}




/* VOTE */
function vote(state, entry, clientId) {
  const copy = JSON.parse(JSON.stringify(state));

  if(copy.vote.hasOwnProperty(entry)){
    copy.vote[entry]++; 
    copy.voterId = clientId;
    copy.voteEntry = entry;
  }

  return Object.assign({}, state, copy);
}




/* REDUCER */
function reducer(state = initState, action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SET_CLIENT_ID':
      return setState(state, {clientId: action.clientId});
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry, action.clientId);
    case 'RESTART':
      return (action.entries) ?
        next({entries: action.entries}) :
        next(initState);
    default:
      return next(state);
  }
}
