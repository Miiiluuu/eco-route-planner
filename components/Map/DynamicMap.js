import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import Styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowTravelPlan from "./ShowTravelPlan";

export default function DynamicMap({ start, end }) {
  console.log('In Map:' + start)
  // some const for data fetching:
  // currently map of hamburg is loaded
  const server =
    "http://eco-router-planner-api.kmuenster.com/otp/routers/default/plan";
  // start and end of the travel route will be passed in as parameters
  const fromPlace = start;
  const toPlace = end;
  // center of map, right now coordinates of airport Hamburg
  let center = [53.63383190811092, 9.99638283572184];

  const [plan, setPlan] = useState({});

  // definition of start and stop marker image/size
  const fromIcon = L.icon({
    iconUrl: "/marker_pin.png",
    iconRetinaUrl: "/marker_pin.png",
    //shadowUrl: '/marker_pin.png',
    //shadowRetinaUrl: './marker_pin.png',
    iconSize: [24, 32], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const toIcon = L.icon({
    iconUrl: "/marker_pin.png",
    iconRetinaUrl: "/marker_pin.png",
    //shadowUrl: '/marker_pin.png',
    //shadowRetinaUrl: './marker_pin.png',
    iconSize: [24, 32], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  // fetch data from OTP server
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `${server}?fromPlace=${fromPlace}&toPlace=${toPlace}&mode=WALK&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
      );
      setPlan(result.data.plan);
    };
    fetchItems();
  }, [start, end]);


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
        <ShowTravelPlan plan={plan} toIcon={toIcon} fromIcon={fromIcon} />
      </MapContainer>
    </div>
  );
}
