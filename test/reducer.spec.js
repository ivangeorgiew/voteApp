import { expect } from 'chai';
import { reducer } from '../server/reducer';




describe('Testing reducer.js', () => {

  /* TRY SET ENTRIES */
  it('handles SET_ENTRIES', () => {
    const initState = {};
    const action = {type: 'SET_ENTRIES', entries: ['Transpotting']};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql({
      entries: ['Transpotting']
    });
  });




  /* TRY NEXT */
  it('handles NEXT', () => {
    const initState = {
      entries: ['Transpotting', '28 days']
    };
    const action = {type: 'NEXT'};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql({
      vote: {
        pair: ['Transpotting', '28 days']
      },
      entries: []
    });
  });




  /* TRY VOTE */
  it('handles VOTE', () => {
    const initState = {
      vote: {
        pair: ['Transpotting', '28 days']
      },
      entries: []
    };
    const action = {type: 'VOTE', entry: 'Transpotting'};
    const nextState = reducer(initState, action);

    expect(nextState).to.eql({
      vote: {
        pair: ['Transpotting', '28 days'],
        tally: {'Transpotting': 1, '28 days': 0}
      },
      entries: []
    });
  });




  /* INIT STATE */
  it('has initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Transpotting']};
    const nextAction = reducer(undefined, action);

    expect(nextAction).to.eql({
      entries: ['Transpotting']
    });
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
    const finalState = actions.reduce(reducer, {});

    expect(finalState).to.eql({
      winner: 'Transpotting'
    });
  });
});
