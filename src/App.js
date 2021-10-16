import WaterInfo from './components/WaterInfo.js';
import './App.css';
import React, { Component } from 'react';

class App extends Component {

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <div className="top-title">台灣水庫水情</div>
          <WaterInfo/>
        </header>
      </div>
    );
  }
}

export default App;
