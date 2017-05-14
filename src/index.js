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
function updateAll(socket) {
  return (store) => (next) => (action) => {
    if(action.meta && action.meta.remote)
      socket.emit('action', action);
    return next(action);
  };
}

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const store = createStore(reducer, applyMiddleware(updateAll(socket)));

socket.on('state', state => {
  store.dispatch(setState(state));
  render();
});




/* RENDER */
function render() {
  return ReactDOM.render(
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
}
