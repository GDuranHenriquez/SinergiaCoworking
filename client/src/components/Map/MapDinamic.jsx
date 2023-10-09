import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import icon from '../assets/icons/placeHolder.png'
import { useEffect, useRef, useState } from 'react';
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import './geocoding.css'
import * as L from "leaflet";
import * as EL from "esri-leaflet";

const APIKEY = import.meta.env.VITE_APIKEY

function MapDinamic() {
  console.log(EL)
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [38, 38]
  });
  const center = {
    lat: -34.6131500,
    lng: -58.3772300,
  }
  const [position, setPosition] = useState(center)
  const [address, setAddress] = useState('')
  function DraggableMarker() {
    
    const map = useMapEvents({
      'click': (e) => {
        // map.setView(e.latlng, map.getZoom(), {animate: true})
        setPosition(e.latlng)
      }
    })
    const dragHandle = (e) => {
      setPosition(e.target._latlng)
    }
  
    return (
      <Marker
        icon={customIcon}
        draggable={true}
        eventHandlers={{dragend: dragHandle}}
        position={position}
        autoPan={true}
      >
        <Popup minWidth={90}>
          <span>
            Info del marcador
          </span>
        </Popup>
      </Marker>
    )
  }

  useEffect(() => {
    const {lat, lng} = position
    console.log(address, lat, lng)
  }, [position])
  return(
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ minHeight: "50vh", minWidth: "100vw" }}>
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
            requeststart: () => console.log("Started request..."),
            requestend: () => console.log("Ended request..."),
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



// AAPK3f35aaf4b0dd47f38b6b42143cc59241H5eQSsKSWPR3ar7Rrb1rInU-8B5OH9msacXKXnhhEi5XKFKnprjUuA3EdLz_7jF8