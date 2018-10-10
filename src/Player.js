import React, { Component } from 'react';
import { Howl } from 'howler';

import Stations from './Stations';

const FADE_TIME = 300;

class Player extends Component {
  sound = null;

  constructor(props) {
    super(props);
    this.state = {
      activeStation: null
    };
  }

  togglePlayback(station) {
    if (this.state.activeStation === station) {
      this.stop();
    } else {
      this.play(station);
    }
  }

  play(station) {
    Promise.all([this.stop(), this.getStreamUrl(station.url)]).then(
      ([_, streamUrl]) => {
        this.sound = new Howl({
          src: streamUrl,
          html5: true,
          volume: 0
        });
        this.soundId = this.sound.play();
        this.sound.fade(0, 1, FADE_TIME);
        this.setState({ activeStation: station });
      }
    );
  }

  stop() {
    return new Promise(resolve => {
      this.sound && this.sound.fade(1, 0, FADE_TIME);
      setTimeout(() => {
        this.sound && this.sound.unload();
        this.sound = null;
        this.soundId = null;
        this.setState({ activeStation: null });
        resolve();
      }, this.sound ? FADE_TIME : 0);
    });
  }

  getStreamUrl(url) {
    if (/\.m3u8?$/.test(url)) {
      return this.fetchM3U(url);
    } else {
      return new Promise(resolve => {
        resolve(url);
      });
    }
  }

  fetchM3U(url) {
    return fetch(url)
      .then(response => response.text())
      .then(data => this.parseM3U(data));
  }

  parseM3U(data) {
    return data.split('\n').find(line => {
      const firstChar = line.trim()[0];
      return firstChar != null && firstChar !== '#';
    });
  }

  // get isPlaying() {
  //   return this.soundId && this.sound && this.sound.playing(this.soundId);
  // }

  render() {
    return (
      <Stations
        stations={this.props.stations}
        activeStation={this.state.activeStation}
        togglePlayback={this.togglePlayback.bind(this)}
      />
    );
  }
}

export default Player;
