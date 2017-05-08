import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {makeStore} from '../src/store';

describe('Testing store.js', () => {
  it('is a Redux store configured with a correct reducer', () => {
    const store = makeStore();

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
