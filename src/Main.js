import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import { StationsContext } from './context/stations';
import Player from './Player';
import Stations from './Stations';

class Main extends Component {
  state = {
    activeStation: null,
    playingStation: null
  };

  togglePlayback = station => {
    this.setState(state => ({
      activeStation: state.activeStation === station ? null : station,
      playingStation: null
    }));
  };

  onPlaybackStart = station => {
    this.setState({ playingStation: station });
  };

  onPlaybackStop = station => {
    this.setState({ activeStation: null, playingStation: null });
  };

  render() {
    return (
      <div className="Main">
        <Player
          station={this.state.activeStation}
          onPlaybackStart={this.onPlaybackStart}
          onPlaybackStop={this.onPlaybackStop}
        />
        <StationsContext.Consumer>
          {({
            stations,
            deleteStation,
            moveStationBackward,
            moveStationForward
          }) => (
            <Stations
              stations={stations}
              activeStation={this.state.activeStation}
              playingStation={this.state.playingStation}
              togglePlayback={this.togglePlayback}
              onDelete={deleteStation}
              onMoveBackward={moveStationBackward}
              onMoveForward={moveStationForward}
            />
          )}
        </StationsContext.Consumer>
        <Link className="Main-add button" to="/stations/new">
          ＋
        </Link>
      </div>
    );
  }
}

export default Main;
