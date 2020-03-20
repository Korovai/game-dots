export default class GameService {
  _gameSettings = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';
  
  getSettings = async(url) => {
    const res = await fetch(this._gameSettings);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${this._gameSettings}, received ${res.status}`)
    }
    const objSettings = await res.json();
    const resSettings = Object.entries(objSettings);
    return resSettings.map(this._transformSettings);
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
  
  getIdMode = (mode) => {
    if(mode === 'easyMode') {
      return 1;
    } else if(mode === 'normalMode') {
      return 2;
    } else if(mode === 'hardMode') {
      return 3;
    } else return 'Unknown mode';
  };
  
  _transformSettings = (item) => {
    return {
      id: this.getIdMode(item[0]),
      mode: this.getNameMode(item[0]),
      field: item[1].field,
      delay: item[1].delay
    }
  };
};