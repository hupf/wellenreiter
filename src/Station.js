import React from 'react';

import './Station.css';

function Station(props) {
  const { station, loading, active, togglePlayback } = props;

  let stationClasses = 'Station-button';
  if (active) {
    stationClasses += ' Station-button-active';
  }

  const spinner = loading ? <div className="Station-spinner" /> : null;

  return (
    <div className="Station">
      <button
        key={station.id}
        className={stationClasses}
        onClick={() => togglePlayback(station)}
      >
        {station.name}
        {spinner}
      </button>
    </div>
  );
}

export default Station;
