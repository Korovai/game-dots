export default class GameService {
  _gameSettings = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';
  _winnersResults = 'https://starnavi-frontend-test-task.herokuapp.com/winners';
  
  getSettings = async(url) => {
    const res = await fetch(this._gameSettings);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${this._gameSettings}, received ${res.status}`)
    }
    const objSettings = await res.json();
    const resSettings = Object.entries(objSettings);
    return resSettings.map(this._transformSettings);
  };
  
  getWinners = async(url) => {
    const res = await fetch(this._winnersResults);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${this._winnersResults}, received ${res.status}`)
    }
    const objWinners = await res.json();
    const resWinners = Object.entries(objWinners);
    return resWinners.map(this._transformWinners).slice(resWinners.length - 5);
  };
  
  getIdMode = (mode) => {
    if(mode === 'easyMode') {
      return 1;
    } else if(mode === 'normalMode') {
      return 2;
    } else if(mode === 'hardMode') {
      return 3;
    } else return 'Unknown mode';
  };
  
  getFieldSize = (mode) => {
    const width = document.documentElement.clientWidth;
    
    if(width < 468) {
      if(mode === 'easyMode') {
        return 54;
      } else if(mode === 'normalMode') {
        return 25;
      } else if(mode === 'hardMode') {
        return 15;
      } else return 'Unknown mode';    
    } else if(width > 467 && width < 668) {
      if(mode === 'easyMode') {
        return 80;
      } else if(mode === 'normalMode') {
        return 38;
      } else if(mode === 'hardMode') {
        return 24;
      } else return 'Unknown mode';
    } else {
      if(mode === 'easyMode') {
        return 85;
      } else if(mode === 'normalMode') {
        return 45;
      } else if(mode === 'hardMode') {
        return 30;
      } else return 'Unknown mode'; 
    }
  };
  
  getNameMode = (mode) => {
    if(mode === 'easyMode') {
      return 'Easy Mode';
    } else if(mode === 'normalMode') {
      return 'Normal Mode';
    } else if(mode === 'hardMode') {
      return 'Hard Mode';
    } else return 'Unknown mode';
  };
  
  getCustomDelay = (mode) => {
    if(mode === 'easyMode') {
      return 800;
    } else if(mode === 'normalMode') {
      return 1000;
    } else if(mode === 'hardMode') {
      return 1100;
    } else return 'Unknown mode';  
  }
  
  _transformSettings = (item) => {
    return {
      id: this.getIdMode(item[0]),
      size: this.getFieldSize(item[0]),
      mode: this.getNameMode(item[0]),
      field: item[1].field,
      delay: this.getCustomDelay(item[0])
      //delay: item[1].delay
    }
  }; 
  
  _transformWinners = (item) => {
    return {
      id: item[1].id,
      winner: item[1].winner,
      date: item[1].date
    }
  };
};