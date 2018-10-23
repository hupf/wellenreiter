import React, { Component, createContext } from 'react';

import {
  listStations,
  createStation as createStationMutation,
  updateStation as updateStationMutation,
  deleteStation as deleteStationMutation,
  swapStationPositions
} from '../graphql/stations';

export const StationsContext = createContext();

export class StationsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      setStations: this.setStations,
      saveStation: this.saveStation,
      createStation: this.createStation,
      updateStation: this.updateStation,
      deleteStation: this.deleteStation,
      moveStationBackward: this.moveStationBackward,
      moveStationForward: this.moveStationForward
    };
  }

  async componentDidMount() {
    const stations = await listStations();
    this.setState({ stations });
  }

  setStations = stations => {
    this.setState({ stations });
  };

  saveStation = async data => {
    return data.id ? this.updateStation(data) : this.createStation(data);
  };

  createStation = async data => {
    const station = await createStationMutation(data, this.state.stations);
    this.setState(state => ({
      stations: [...state.stations, station]
    }));
  };

  updateStation = async data => {
    const station = await updateStationMutation(data, this.state.stations);
    this.setState(state => {
      const stations = [...state.stations];
      const index = stations.findIndex(s => s.id === station.id);
      stations[index] = station;
      return {
        stations
      };
    });
  };

  deleteStation = async station => {
    await deleteStationMutation(station);
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
    return (
      <StationsContext.Provider value={this.state}>
        {this.props.children}
      </StationsContext.Provider>
    );
  }
}
