import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { reducer } from './reducer';
import './index.scss';
import Voting from './components/Voting';
import Results from './components/Results';




/* STORE AND SOCKET */
const socket = io(`${location.protocol}//${location.hostname}:8090`);
const store = createStore(reducer);

socket.on('state', state => {
  store.dispatch({type: 'SET_STATE', state})
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

render();
