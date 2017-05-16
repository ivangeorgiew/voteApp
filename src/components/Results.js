import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../index.scss';
import { winner } from './Voting';

export default connect(mapStateToProps, actions)(Results);




/* MAP STATE TO PROPS */
function mapStateToProps(state) {
  return {
    pair: Object.keys(state.vote || {}),
    tally: state.vote || {},
    winner: state.winner || ''
  }
}




/* RESULTS COMP */
Results.propTypes = {
  pair: PropTypes.array,
  tally: PropTypes.object,
  winner: PropTypes.string
}

function Results(props) {
  /* GIVE PAIR */
  function givePair() {
    return props.pair.map(entry => {
      return (<div key={entry} className='entry'>
        <h1>{entry}</h1>
        <div className='voteCount'>
          {props.tally[entry]}
        </div>
      </div>)
    });
  }


  /* RETURN COMP */
  return (
    props.winner ? 
      winner(props) :
      <div className='results'>
        <div className='tally'>
          {givePair()}
        </div>
        <div className='management'>
          <button 
            className='next' 
            onClick={() => props.next()}
          >
            Next
          </button>
        </div>
      </div>
  );
}
