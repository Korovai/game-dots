import React from 'react';
import Header from '../header/header';
import PlayZone from '../play-zone/play-zone';
import Results from '../results/results';

import './app.css';

const App = () => {
  return (
    <div className="wrApp">
      <div className="wrAppCol1">
        <Header />
        <PlayZone />
      </div>
      <div className="wrAppCol2">
        <Results />
      </div>
    </div>
  );
};

export default App;