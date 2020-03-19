export default class GameService {
  _gameSettings = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';
  
  getSettings = async(url) => {
    const res = await fetch(this._gameSettings);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${this._gameSettings}, received ${res.status}`)
    }
    return await res.json();
  };
};