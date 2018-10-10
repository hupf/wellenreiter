import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import Player from './Player';
import Stations from './Stations';

class Main extends Component {
  sound = null;
  player = new Player();

  constructor(props) {
    super(props);
    this.state = {
      activeStation: null
    };
  }

  togglePlayback(station) {
    if (this.state.activeStation === station) {
      this.player.stop().then(() => {
        this.setState({ activeStation: null });
      });
    } else {
      this.player.play(station.url).then(() => {
        this.setState({ activeStation: station });
      });
    }
  }

  render() {
    return (
      <div className="Main">
        <Stations
          stations={this.props.stations}
          activeStation={this.state.activeStation}
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
