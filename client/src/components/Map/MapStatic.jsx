import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import icon from '../../assets/icons/placeHolder.png'
import styles from './map.module.css';
import { useEffect, useState } from "react";

function MapStatic({position = [-32.81513813534083, -62.158580722506244], zoom = 7, buildings}) {
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [38, 38]
  });
  const [markers, setMarkers] = useState([])
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };
  function createMakers(data) {
    if(data.length > 0) {
      if(data && Array.isArray(data)){
        const markersArr = data.map((building) => {
          try {
            return {geocode: [building.lat, building.lng], popUpText: building.name, popUpImg: building.imageUrl, popUpAddress: building.address}
          } catch (err) {
            console.log(err)
          }
        })
        setMarkers(markersArr)
      } else if(data && !Array.isArray(data)){
        const markersArr = [{geocode: [data.lat, data.lng], popUpText: data.name, popUpImg: data.imageUrl, popUpAddress: data.address}]
        setMarkers(markersArr)
      }
    }  
  }
  useEffect(() => {
    createMakers(buildings)
  }, [buildings])
  return (<div className={styles.ContainerMap}>
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className={styles.mapContainer}
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
          <Marker position={marker.geocode} icon={customIcon} draggable={false} autoPan={true}>
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
  </div>
    
  )
}

export default MapStatic
