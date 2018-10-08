import React, { Component } from 'react';
import { Howl } from 'howler';
import './App.css';

const stationUrl = 'http://stream.srg-ssr.ch/drs1/mp3_128.m3u';
const streamUrl = 'http://stream.srg-ssr.ch/m/regi_be_fr_vs/mp3_128';
const FADE_TIME = 300;

class App extends Component {
  sound = null;
  soundId = null;

  togglePlayback() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    this.stop().then(() => {
      this.sound = new Howl({
        src: streamUrl,
        html5: true,
        volume: 0
      });
      this.soundId = this.sound.play();
      this.sound.fade(0, 1, FADE_TIME);
    });
  }

  stop() {
    return new Promise(resolve => {
      this.sound && this.sound.fade(1, 0, FADE_TIME);
      setTimeout(() => {
        this.sound && this.sound.unload();
        this.sound = null;
        this.soundId = null;
        resolve();
      }, this.isPlaying ? FADE_TIME : 0);
    });
  }

  get isPlaying() {
    return this.soundId && this.sound && this.sound.playing(this.soundId);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.togglePlayback.bind(this)}>Play/Stop</button>
        </header>
      </div>
    );
  }
}

export default App;
