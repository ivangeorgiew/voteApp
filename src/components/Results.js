import React from 'react';
import '../index.scss';
import { winner } from './Voting';

export default Results;




/* RESULTS COMP */
function Results(props) {

  /* GIVE VOTES */
  function giveVotes(entry) {
    return (entry in props.tally) ?
      props.tally[entry] :
      0;
  }

  /* GIVE PAIR */
  function givePair() {
    if(props.pair.length < 1)
      return (<h1>No pairs passed</h1>);

    return props.pair.map(entry =>
      <div key={entry} className='entry'>
        <h1>{entry}</h1>
        <div className='voteCount'>
          {giveVotes(entry)}
        </div>
      </div>
    );
  }


  /* RETURN COMP */
  return (
    props.winner ? 
      winner(props.winner) :
      <div className='results'>
        <div className='tally'>
          {givePair()}
        </div>
        <div className='management'>
          <button className='next' onClick={props.next}>
            Next
          </button>
        </div>
      </div>
  );
}
