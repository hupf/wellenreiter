import React, { Component } from 'react';

import './Station.css';

const LONG_CLICK_TIME = 700;

class Station extends Component {
  clickTimer = null;
  isLongClick = false;
  touch = false;

  startClick() {
    this.isLongClick = false;
    this.clickTimer = setTimeout(() => {
      if (this.props.onLongClick) {
        this.props.onLongClick(this.props.station);
      }
      this.isLongClick = true;
      this.clickTimer = null;
    }, LONG_CLICK_TIME);
  }

  endClick() {
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
    }
    if (!this.isLongClick) {
      this.isLongClick = false;
      if (this.props.onShortClick) {
        this.props.onShortClick(this.props.station);
      }
    }
  }

  onTouchStart() {
    this.touch = true;
    this.startClick();
  }

  onTouchEnd() {
    this.endClick();
  }

  onMouseDown() {
    if (!this.touch) {
      this.startClick();
    }
  }

  onMouseUp() {
    if (!this.touch) {
      this.endClick();
    }
  }

  render() {
    const { station, loading, active } = this.props;

    let stationClasses = 'Station-button';
    if (active) {
      stationClasses += ' Station-button-active';
    }

    const spinner = loading ? <div className="Station-spinner" /> : null;

    return (
      <div className="Station">
        <button
          className={stationClasses}
          onTouchStart={() => this.onTouchStart()}
          onTouchEnd={() => this.onTouchEnd()}
          onMouseDown={() => this.onMouseDown()}
          onMouseUp={() => this.onMouseUp()}
        >
          {station.name}
          {spinner}
        </button>
      </div>
    );
  }
}

export default Station;
