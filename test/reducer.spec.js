import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { reducer } from '../src/reducer';




describe('Testing reducer.js', () => {

  /* TRY SET ENTRIES */
  it('handles SET_ENTRIES', () => {
    const initState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Transpotting']};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql(fromJS({
      entries: ['Transpotting']
    }));
  });




  /* TRY NEXT */
  it('handles NEXT', () => {
    const initState = fromJS({
      entries: ['Transpotting', '28 days']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql(fromJS({
      vote: {
        pair: ['Transpotting', '28 days']
      },
      entries: []
    }));
  });




  /* TRY VOTE */
  it('handles VOTE', () => {
    const initState = fromJS({
      vote: {
        pair: ['Transpotting', '28 days']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Transpotting'};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql(fromJS({
      vote: {
        pair: ['Transpotting', '28 days'],
        tally: {Transpotting: 1}
      },
      entries: []
    }));
  });




  /* INIT STATE */
  it('has initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Transpotting']};
    const nextAction = reducer(undefined, action);

    expect(nextAction).to.eql(fromJS({
      entries: ['Transpotting']
    }));
  });
  



  /* CAN SET ACTIONS IN ARRAY */
  it('can be used with Array.reduce()', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Transpotting', '28 days']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Transpotting'},
      {type: 'VOTE', entry: '28 days'},
      {type: 'VOTE', entry: 'Transpotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.eql(fromJS({
      winner: 'Transpotting'
    }));
  });
});
