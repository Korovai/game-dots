import React from 'react';

import './header.css';

const Header = ({settings, onOpenSelector, currentModeName, onSelectMode, gameStart, onGetDataPlayer}) => {
  const items = settings.map((item) => {
    const {id, mode} = item;    
    
    return (
      <li key={id} onClick={() => onSelectMode(id)} className="formSelectListItem jsFormListItem">{mode}</li>
    );
  });

  return (
    <div className="wrHeader">
      <div className="formSelectArrow">
        <div className="jsFormParent"> 
          <div onClick={onOpenSelector} className="formSelectContent jsFormText">{currentModeName}</div>
          <ul className="formSelectList jsFormList">
            {items}
          </ul>
        </div>
      </div>
    
      <div className="wrNameUser"><input onChange={onGetDataPlayer} type="text" className="nameUser" maxLength="20" placeholder="Enter your name" /></div>
    
      <div><button onClick={gameStart} className="btnPlay">Play</button></div>
    </div>
  );
};

export default Header;