import React, { Component } from 'react';

import './App.css';
import Player from './Player';

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

class App extends Component {
  render() {
    return (
      <main className="App">
        <Player stations={stations} />
      </main>
    );
  }
}

export default App;
