import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import Main from './Main';
import StationForm from './StationForm';
import {
  listStations,
  createStation,
  deleteStation,
  swapStationPositions
} from './graphql/stations';
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

  handleStationSubmit = async data => {
    const station = await createStation(data, this.state.stations);
    this.setState(state => ({
      stations: [...state.stations, station],
      redirectToMain: true
    }));
  };

  deleteStation = async station => {
    await deleteStation(station);
    this.setState(state => ({
      stations: state.stations.filter(s => s.id !== station.id)
    }));
  };

  moveStationBackward = async station => {
    this.moveStation(station, -1);
  };

  moveStationForward = async station => {
    this.moveStation(station, 1);
  };

  async moveStation(station, positionDelta) {
    const index = this.state.stations.indexOf(station);
    const siblingIndex = index + positionDelta;
    const [updatedStation, updatedSiblingStation] = await swapStationPositions(
      station,
      this.state.stations[siblingIndex]
    );

    this.setState(state => {
      const newStations = [...state.stations];
      newStations[index] = updatedSiblingStation;
      newStations[siblingIndex] = updatedStation;
      return { stations: newStations };
    });
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
            render={props => (
              <Main
                {...props}
                stations={this.state.stations}
                onDelete={this.deleteStation}
                onMoveBackward={this.moveStationBackward}
                onMoveForward={this.moveStationForward}
              />
            )}
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
