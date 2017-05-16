import { createStore } from 'redux';
import socketIO from 'socket.io';
import path from 'path';
import express from 'express';
import { reducer } from './reducer';




/* EXPRESS SETUP */
const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');

//use folder public as static
app.use(express.static(publicPath));

//home router
app.get('/', (req, res) =>
  res.sendFile(path.join(publicPath, 'index.html'))
);

//const for socket.io
const server = app.listen(port, (err) => {
  return (err) ? console.log(err) :
    console.log(`Listening at http://localhost:${port}`) 
});




/* INITIALIZING SERVER */
const io = socketIO(server);
const store = createStore(reducer);

io.on('connection', (socket) => {
  console.log('CONNECTION!');

  //emits state after connecting
  socket.emit('state', store.getState());

  //when any user does an action
  socket.on('action', action => {
    store.dispatch(action);
    //emmits to all sockets
    io.emit('state', store.getState());
  });
});




/* FOR TESTS
store.dispatch({
  type: 'SET_STATE',
  state: { 
    entries: [],
    vote: {
      pair: ['A', 'B'],
      tally: {'A': 0, 'B': 0}
    },
    winner: ''
  }
});
store.dispatch({
  type: 'VOTE',
  entry: 'A'
});
store.dispatch({
  type: 'VOTE',
  entry: 'A'
});
store.dispatch({
  type: 'VOTE',
  entry: 'B'
});
store.dispatch({
  type: 'NEXT'
});
*/
