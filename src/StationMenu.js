import React from 'react';

import './StationMenu.css';

function StationMenu(props) {
  const {
    station,
    isFirst,
    isLast,
    onShortClick,
    onEdit,
    onDelete,
    onMoveBackward,
    onMoveForward
  } = props;

  const backwardButton = !isFirst && (
    <button
      className="StationMenu-button StationMenu-button-backward"
      onClick={() => onMoveBackward(station)}
    >
      ←
    </button>
  );
  const forwardButton = !isLast && (
    <button
      className="StationMenu-button StationMenu-button-forward"
      onClick={() => onMoveForward(station)}
    >
      →
    </button>
  );

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
      {backwardButton}
      {forwardButton}
    </div>
  );
}

export default StationMenu;
