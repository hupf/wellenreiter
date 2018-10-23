import React from 'react';

import './Stations.css';
import Station from './Station';

function Stations(props) {
  const { stations, activeStation, playingStation, togglePlayback } = props;

  function isLoading(station) {
    return (
      !playingStation && station.id === (activeStation && activeStation.id)
    );
  }

  function isActive(station) {
    return (
      station.id === (activeStation && activeStation.id) &&
      station.id === (playingStation && playingStation.id)
    );
  }

  const className = `Stations ${stations.length <= 3 ? 'Stations-few' : ''}`;

  return (
    <div className={className}>
      {stations.map(station => (
        <Station
          key={station.id}
          station={station}
          loading={isLoading(station)}
          active={isActive(station)}
          togglePlayback={togglePlayback}
        />
      ))}
    </div>
  );
}

export default Stations;
