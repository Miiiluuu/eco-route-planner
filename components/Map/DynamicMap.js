import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import Styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowTravelPlan from "./ShowTravelPlan"

export default function DynamicMap() {
  // some const for data fetching
  const server = "http://localhost:8080/otp/routers/default/plan";
  const toPlace = "45.46630,-122.69325";
  const fromPlace = "45.43469,-122.76426";
  // center of map, right now coordinates of london
  let center = [51.505, -0.09];

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
  }, []);


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
