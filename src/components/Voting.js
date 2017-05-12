import React from 'react';
import PropTypes from 'prop-types';
import '../index.scss';

export { winner };
export default Voting;




/* WINNER */
function winner(title) {
  return (
    <div className='winner'>
      Winner is {title}
    </div>
  );
}




/* VOTING COMP */
Voting.propTypes = {
  pair: PropTypes.array.isRequired, 
  hasVoted: PropTypes.string,
  winner: PropTypes.string
};

function Voting(props) {

  /* GIVE BUTTONS */
  function giveButtons() {
    if(props.pair.length < 1)
      return (<h1>No Entries</h1>);

    return props.pair.map(entry =>
      <button 
        key={entry}
        disabled={!!props.hasVoted}
      >
        <h1>{entry}</h1>
        {props.hasVoted === entry ?
          <div className='label'>Voted</div> :
          null
        }
      </button>
    );
  }

  /* RETURN COMP */
  return (
    props.winner ?
      winner(props.winner) :
      <div className='voting'>
        {giveButtons()}
      </div>
  );
}
