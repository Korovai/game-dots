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
    settings: [],
    winners: [],
    loading: true,
    error: false,
    currentModeName: 'Pick game mode',
    currentMode: [],
    arrayFields: [],
    dataPlayer: '',
    playerPoints: 0,
    computerPoints: 0,
    start: '',
    selectedFieldId: null,
    stop: false,
    winnerDate: []
  };

  componentDidMount() {
    this.loadingGameSettings();
    this.loadingLeaderBoard();
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
  
  loadingLeaderBoard = () => {
    this.gameService
      .getWinners().then((winners) => {
        this.setState({
          winners,
          loading: false
        });
      }).catch(this.onError);
  };
  
  onError = (e) => {
    this.setState({loading: false, error: true});
  };
  
  onOpenSelector = () => {
    document.querySelector('.formSelectList').classList.toggle('isActive');
  };
  
  onSelectMode = (key) => {
    const arrFields = [];
    const num = this.state.settings[key - 1].field;
    const settings = this.state.settings[key - 1];
    
    for(let i=0; i<Math.pow(num, 2); i++) {
      arrFields[i] = {id: i, namesClass: 'gameFiled'};
    }
    
    this.setState({
      currentModeName: this.state.settings[key - 1].mode,
      currentMode: {
        id: key,
        size: settings.size,
        mode: settings.mode,
        field: settings.field,
        delay: settings.delay
      },
      arrayFields: arrFields
    });
    
    document.querySelector('.formSelectList').classList.remove('isActive');
  };

  onGetDataPlayer = (e) => {
    this.setState({
      dataPlayer: e.target.value
    });
  };
  
  dataValidation = () => {
    let flag = 0;
    const selectValidation = this.state.currentMode;
    const inputValidation = this.state.dataPlayer;
    const messageArea = document.querySelector('.message');
    
    if(inputValidation.length === 0) {
      messageArea.style.color = '#e85a5f';
      messageArea.value = 'Validation error: Invalid player name';
    } else flag++;
    
    if(selectValidation.length === 0) {
      messageArea.style.color = '#e85a5f';
      messageArea.value = 'Validation error: Game mode not selected';
    } else flag++;
    
    if(flag === 2) {
      return true;
    } else return false;
  };

  activeElements = () => {
    document.querySelector('.formSelectContent').style.pointerEvents = 'auto';
    document.querySelector('.nameUser').disabled = false;  
  };
  
  inactiveElements = () => {
    document.querySelector('.formSelectContent').style.pointerEvents = 'none';
    document.querySelector('.nameUser').disabled = true;
    document.querySelector('.btnPlay').disabled = true;  
  };
  
  gameStart = () => {  
    if(this.dataValidation()) {
      const messageArea = document.querySelector('.message');
      
      if(this.state.stop === false) {   
        this.setState({
          start: setInterval(this.randomField, this.state.currentMode.delay)
        });
        
        messageArea.style.color = '#a1a1a1';
        messageArea.value = `Let's go, the game has begun!`;
        this.inactiveElements();
      } else {
        this.setState({
          currentModeName: 'Pick game mode',
          currentMode: [],
          arrayFields: [],
          dataPlayer: '',
          playerPoints: 0,
          computerPoints: 0,
          start: '',
          selectedFieldId: null,
          stop: false
        });
        
        document.querySelector('.nameUser').value = '';
        document.querySelector('.btnPlay').innerHTML = 'Play';
        messageArea.value = 'Will we play again?';
        
        const arr = this.state.arrayFields;
        for(let i=0; i<arr.length; i++) {
          arr[i].namesClass = 'gameFiled';
        } 
        
        this.activeElements();
      }
    }
  };
  
  onSelectField = (idField) => {
    this.setState({
      selectedFieldId: idField
    });
  };
  
  toggleNamesClass(idRand) {
    const arr = this.state.arrayFields;
    for(let i=0; i<arr.length; i++) {
      if(arr[i].id === idRand) {
        const oldItem = arr[i];
        const newItem = {...oldItem, namesClass: 'gameFiled randomField'};
        return [...arr.slice(0, i), newItem, ...arr.slice(i+1)] 
      }
    }
  };
  
  getWinTime = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const fullDate = currentDate.getHours() + ':' + currentDate.getMinutes() + '; ' + currentDate.getDate() + ' ' + months[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
    return fullDate;
  };
  
  randomField = () => {
    const buf = [];
    let k = 0;
    const arr = this.state.arrayFields;
    
    for(let i=0; i<arr.length; i++) {
      if(arr[i].namesClass !== 'gameFiled playField' && arr[i].namesClass !== 'gameFiled computerField') {
        buf[k] = arr[i];
        k++;
      }
    }
     
    const num = buf.length;
    const rand = Math.floor(0 + Math.random() * (num - 1 + 1 - 0));
    
    this.setState({
      arrayFields: this.toggleNamesClass(buf[rand].id) 
    });

    let i = 0;
    while(i<arr.length) {
      if(arr[i].namesClass === 'gameFiled randomField') {
        if(arr[i].id === this.state.selectedFieldId) {
          const oldItem = arr[i];
          const newItem = {...oldItem, namesClass: 'gameFiled playField'};
          
          this.setState({
            arrayFields: [...arr.slice(0, i), newItem, ...arr.slice(i+1)] 
          });
          
          let points1 = this.state.playerPoints;
          points1++;
          
          this.setState({
            playerPoints: points1
          });
          
        } else {
          const oldItem = arr[i];
          const newItem = {...oldItem, namesClass: 'gameFiled computerField'};
          
          this.setState({
            arrayFields: [...arr.slice(0, i), newItem, ...arr.slice(i+1)]
          });

          let points2 = this.state.computerPoints;
          points2++;
          
          this.setState({
            computerPoints: points2
          });
        }
      }

      const messageArea = document.querySelector('.message');
      
      if(this.state.playerPoints > Math.floor(this.state.arrayFields.length/2)) {
        clearInterval(this.state.start);
        messageArea.style.color = '#a1a1a1';
        messageArea.value = `Congratulations, ${this.state.dataPlayer}, you won!`;
        document.querySelector('.btnPlay').innerHTML = 'Restart';
        document.querySelector('.btnPlay').disabled = false;
        this.setState({
          stop: true
        });
        
        this.setState({
          winnerDate: {
            winner: this.state.dataPlayer,
            date: this.getWinTime()
          }
        });
        
        this.setDate(this.state.winnerDate);
        i = arr.length + 1;
        
      } else if(this.state.computerPoints > Math.floor(this.state.arrayFields.length/2)) {
        clearInterval(this.state.start);
        messageArea.style.color = '#a1a1a1';
        messageArea.value = 'Computer won!';
        document.querySelector('.btnPlay').innerHTML = 'Restart';
        document.querySelector('.btnPlay').disabled = false;
        this.setState({
          stop: true
        });
        
        this.setState({
          winnerDate: {
            winner: 'Computer',
            date: this.getWinTime()
          }
        });
        
        this.setDate(this.state.winnerDate); 
        i = arr.length + 1;
        
      }
      i++;
    }
  };
  
  setDate = (userData) => {
    fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then((response) => console.log('Congratulations, data sent successfully'))
    .catch((error) => console.error(error));
  };

  render() {
    const {settings, winners, loading, error, currentModeName, currentMode, arrayFields} = this.state;
    
    const app = (
      <div className="wrApp">
        <div className="wrAppCol1">
          <Header settings={settings} onOpenSelector={this.onOpenSelector} currentModeName={currentModeName} onSelectMode={this.onSelectMode} gameStart={this.gameStart} onGetDataPlayer={this.onGetDataPlayer} />
          <PlayZone currentMode={currentMode} arrayFields={arrayFields} onSelectField={this.onSelectField} />
        </div>
        <div className="wrAppCol2">
          <Results winners={winners} />
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