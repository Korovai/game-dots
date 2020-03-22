import React from 'react';

import './play-zone.css';

const PlayZone = ({currentMode: {field, size}, arrayFields, onSelectField}) => {
  const num = field;
  const siz = size;
  const fields = arrayFields.map((item) => {
    const {id, namesClass} = item;

    return (
      <div onClick={() => onSelectField(id)} key={id} className={namesClass} style={{width: `${siz}px`, height: `${siz}px`}}></div>
    );  
  });

  return (
    <div className="wrPlayZone">
      <div className="wrMessage"><textarea name="text" className="message">Welcome! Play Game In Dots?</textarea></div>
      <div className="playZone" style={{width: `${num*siz+num*4}px`}}>
        {fields}
      </div>
    </div>
  );
};

export default PlayZone;