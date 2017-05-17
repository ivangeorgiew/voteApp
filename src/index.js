import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import uuidV4 from 'uuid/v4';

import { setState, setClientId } from './actions';
import { reducer } from '../server/reducer';
import Voting from './components/Voting';
import Results from './components/Results';







/* STORE AND SOCKET */

// FOR DEVELOPMENT switch to first one
const port = process.env.PORT || 3000;
const socket = io(`${location.protocol}//${location.hostname}:${port}`);

// emit actions to server
function emitAction(socket) {
  return (store) => (next) => (action) => {
    if(action.reload)
      socket.emit('action', action);
    return next(action);
  };
}

// create store 
const store = createStore(reducer, applyMiddleware(emitAction(socket)));

// on state being changed at server, change the client state
socket.on('state', state => {
  if(state.voterId === sessionStorage.getItem('clientId')) {
    store.dispatch(setState(Object.assign({}, state, {
      hasVoted: state.voteEntry
    })));
  }
  else  {
    const copy = Object.assign({}, state);
    if(copy.voteEntry !== '')
      delete copy.hasVoted;
    store.dispatch(setState(copy))
  }
});




/* SET ID FOR EVERY TAB */
if(!sessionStorage.getItem('clientId'))
  sessionStorage.setItem('clientId', uuidV4());

store.dispatch(setClientId(sessionStorage.getItem('clientId')));





/* RENDER */
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route exact path='/' component={Voting}/>
        <Route path='/results' component={Results}/>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
