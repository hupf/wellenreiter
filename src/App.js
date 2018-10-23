import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import Main from './Main';
import StationForm from './StationForm';
import { listStations, createStation } from './graphql/stations';
import aws_exports from './aws-exports';

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
    listStations().then(stations => this.setState({ stations }));
  }

  handleStationSubmit = data => {
    createStation(data, this.state.stations).then(station => {
      this.setState({
        stations: [...this.state.stations, station],
        redirectToMain: true
      });
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
