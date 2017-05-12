import { expect } from 'chai';
import { setEntries, next, vote } from '../server/reducer';




describe('Testing core functions', () => {

  /* SET ENTRIES */
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = {};
      const entries = ['Trainspotting', '127 hours'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.eql({
        entries: ['Trainspotting', '127 hours']
      });
    });
  });



  /* NEXT */
  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = {
        entries: ['Trainspotting', '28 days', 'Sunshine']
      };
      const nextState = next(state);

      expect(state).to.eql({
        entries: ['Trainspotting', '28 days', 'Sunshine']
      });
      expect(nextState).to.eql({
        entries: ['Sunshine'],
        vote: {
          pair: ['Trainspotting', '28 days']
        }
      });
    });

    it('puts winner of current vote back into entries', () => {
      const state = {
        entries: ['Sunshine', 'Millions', '127 hours'],
        vote: {
          pair: ['Trainspotting', '28 days'],
          tally: {
            'Trainspotting': 4,
            '28 days': 2
          }
        }
      };
      const nextState = next(state);
      expect(nextState).to.eql({
        entries: ['127 hours', 'Trainspotting'],
        vote: {
          pair: ['Sunshine', 'Millions'],
        }
      });
    });

    it('puts both from tied votes back to entries', () => {
      const state = {
        entries: ['Sunshine', 'Millions', '127 hours'],
        vote: {
          pair: ['Trainspotting', '28 days'],
          tally: {
            'Trainspotting': 3,
            '28 days': 3
          }
        }
      };
      const nextState = next(state);
      expect(nextState).to.eql({
        entries: ['127 hours', 'Trainspotting', '28 days'],
        vote: {
          pair: ['Sunshine', 'Millions'],
        }
      });
    });

    it('marks winner when just one entry left', () => {
      const state = {
        entries: [],
        vote: {
          pair: ['Trainspotting', '28 days'],
          tally: {
            'Trainspotting': 4,
            '28 days': 2
          }
        }
      };
      const nextState = next(state);
      expect(nextState).to.eql({
        winner: 'Trainspotting'
      });
    });
  });



  /* VOTE */
  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = {
        pair: ['Trainspotting', '28 days']
      };
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.eql({
        pair: ['Trainspotting', '28 days'],
        tally: {
          'Trainspotting': 1
        },
      });
    });

    it('adds to existing tally for the voted entry', () => {
      const state = {
        pair: ['Trainspotting', '28 days'],
        tally: {
          'Trainspotting': 3,
          '28 days': 2
        }
      };
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.eql({
        pair: ['Trainspotting', '28 days'],
        tally: {
          '28 days': 2,
          'Trainspotting': 4
        }
      });
    });
  });

});
