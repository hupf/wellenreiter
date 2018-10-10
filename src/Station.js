import React from 'react';

import './Station.css';

function Station(props) {
  const { station, active, togglePlayback } = props;

  let stationClasses = 'Station-button';
  if (active) {
    stationClasses += ' Station-button-active';
  }

  return (
    <div className="Station">
      <button
        key={station.id}
        className={stationClasses}
        onClick={() => togglePlayback(station)}
      >
        {station.name}
      </button>
    </div>
  );
}

export default Station;
