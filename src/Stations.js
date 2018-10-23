import React, { Component } from 'react';

import './Stations.css';
import Station from './Station';
import StationMenu from './StationMenu';

class Stations extends Component {
  state = { menuStation: null };

  isLoading(station) {
    const { playingStation, activeStation } = this.props;
    return (
      !playingStation && station.id === (activeStation && activeStation.id)
    );
  }

  isActive(station) {
    const { playingStation, activeStation } = this.props;
    return (
      station.id === (activeStation && activeStation.id) &&
      station.id === (playingStation && playingStation.id)
    );
  }

  showStationMenu = station => {
    this.setState({ menuStation: station });
  };

  hideStationMenu = () => {
    this.setState({ menuStation: null });
  };

  renderStation(station) {
    if (station === this.state.menuStation) {
      return (
        <StationMenu
          key={station.id}
          station={station}
          onShortClick={this.hideStationMenu}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
          onMoveBackward={this.props.onMoveBackward}
          onMoveForward={this.props.onMoveForward}
        />
      );
    } else {
      return (
        <Station
          key={station.id}
          station={station}
          loading={this.isLoading(station)}
          active={this.isActive(station)}
          onShortClick={this.props.togglePlayback}
          onLongClick={this.showStationMenu}
        />
      );
    }
  }

  render() {
    const { stations } = this.props;

    const className = `Stations ${stations.length <= 3 ? 'Stations-few' : ''}`;

    return (
      <div className={className}>
        {stations.map(station => this.renderStation(station))}
      </div>
    );
  }
}

export default Stations;
