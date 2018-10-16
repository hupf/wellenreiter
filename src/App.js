import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

import './App.css';
import Main from './Main';
import StationForm from './StationForm';
import aws_exports from './aws-exports';
import { listStations } from './graphql/queries';
import { createStation, updateStation } from './graphql/mutations';

Amplify.configure(aws_exports);

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
    return API.graphql(graphqlOperation(listStations)).then(
      response => response.data.listStations.items
    );
    // return new Promise(resolve => {
    //   resolve([
    //     {
    //       id: 1,
    //       name: 'Radio SRF 1',
    //       url: 'http://stream.srg-ssr.ch/regi_be_fr_vs/mp3_128.m3u'
    //     },
    //     {
    //       id: 2,
    //       name: 'Radio SRF 2 Kultur',
    //       url: 'http://stream.srg-ssr.ch/drs2/mp3_128.m3u'
    //     },
    //     {
    //       id: 3,
    //       name: 'Radio SRF 3',
    //       url: 'http://stream.srg-ssr.ch/drs3/mp3_128.m3u'
    //     },
    //     {
    //       id: 4,
    //       name: 'RaBe',
    //       url: 'http://stream.rabe.ch/livestream/rabe-mid.mp3.m3u'
    //     },
    //     {
    //       id: 5,
    //       name: 'Couleur 3',
    //       url: 'http://stream.srg-ssr.ch/couleur3/mp3_128.m3u'
    //     },
    //     {
    //       id: 6,
    //       name: 'BBC 6 Music',
    //       url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_6music_mf_p'
    //     }
    //   ]);
    // });
  }

  handleStationSubmit = data => {
    this.createStation(data).then(station => {
      this.setState({
        stations: [...this.state.stations, station],
        redirectToMain: true
      });
    });
  };

  createStation(data) {
    const input = {
      id: uuidv4(),
      position: this.getMaxStationPosition() + 1,
      ...data
    };
    return API.graphql(graphqlOperation(createStation, { input })).then(
      response => response.data.createStation,
      error => {
        console.log('error', error);
      }
    );
  }

  getMaxStationPosition() {
    return this.state.stations.reduce(
      (position, station) => Math.max(position, station.position),
      0
    );
  }

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
