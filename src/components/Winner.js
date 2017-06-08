import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../index.scss';

export default connect(mapStateToProps)(Winner);




/* MAP STATE TO PROPS */
function mapStateToProps(state) {
  return {
    winner: state.winner || '',
    restart: actions.restart
  }
}




/* WINNER */
Winner.propTypes = {
  winner: PropTypes.string.isRequired,
  restart: PropTypes.func.isRequired
}
function Winner(props) {
  if(!props.winner)
    return false; 

  return (
    <div className='results'>
      <div className='winner'>
        Winner is {props.winner}
      </div>
      <div className='management'>
        <button 
          className='next' 
          onClick={() => props.dispatch(props.restart())}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
