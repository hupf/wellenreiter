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
    if (station.id === (this.state.menuStation && this.state.menuStation.id)) {
      const index = this.props.stations.indexOf(station);
      return (
        <StationMenu
          key={station.id}
          station={station}
          isFirst={index === 0}
          isLast={index === this.props.stations.length - 1}
          onShortClick={this.hideStationMenu}
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
