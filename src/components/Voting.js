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
    pair: Object.keys(state.vote || {}),
    hasVoted: state.hasVoted || '',
    winner: state.winner || ''
  }
}




/* WINNER */
function winner(props) {
  return (
    <div className='results'>
      <div className='winner'>
        Winner is {props.winner}
      </div>
      <div className='management'>
        <button 
          className='next' 
          onClick={() => props.restart()}
        >
          Restart
        </button>
      </div>
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
      winner(props) :
      <div className='voting'>
        {giveButtons()}
      </div>
  );
}
