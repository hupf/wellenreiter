import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './App.css';
import Main from './Main';
import StationForm from './StationForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      redirectToMain: false
    };
  }

  componentDidMount() {
    this.loadStations().then(stations => this.setState({ stations }));
  }

  loadStations() {
    return new Promise(resolve => {
      resolve([
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
      ]);
    });
  }

  handleStationSubmit = data => {
    const stations = this.state.stations;
    this.setState({
      stations: [...stations, { id: stations.length + 1, ...data }],
      redirectToMain: true
    });
  };

  render() {
    const redirectToMain = this.state.redirectToMain ? (
      <Redirect to="/" />
    ) : null;
    return (
      <Router>
        <main className="App">
          <Route
            exact
            path="/"
            render={props => <Main {...props} stations={this.state.stations} />}
          />
          <Route
            path="/station/new"
            render={props => (
              <StationForm {...props} submit={this.handleStationSubmit} />
            )}
          />
          <Route path="/station/:stationId/edit" component={StationForm} />
          {redirectToMain}
        </main>
      </Router>
    );
  }
}

export default App;
