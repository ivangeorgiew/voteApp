import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { setState } from './actions';
import { reducer } from '../server/reducer';
import Voting from './components/Voting';
import Results from './components/Results';




/* FUNCTIONS */
function emitAction(socket) {
  return (store) => (next) => (action) => {
    if(action.reload)
      socket.emit('action' action);
    return next(action);
  };
}




/* STORE AND SOCKET */

//FOR DEVELOPMENT switch to first one
const socket = io(`${location.protocol}//${location.hostname}:3000`);
//--const socket = io();

//create store 
const store = createStore(reducer, applyMiddleware(emitAction(socket)));

//on state being changed at server change the client state
socket.on('state', state => store.dispatch(setState(state)));




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
