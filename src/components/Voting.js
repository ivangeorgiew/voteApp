import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../index.scss';

export { winner };
export default connect(mapStateToProps, actions)(Voting);




/* MAP STATE TO PROPS */
function mapStateToProps(state) {
  return {
    pair: state.vote.pair,
    hasVoted: state.hasVoted,
    winner: state.winner
  }
}




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
  pair: PropTypes.array, 
  hasVoted: PropTypes.string,
  winner: PropTypes.string
};

function Voting(props) {
  /* GIVE BUTTONS */
  function giveButtons() {
    return props.pair.map(entry =>
      <button 
        key={entry}
        className={props.hasVoted === entry ? 'chosenOne' : ''}
        disabled={!!props.hasVoted}
        onClick={() => props.vote(entry)}
      >
        <h1>{entry}</h1>
        {props.hasVoted === entry ?
          <h2>Voted</h2> : null}
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
