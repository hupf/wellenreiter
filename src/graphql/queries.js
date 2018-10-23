// eslint-disable
// this is an auto generated file. This will be overwritten

export const getStation = `query GetStation($id: ID!) {
  getStation(id: $id) {
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
