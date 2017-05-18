import React from 'react';
import '../index.scss';

export default App;




function App(props) {
  return (
    <div className='winner'>
      <h3>Voting App</h3>
      <a className='rootLink' href='/#/voting'>
        Vote
      </a>
      <a className='rootLink' href='/#/results'>
        Results
      </a>
    </div>
  );
}
