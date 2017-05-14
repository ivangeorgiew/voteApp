//export for tests
export { setState, next, vote, reducer };




/* INITIAL STATE */
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
  hasVoted: ''
};




/* SET STATE */
function setState(state, newState) {
  return Object.assign({}, state, newState);
}




/* NEXT */
function next(state) {
  const copy = Object.assign({}, state);

  function getWinners() {
    const vote = Object.assign({}, copy.vote);
    const [a, b] = vote.pair;
    
    if(vote.tally[a] > vote.tally[b])
      return [a];

    if(vote.tally[a] < vote.tally[b])
      return [b];

    return [a, b];
  }

  const entries = copy.entries
  .concat(getWinners());

  if(entries.length === 1) {
    return Object.assign({}, state, {
      entries: [],
      vote: {},
      winner: entries[0]
    });
  }

  copy.entries = entries.slice(2);
  copy.vote.pair = entries.slice(0, 2);
  copy.vote.tally = { [entries[0]]: 0, [entries[1]]: 0 };


  return Object.assign({}, state, copy);
}




/* VOTE */
function vote(state, entry) {
  const copy = Object.assign({}, state);

  if(copy.vote.tally.hasOwnProperty(entry))
    copy.vote.tally[entry]++; 

  copy.hasVoted = entry;

  return Object.assign({}, state, copy);
}



/* REDUCER */
function reducer(state = initState, action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
