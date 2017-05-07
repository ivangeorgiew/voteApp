import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from './../src/core';

describe('core.js', () => {

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Trainspotting', '127 hours'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.eql(Map({
        entries: List.of('Trainspotting', '127 hours')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 days', 'Sunshine')
      });
      const nextState = next(state);

      expect(state).to.eql(Map({
        entries: List.of('Trainspotting', '28 days', 'Sunshine')
      }));
      expect(nextState).to.eql(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days')
        })
      }));
    });

    it('puts winner of current vote back into entries', () => {
      const state = Map({
        entries: List.of('Sunshine', 'Millions', '127 hours'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days'),
          tally: Map({
            'Trainspotting': 4,
            '28 days': 2
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.eql(Map({
        entries: List.of('127 hours', 'Trainspotting'),
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        })
      }));
    });

    it('puts both from tied votes back to entries', () => {
      const state = Map({
        entries: List.of('Sunshine', 'Millions', '127 hours'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days'),
          tally: Map({
            'Trainspotting': 3,
            '28 days': 3
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.eql(Map({
        entries: List.of('127 hours', 'Trainspotting', '28 days'),
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        })
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        entries: List.of(),
        vote: Map({
          pair: List.of('Trainspotting', '28 days'),
          tally: Map({
            'Trainspotting': 4,
            '28 days': 2
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.eql(Map({
        winner: 'Trainspotting'
      }));
    });
  });


  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.eql(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days'),
          tally: Map({
            'Trainspotting': 1
          }),
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days'),
          tally: Map({
            'Trainspotting': 3,
            '28 days': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.eql(
        Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 days'),
            tally: Map({
              'Trainspotting': 4,
              '28 days': 2
            })
          }),
          entries: List()
        })
      );
    });
  });

});
