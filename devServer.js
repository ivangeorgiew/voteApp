import { createStore } from 'redux';
import SocketIO from 'socket.io';
import { reducer } from './server/reducer';




/* INITIALIZING SERVER */
const io = new SocketIO().attach(8090);
const store = createStore(reducer);

//gets state on it being changed
store.subscribe(
  () => {
    io.emit('state', store.getState())
  }
);

io.on('connection', (socket) => {
  //gets state when connected first time
  socket.emit('state', store.getState());
  //when any user does an action
  socket.on('action', store.dispatch.bind(store));
});




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
