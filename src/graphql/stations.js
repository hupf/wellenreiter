import { API, graphqlOperation } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

import { listStations as listStationsQuery } from './queries';
import {
  createStation as createStationMutation,
  updateStation as updateStationMutation
} from './mutations';

export async function listStations() {
  try {
    const response = await API.graphql(graphqlOperation(listStationsQuery));
    const stations = response.data.listStations.items;
    return stations.sort((a, b) => a.position - b.position);
  } catch (error) {
    console.log('error', error);
  }
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
    console.log('error', error);
  }
}

export async function updateStation(data) {}

export async function deleteStation(data) {}

function getMaxStationPosition(stations) {
  return stations.reduce(
    (position, station) => Math.max(position, station.position),
    0
  );
}
