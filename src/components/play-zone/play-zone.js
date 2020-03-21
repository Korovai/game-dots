import React from 'react';

import './play-zone.css';

const PlayZone = ({currentMode}) => {
  const arrField = [];
  const num = currentMode.field;
  const siz = currentMode.size;
  
  for(let i=0; i<num*num; i++) {arrField[i] = i;}

  return (
    <div className="wrPlayZone">
      <div className="message">Message here</div>
        <div style={{width: `${num*siz+num*4}px`}} className="playZone">
          {arrField.map((item) => {
            return (
              <div key={item} style={{width: `${siz}px`, height: `${siz}px`}} id={item} className="gameFiled">{item}</div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayZone;