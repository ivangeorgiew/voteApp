import { createStore } from 'redux';
import Server from 'socket.io';

import { reducer } from './reducer';




/* INITIALIZING SERVER */
function initServer(store) {
  const io = new Server().attach(8090);

  //gets state on it being changed
  store.subscribe(
    () => io.emit('state', store.getState().toJS());
  );

  io.on('connection', (socket) => {
    //gets state when connected first time
    socket.emit('state', store.getState().toJS());
    //when any user does an action
    socket.on('action', store.dispatch.bind(store));
  });
}

//creates store and passes it to the server
initServer(createStore(reducer));




/* TESTING */
const entries = [
  "Shallow Grave",
  "Trainspotting",
  "A Life Less Ordinary",
  "The Beach",
  "28 Days Later",
  "Millions",
  "Sunshine",
  "Slumdog Millionaire",
  "127 Hours",
  "Trance",
  "Steve Jobs"
];

store.dispatch({
  type: 'SET_ENTRIES',
  entries: entries
});
store.dispatch({
  type: 'NEXT'
});
