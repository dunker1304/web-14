import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './Components/Navbar';

// import logo from './logo.svg';
import NewGame from './Components/NewGame';

import './App.css';

class App extends Component {
  state = {
    game: null
  }

  componentDidMount() {
    // setInterval(() => {
    //   const now = new Date();
    //   this.updateTime(now);
    // }, 1000);
  }

  updateGameState = (gameData) => {
    this.setState({ game: gameData });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <Navbar />
          </header>
          <div className="content">
            {
              !this.state.game ? <NewGame updateGameState={this.updateGameState} /> : "Play game"
            }
            {/* <PlayGame /> */}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
