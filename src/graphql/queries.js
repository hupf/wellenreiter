// eslint-disable
// this is an auto generated file. This will be overwritten

export const getStation = `query GetStation($id: ID!, $position: Int!) {
  getStation(id: $id, position: $position) {
    id
    name
    url
    position
  }
}
`;
export const listStations = `query ListStations(
  $filter: TableStationFilterInput
  $limit: Int
  $nextToken: String
) {
  listStations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      url
      position
    }
    nextToken
  }
}
`;
