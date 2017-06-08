import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../index.scss';
import Winner from './Winner';

export default connect(mapStateToProps)(Voting);




/* MAP STATE TO PROPS */
function mapStateToProps(state) {
  return {
    pair: Object.keys(state.vote || {}),
    hasVoted: state.hasVoted || '',
    winner: state.winner || '',
    vote: actions.vote
  }
}




/* VOTING COMP */
Voting.propTypes = {
  pair: PropTypes.array.isRequired, 
  hasVoted: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  vote: PropTypes.func.isRequired
};

function Voting(props) {
  /* GIVE BUTTONS */
  function giveButtons() {
    return props.pair.map(entry =>
      <button 
        key={entry}
        className={props.hasVoted === entry ? 'chosenOne' : ''}
        disabled={!!props.hasVoted}
        onClick={() => props.dispatch(props.vote(entry))}
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
      <Winner /> :
      <div className='voting'>
        {giveButtons()}
      </div>
  );
}
