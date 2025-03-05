import { useState, useContext } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap,useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { useEffect } from "react"
import { MapCoordinates } from '../context/CoordinatesContext';

function MapUpdater({latitude, longitude}) {
    const map = useMap()

    useEffect(() => {
        map.setView([latitude, longitude], 3)
    }, [map, latitude, longitude])
}

const MapEvents = () => {
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        //const { setLat, setLong, handleLocationSearchFromMap } = useCoordinatesContext();
        handleLocationSearchFromMap();
        const {lat, setLat} = useContext(MapCoordinates);
        const {long, setLong} = useContext(MapCoordinates);

        if (!window.alert(`Map select loctation Lat: ${lat} Long: ${long}`)) {
            return;
          }


        const {handleLocationSearchFromMap} = useContext(MapCoordinates);
        
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
        
      },
    });
    return false;
}

export function Map({latitude, longitude}) {

    //const { lat, long, setLat, setLong, } = useCoordinatesContext();

    return(
        <div>
            <MapContainer 
            center={[latitude, longitude]}
            zoom={3}
            style={{height: "500px", width: "600px"}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        A marker at latitude {latitude} and longitude {longitude}
                    </Popup>
                </Marker>
                <MapUpdater latitude={latitude} longitude={longitude}/>
                <MapEvents />
            </MapContainer>
        </div>
    )
}