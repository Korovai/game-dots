import React from 'react';

import './header.css';

const Header = ({settings, currentModeName, onSelectMode}) => {
  const items = settings.map((item) => {
    const {id, mode} = item;    
    
    return (
      <li key={id} onClick={() => onSelectMode(id)} className="formSelectListItem jsFormListItem">{mode}</li>
    );
  });
  
  function onOpenSelector() {
    document.querySelector('.formSelectList').classList.toggle('isActive');
  };
  
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
      
      <div className="wrNameUser"><input type="text" className="nameUser" placeholder="Enter your name" /></div>
    
      <div><button className="btnPlay">Play</button></div>
    </div>
  );
};

export default Header;