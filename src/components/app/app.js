import React, {Component} from 'react';

import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import Header from '../header/header';
import PlayZone from '../play-zone/play-zone';
import Results from '../results/results';
import GameService from '../../services/game-services.js';

import './app.css';

export default class App extends Component {
  
  gameService = new GameService();
  
  state = {
    settings: {},
    loading: true,
    error: false
  };
  
  componentDidMount() {
    this.loadingGameSettings();
  };
  
  loadingGameSettings = () => {
    this.gameService
      .getSettings().then((settings) => {
        this.setState({
          settings,
          loading: false
        });
      }).catch(this.onError);
  };
  
  onError = (e) => {
    this.setState({loading: false, error: true});
  };
  
  render() {
    const {settings, loading, error} = this.state;
    
    const app = (
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
    
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const visibleContent = !(loading || error) ? app : null;
    
    return (
      <React.Fragment>
        {spinner}
        {errorMessage}
        {visibleContent}
      </React.Fragment>
    );
  }
}