import { Map, fromJS } from 'immutable';
import { createStore } from 'redux';
import { expect } from 'chai';

import { reducer } from '../../server/reducer';




describe('Testing server.js', () => {

  /* TRY REDUX STORE */
  it('works with store from Redux', () => {
    const store = createStore(reducer);

    expect(store.getState()).to.eql(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Transpotting', '28 days']
    });

    expect(store.getState()).to.eql(fromJS({
      entries: ['Transpotting', '28 days']
    }));
  });
});
