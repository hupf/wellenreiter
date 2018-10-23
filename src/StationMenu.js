import React from 'react';

import './StationMenu.css';

function StationMenu(props) {
  const {
    station,
    onShortClick,
    onEdit,
    onDelete,
    onMoveBackward,
    onMoveForward
  } = props;

  return (
    <div className="Station StationMenu">
      <button className="Station-button" onClick={() => onShortClick(station)}>
        {station.name}
      </button>
      <button
        className="StationMenu-button StationMenu-button-edit"
        onClick={() => onEdit(station)}
      >
        ✎
      </button>
      <button
        className="StationMenu-button StationMenu-button-delete"
        onClick={() => onDelete(station)}
      >
        🗑
      </button>
      <button
        className="StationMenu-button StationMenu-button-backward"
        onClick={() => onMoveBackward(station)}
      >
        ←
      </button>
      <button
        className="StationMenu-button StationMenu-button-forward"
        onClick={() => onMoveForward(station)}
      >
        →
      </button>
    </div>
  );
}

export default StationMenu;
