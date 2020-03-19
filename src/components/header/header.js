import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="wrHeader">
    
      <div className="formSelectArrow">
    
        <div className="jsFormParent"> 
          <div className="formSelectContent jsFormText">Pick game mode</div>
    
          <ul className="formSelectList jsFormList">
            <li className="formSelectListItem jsFormListItem" data-value="easy">easyMode</li>
            <li className="formSelectListItem jsFormListItem" data-value="normal">normalMode</li>
            <li className="formSelectListItem jsFormListItem" data-value="hard">hardMode</li>
          </ul>
        </div>
    
      </div>
      
      <div className="wrNameUser"><input type="text" className="nameUser" placeholder="Enter your name" /></div>
    
      <div><button className="btnPlay">Play</button></div>
    </div>
  );
};

export default Header;