import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';

import Voting from './components/Voting';
import { AppContainer } from 'react-hot-loader';




/* RENDER */
function render(Component, props={}) {
  return ReactDOM.render(
    <AppContainer>
      <Component {...props}/>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(Voting, {pair: ['Transpotting', '28 days']});




/* HOT REPLACEMENT */
if(module.hot) {
  module.hot.accept('./components/Voting', () => (
    render(Voting, {pair: ['Transpotting', '28 days']}) 
  ));
}
