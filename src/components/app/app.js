import React, {Component} from 'react';
import Header from '../header/header';
import PlayZone from '../play-zone/play-zone';
import Results from '../results/results';
import GameService from '../../services/game-services.js';

import './app.css';

export default class App extends Component {
  
  gameService = new GameService();
  
  state = {
    settings: {}
  };
  
  componentDidMount() {
    this.loadingGameSettings();
  };
  
  loadingGameSettings = () => {
    this.gameService
      .getSettings().then((settings) => {
        this.setState({
          settings
        });
      });
  };
  
  render() {
    const {settings} = this.state;
    
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
  }
}