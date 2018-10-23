import React, { Component } from 'react';

import './Station.css';

const LONG_CLICK_TIME = 1000;

class Station extends Component {
  clickTimer = null;
  isLongClick = false;

  clickStart() {
    this.isLongClick = false;
    this.clickTimer = setTimeout(() => {
      if (this.props.onLongClick) {
        this.props.onLongClick(this.props.station);
      }
      this.isLongClick = true;
      this.clickTimer = null;
    }, LONG_CLICK_TIME);
  }

  clickEnd() {
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
          onMouseDown={() => this.clickStart()}
          onMouseUp={() => this.clickEnd()}
          onTouchStart={() => this.clickStart()}
          onTouchEnd={() => this.clickEnd()}
        >
          {station.name}
          {spinner}
        </button>
      </div>
    );
  }
}

export default Station;
