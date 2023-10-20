import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import icon from '../../assets/icons/placeHolder.png'
import { useEffect, useState } from 'react';
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import './geocoding.css'
import * as L from "leaflet";
import axios from "axios";

const APIKEY = import.meta.env.VITE_APIKEY

function MapDinamic({handleAddress, handlePosition, positionForm}) {
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [38, 38]
  });
  const center = {
    lat: -33.5219279446995,
    lng: -64.11621093750001,
  }
  const [position, setPosition] = useState(positionForm ? positionForm : '')
  // console.log(positionForm)
  // if(positionForm){
  //   setPosition(positionForm)
  // }
  const [address, setAddress] = useState('')
  async function reverseGeocode(location){
    const response = await axios.get(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&location=${location.lng},${location.lat}&token=${APIKEY}`)
    setAddress(`${response.data.address.Address}, ${response.data.address.City}, ${response.data.address.Postal}, ${response.data.address.Region}, ${response.data.address.CountryCode}`)
  }
  function DraggableMarker() {
    
    const map = useMapEvents({
      'click': (e) => {
        map.setView(e.latlng, map.getZoom(), {animate: true})
        setPosition(e.latlng)
        reverseGeocode(e.latlng)
      }
    })
    const dragHandle = (e) => {
      setPosition(e.target._latlng)
      reverseGeocode(e.target._latlng)
    }
  
    if(position){
      return (
        <Marker
          icon={customIcon}
          draggable={true}
          eventHandlers={{dragend: dragHandle}}
          position={position}
          autoPan={true}
        >
          <Popup minWidth={90}>
            <p>
              Direccion: {address}
            </p>
          </Popup>
        </Marker>
      )
    }
  }

  useEffect(() => {
    handleAddress(address)
    handlePosition(position)
  }, [address])
  return(
    <MapContainer center={center} zoom={6} scrollWheelZoom={false} style={{ minHeight: "50vh", minWidth: "25vw" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
      <EsriLeafletGeoSearch
          position="topleft"
          useMapBounds={false}
          placeholder="Search for places or addresses"
          providers={{
            arcgisOnlineProvider: {
              apikey: APIKEY,
              countries: 'ARG'
           },
          }}
          eventHandlers={{
            results: (r) => {
              setAddress(r.text)
              setPosition(r.latlng)
            }
          }}
          key={APIKEY}
        />
    </MapContainer>
  )
}

export default MapDinamic