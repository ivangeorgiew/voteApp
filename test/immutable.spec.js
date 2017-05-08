import { List, Map } from 'immutable';
import { expect } from 'chai';




describe('Testing immutable.js', () => {

  /* A NUMBER */
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }
    
    //is immutable
    it('is immutable', () => {
      let state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  
  

  /* A MAP */ 
  describe('a map', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    function Box (x) {
      return {
        map: f => Box(f(x)),
        fold: f => f(x)
      };
    }

    function addValueToMovies (obj, val) { 
      return Box(obj)
        .map(o => o.movies.concat(val))
        .fold(arr => Object({movies: arr}));
    }
    
    // works with Box
    it('works with Box', () => {
      const state = {movies: ['Trainspotting', '127 hours']};
      const newState = addValueToMovies(state, '28 days');

      expect(newState).to.eql({ movies: 
        ['Trainspotting', '127 hours', '28 days']
      });
      expect(state).to.eql({ movies: 
        ['Trainspotting', '127 hours']
      });
    });

    // is immutable
    it('is immutable', () => {
      let state = Map({ movies: List.of('Trainspotting', '127 hours') });
      let nextState = addMovie(state, '28 days');

      expect(nextState).to.equal(Map({ movies: List.of(
        'Trainspotting',
        '127 hours',
        '28 days'
      )}));

      expect(state).to.equal(Map({movies: List.of(
        'Trainspotting',
        '127 hours'
      )}));
    });
  });

});
