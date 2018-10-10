// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateStation = `subscription OnCreateStation(
  $id: ID
  $name: String
  $url: AWSURL
  $position: Int
) {
  onCreateStation(id: $id, name: $name, url: $url, position: $position) {
    id
    name
    url
    position
  }
}
`;
export const onUpdateStation = `subscription OnUpdateStation(
  $id: ID
  $name: String
  $url: AWSURL
  $position: Int
) {
  onUpdateStation(id: $id, name: $name, url: $url, position: $position) {
    id
    name
    url
    position
  }
}
`;
export const onDeleteStation = `subscription OnDeleteStation(
  $id: ID
  $name: String
  $url: AWSURL
  $position: Int
) {
  onDeleteStation(id: $id, name: $name, url: $url, position: $position) {
    id
    name
    url
    position
  }
}
`;
