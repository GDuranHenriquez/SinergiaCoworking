import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import icon from '../../assets/icons/placeHolder.png'

function MapStatic({position = [-32.81513813534083, -62.158580722506244], zoom = 7, buildings}) {
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [38, 38]
  });
  
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  let markers
  if(buildings && Array.isArray(buildings)){
    markers = buildings.map(building => (
      {geocode: [building.lat, building.lng], popUpText: building.name, popUpImg: building.imageUrl, popUpAddress: building.address}
    ))
  } else if(buildings){
    markers = [{geocode: [buildings.lat, buildings.lng], popUpText: buildings.name, popUpImg: buildings.imageUrl, popUpAddress: buildings.address}]
  }
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ minHeight: "50vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon} draggable={true} autoPan={true}>
            <Popup>
            <div style={{width: '200px', height:'250px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img style={{width: "10rem", height: "10rem"}} src={marker.popUpImg} />
                <p style={{padding: '0px', margin: '3px'}}>{marker.popUpText}</p>
                <p>{marker.popUpAddress}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapStatic
