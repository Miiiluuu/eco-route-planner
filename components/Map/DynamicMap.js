import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import ShowTravelPlan from './ShowTravelPlan';

export default function DynamicMap({ planBicycle }) {
  //console.log("DynamicMap: ganz oben " + start);

  // center of map, right now coordinates of airport Hamburg
  let center = [53.63383190811092, 9.99638283572184];

  // definition of start and stop marker image/size
  const fromIcon = L.icon({
    iconUrl: '/marker_pin.png',
    iconRetinaUrl: '/marker_pin.png',
    //shadowUrl: '/marker_pin.png',
    //shadowRetinaUrl: './marker_pin.png',
    iconSize: [24, 32], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const toIcon = L.icon({
    iconUrl: '/marker_pin.png',
    iconRetinaUrl: '/marker_pin.png',
    //shadowUrl: '/marker_pin.png',
    //shadowRetinaUrl: './marker_pin.png',
    iconSize: [24, 32], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  
  return (
    <div>
      {/* Embedding of Leaflet map */}
      <MapContainer
        className={Styles.map_container}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ShowTravelPlan
          plan={planBicycle}
          toIcon={toIcon}
          fromIcon={fromIcon}
        />
      </MapContainer>
    </div>
  );
}
