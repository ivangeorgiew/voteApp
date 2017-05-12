export { setEntries, next, vote, reducer };




/* SET ENTRIES */
function setEntries(state, entries) {
  return Object.assign({}, state, {entries});
}




/* NEXT */
function next(state) {

  function getWinners(vote) {
    if(!vote) 
      return [];

    const [a, b] = vote.pair;
    const aVotes = vote.tally[a] || 0;
    const bVotes = vote.tally[b] || 0;

    if(aVotes > bVotes)
      return [a];

    if(bVotes > aVotes)
      return [b];

    return [a, b];
  }

  const entries = state.entries
  .concat(getWinners(state.vote));

  if(entries.length === 1)
    return {winner: entries[0]};

  return Object.assign({}, state, {
    vote: {
      pair: entries.slice(0, 2)
    },
    entries: entries.slice(2)
  });
}




/* VOTE */
function vote(voteState, entry) {
  const copy = Object.assign({}, voteState);

  if(copy.tally)
    copy.tally[entry]++;
  else
    copy.tally = {[entry]: 1};

  return copy;
}



/* REDUCER */
function reducer(state = {}, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return Object.assign({}, state, {
        vote: vote(state.vote, action.entry)
      });
    default:
      return state;
  }
}
