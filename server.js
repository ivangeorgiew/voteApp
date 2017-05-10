import { createStore } from 'redux';
import SocketIO from 'socket.io';
import path from 'path';
import express from 'express';

import { reducer } from './server/reducer';




/* EXPRESS SETUP */
const port = process.env.PORT || 8080;
const app = express();

//use folder public as static
app.use('/public', express.static(path.join(__dirname, 'public')));

//router
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

//const for passing to socket.io 
const server = app.listen(port, (err) => {
  if(err)
    return console.log(err);

  console.log(`Listening at http://localhost:${port}`)
});




/* INITIALIZING SERVER */
const io = new SocketIO(server).attach(8090);
const store = createStore(reducer);

//gets state on it being changed
store.subscribe(
  () => io.emit('state', store.getState().toJS())
);

io.on('connection', (socket) => {
  //gets state when connected first time
  socket.emit('state', store.getState().toJS());
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
