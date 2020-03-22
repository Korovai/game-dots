import React from 'react';

import './results.css';

const  Results = ({winners}) => {
  const items = winners.map((item) => {
    const {id, winner, date} = item;
    
    return (
      <li key={id} className="leaderListItem">
        <div className="plaerName">{winner}</div>
        <div className="victoryDate">{date}</div>
      </li>    
    );
  });
  
  return (
    <div className="wrResults">
      <div className="resultsTitle">Leader Board</div>
      <ul className="leaderList">
        {items}
      </ul>
    </div>
  );
};

export default Results;