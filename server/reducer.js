//export for tests
export { setEntries, next, vote, reducer };




/*
const initState = {
  entries: [
    "A Life Less Ordinary",
    "The Beach",
    "28 Days Later",
    "Millions",
    "Sunshine",
    "Slumdog Millionaire",
    "127 Hours",
    "Trance",
    "Steve Jobs"
  ],
  vote: {
    pair: ['Shallow Grave', 'Trainspotting'],
    tally: {'Shallow Grave': 0, 'Trainspotting': 0}
  },
  winner: '',
};
*/




/* SET ENTRIES */
function setEntries(state, entries) {
  return Object.assign({}, state, {entries});
}




/* NEXT */
function next(state) {
  const copy = Object.assign({}, state);

  function getWinners(vote) {
    if(!vote) 
      return [];

    const [a, b] = vote.pair;
    
    if(!vote.tally)
      vote.tally = {[a]: 0, [b]: 0}
 
    if(vote.tally[a] > vote.tally[b])
      return [a];

    if(vote.tally[a] < vote.tally[b])
      return [b];

    return [a, b];
  }

  const entries = copy.entries
  .concat(getWinners(copy.vote));

  if(entries.length === 1)
    return {winner: entries[0]};

  return Object.assign({}, copy, {
    vote: {
      pair: entries.slice(0, 2),
    },
    entries: entries.slice(2)
  });
}




/* VOTE */
function vote(voteState, entry) {
  const copy = Object.assign({}, voteState);

  if(!copy.tally)
    copy.tally = {[voteState.pair[0]]: 0, [voteState.pair[1]]: 0};

  copy.tally[entry]++; 
  return copy;
}



/* REDUCER */
function reducer(state = {}/*initState*/, action) {
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
