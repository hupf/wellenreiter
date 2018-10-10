import React from 'react';

import './Stations.css';
import Station from './Station';

function Stations(props) {
  const { stations, activeStation, togglePlayback } = props;

  function isActive(station) {
    return station.id === (activeStation && activeStation.id);
  }

  return (
    <div className="Stations">
      {stations.map(station => (
        <Station
          key={station.id}
          station={station}
          active={isActive(station)}
          togglePlayback={togglePlayback}
        />
      ))}
    </div>
  );
}

export default Stations;
