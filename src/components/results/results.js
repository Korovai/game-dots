import React from 'react';

import './results.css';

const  Results = () => {
  return (
    <div className="wrResults">
      <div className="resultsTitle">Leader Board</div>
      <ul className="leaderList">
        <li className="leaderListItem">
          <div className="plaerName">User Name</div>
          <div className="victoryDate">Date and Time</div>
        </li>
    
        <li className="leaderListItem">
          <div className="plaerName">User Name</div>
          <div className="victoryDate">Date and Time</div>
        </li>
    
        <li className="leaderListItem">
          <div className="plaerName">User Name</div>
          <div className="victoryDate">Date and Time</div>
        </li>
      </ul>
    </div>
  );
};

export default Results;