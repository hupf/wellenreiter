import { API, graphqlOperation } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

import {
  listStations as listStationsQuery,
  getStation as getStationQuery
} from './queries';
import {
  createStation as createStationMutation,
  updateStation as updateStationMutation,
  deleteStation as deleteStationMutation
} from './mutations';
import { showError } from '../error';

export async function listStations() {
  try {
    const response = await API.graphql(graphqlOperation(listStationsQuery));
    const stations = response.data.listStations.items;
    return stations.sort((a, b) => a.position - b.position);
  } catch (error) {
    showError('Error fetching stations', error);
    return [];
  }
}

export async function getStation(id) {
  try {
    const response = await API.graphql(
      graphqlOperation(getStationQuery, { id })
    );
    const station = response.data.getStation;
    return station;
  } catch (error) {
    showError('Error fetching station', error);
  }
}

export async function createStation(data, stations) {
  const input = {
    id: uuidv4(),
    position: getMaxStationPosition(stations) + 1,
    ...data
  };
  try {
    const response = await API.graphql(
      graphqlOperation(createStationMutation, { input })
    );
    return response.data.createStation;
  } catch (error) {
    showError('Error creating station', error);
  }
}

export async function updateStation(data) {
  try {
    const response = await API.graphql(
      graphqlOperation(updateStationMutation, { input: data })
    );
    return response.data.updateStation;
  } catch (error) {
    showError('Error updating station', error);
  }
}

export async function deleteStation(station) {
  const input = { id: station.id };
  try {
    const response = await API.graphql(
      graphqlOperation(deleteStationMutation, { input })
    );
    return response.data.deleteStation;
  } catch (error) {
    showError('Error deleting station', error);
  }
}

export async function swapStationPositions(station, siblingStation) {
  try {
    return await Promise.all([
      updateStation({ ...station, position: siblingStation.position }),
      updateStation({ ...siblingStation, position: station.position })
    ]);
  } catch (error) {
    showError("Error updating stations' positions", error);
  }
}

function getMaxStationPosition(stations) {
  return stations.reduce(
    (position, station) => Math.max(position, station.position),
    0
  );
}
