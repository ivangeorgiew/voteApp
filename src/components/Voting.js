import React from 'react';
import PropTypes from 'prop-types';




/* VOTING COMP */
function Voting(props) {

  function getButtons(pair) {
    if(pair.length < 1)
      return (<h1>No Entries</h1>);

    return pair.map(entry =>
      <button key={entry}>
        <h1>{entry}</h1>
      </button>
    );
  }

  return (
    <div className='voting'>
      {getButtons(props.pair)}
    </div>
  );
}

Voting.propTypes = {};




export default Voting;
