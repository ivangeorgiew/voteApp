import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { reducer } from './reducer';
import './index.scss';

import Voting from './components/Voting';
import Results from './components/Results';




const store = createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 days'],
      tally: { Sunshine: 2 }
    }
  }
});




/* RENDER */
function render(props={}) {
  return ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path='/' component={() => 
          <Voting {...props}/>
        }/>
        <Route path='/results' component={() =>
          <Results {...props}/>   
        }/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );
}

render({
  pair: ['Bla', '28 days'],
  tally: {
    'Bla': 5,
    '28 days': 4
  },
  winner: 'Bla'
});
