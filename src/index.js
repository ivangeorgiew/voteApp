import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { reducer } from '../server/reducer';
import { setState } from './actions';
import './index.scss';
import Voting from './components/Voting';
import Results from './components/Results';




/* STORE AND SOCKET */

//FOR DEVELOPMENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//const socket = io(`${location.protocol}//${location.hostname}:3000`);

const socket = io();

function updateAll(socket) {
  return (store) => (next) => (action) => {
    if(action.reload)
      socket.emit('action', action);
    return next(action);
  };
}

const store = createStore(reducer, applyMiddleware(updateAll(socket)));

socket.on('state', state => {
  store.dispatch(setState(state));
});




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
