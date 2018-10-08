import React, { Component } from 'react';
import { Howl } from 'howler';
import './App.css';

const stations = [
  {
    id: 1,
    name: 'Radio SRF 1',
    url: 'http://stream.srg-ssr.ch/regi_be_fr_vs/mp3_128.m3u'
  },
  {
    id: 2,
    name: 'Radio SRF 2 Kultur',
    url: 'http://stream.srg-ssr.ch/drs2/mp3_128.m3u'
  },
  {
    id: 3,
    name: 'Radio SRF 3',
    url: 'http://stream.srg-ssr.ch/drs3/mp3_128.m3u'
  },
  {
    id: 4,
    name: 'RaBe',
    url: 'http://stream.rabe.ch/livestream/rabe-mid.mp3.m3u'
  },
  {
    id: 5,
    name: 'Couleur 3',
    url: 'http://stream.srg-ssr.ch/couleur3/mp3_128.m3u'
  },
  {
    id: 6,
    name: 'BBC 6 Music',
    url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_6music_mf_p'
  }
];

const FADE_TIME = 300;

class App extends Component {
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
    Promise
      .all([this.stop(), this.getStreamUrl(station.url)])
      .then(([_, streamUrl]) => {
        this.sound = new Howl({
          src: streamUrl,
          html5: true,
          volume: 0
        });
        this.soundId = this.sound.play();
        this.sound.fade(0, 1, FADE_TIME);
        this.setState({ ...this.state, activeStation: station });
      });
  }

  stop() {
    return new Promise(resolve => {
      this.sound && this.sound.fade(1, 0, FADE_TIME);
      setTimeout(() => {
        this.sound && this.sound.unload();
        this.sound = null;
        this.soundId = null;
        this.setState({ ...this.state, activeStation: null });
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
    return data
      .split('\n')
      .find(line => {
        const firstChar = line.trim()[0];
        return firstChar != null && firstChar !== '#';
      });
  }

  // get isPlaying() {
  //   return this.soundId && this.sound && this.sound.playing(this.soundId);
  // }

  render() {
    const stationsButtons = stations.map(station => {
      const stationClasses = station === this.state.activeStation ? 'App-station-button App-station-button-active' : 'App-station-button';
      return (
        <div className="App-station">
          <button
              key={station.id}
              className={stationClasses}
              onClick={ () => this.togglePlayback(station) }>
            { station.name }
          </button>
        </div>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-stations">
            { stationsButtons }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
