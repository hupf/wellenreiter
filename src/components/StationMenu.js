import React from 'react';
import { Link } from 'react-router-dom';

import './StationMenu.css';

function StationMenu(props) {
  const {
    station,
    isFirst,
    isLast,
    onShortClick,
    onDelete,
    onMoveBackward,
    onMoveForward
  } = props;

  const backwardButton = !isFirst && (
    <button
      className="button StationMenu-button StationMenu-button-backward"
      onClick={() => onMoveBackward(station)}
    >
      ←
    </button>
  );
  const forwardButton = !isLast && (
    <button
      className="button StationMenu-button StationMenu-button-forward"
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
      <Link
        to={`/stations/${station.id}/edit`}
        className="button StationMenu-button StationMenu-button-edit"
      >
        ✎
      </Link>
      <button
        className="button StationMenu-button StationMenu-button-delete"
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
