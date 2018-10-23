import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import Player from './Player';
import Stations from './Stations';

class Main extends Component {
  state = {
    activeStation: null,
    playingStation: null
  };

  togglePlayback(station) {
    this.setState(state => ({
      activeStation: state.activeStation === station ? null : station,
      playingStation: null
    }));
  }

  onPlaybackStart(station) {
    this.setState(state => ({
      playingStation: station
    }));
  }

  render() {
    return (
      <div className="Main">
        <Player
          station={this.state.activeStation}
          onPlaybackStart={this.onPlaybackStart.bind(this)}
        />
        <Stations
          stations={this.props.stations}
          activeStation={this.state.activeStation}
          playingStation={this.state.playingStation}
          togglePlayback={this.togglePlayback.bind(this)}
        />
        <Link className="Main-add button" to="/station/new">
          +
        </Link>
      </div>
    );
  }
}

export default Main;
