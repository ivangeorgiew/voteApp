import { Map } from 'immutable';

import { setEntries, next, vote} from './core';




/* REDUCER */
export function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState =>
        vote(voteState, action.entry));
    default:
      return state;
  }
}
