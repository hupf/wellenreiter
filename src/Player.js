import { Component } from 'react';
import { Howl } from 'howler';

import { showError } from './error';

const FADE_TIME = 300;

class Player extends Component {
  sound = null;

  async componentDidUpdate(prevProps) {
    const prevStation = prevProps.station || null;
    const newStation = this.props.station || null;
    if (newStation !== prevStation) {
      try {
        if (prevStation) {
          await this.stop();
        }
        if (newStation) {
          await this.play(newStation.url);
        }
        if (this.props.onPlaybackStart) {
          this.props.onPlaybackStart(newStation);
        }
      } catch (error) {
        this.onError(error);
      }
    }
  }

  play(url) {
    return Promise.all([this.stop(), this.getStreamUrl(url)]).then(
      ([_, streamUrl]) => {
        this.initHowler(streamUrl);
        this.soundId = this.sound.play();
        this.sound.fade(0, 1, FADE_TIME);
        return new Promise(resolve => setTimeout(resolve, FADE_TIME));
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

  async fetchM3U(url) {
    const response = await fetch(url);
    const data = await response.text();
    return this.parseM3U(data);
  }

  parseM3U(data) {
    return data.split('\n').find(line => {
      const firstChar = line.trim()[0];
      return firstChar != null && firstChar !== '#';
    });
  }

  initHowler(streamUrl) {
    this.sound = new Howl({
      src: streamUrl,
      html5: true,
      volume: 0
    });
    this.sound.on('loaderror', this.onError);
    this.sound.on('playerror', this.onError);
  }

  onError = error => {
    this.props.onPlaybackStop(this.props.station);
    showError('Unable to load stream or start audio playback', error);
  };

  render() {
    return null;
  }
}

export default Player;
