//export for tests
export { setEntries, next, vote, reducer };




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
  winner: ''
};




/* SET STATE */
function setEntries(state, entries) {
  const copy = Object.assign({}, state);

  if(entries.length > 1) {
    copy.entries = entries;
    copy.vote = {
      pair: [entries[0], entries[1]],
      tally: {[entries[0]]: 0, [entries[1]]: 0}
    };
    copy.winner = '';

    return Object.assign({}, state, copy);
  }

  if(entries.length === 1) {
    copy.entries = [];
    copy.vote = {};
    copy.winner = entries[0]

    return Object.assign({}, state, copy);
  }
  
  return state;
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

  const winner = (entries.length === 3) ?
    entries[2] : '';

  if(winner !== '')
    return {
      entries: [],
      vote: {},
      winner
    };

  copy.entries = entries.slice(2);
  copy.vote.pair = entries.slice(0, 2);
  copy.vote.tally = { [entries[0]]: 0, [entries[1]]: 0 };


  return Object.assign({}, state, copy);
}




/* VOTE */
function vote(state, entry) {
  const copy = Object.assign({}, state);

  copy.vote.tally[entry]++; 

  return Object.assign({}, state, copy);
}



/* REDUCER */
function reducer(state = initState, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
