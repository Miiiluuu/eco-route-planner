import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { Marker, icon } from "leaflet";
import Styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DynamicMap() {
  // some const for data fetching
  const server = "http://localhost:8080/otp/routers/default/plan";
  const toPlace = "45.46630,-122.69325";
  const fromPlace = "45.43469,-122.76426";
  // center of map, right now coordinates of london
  let center = [51.505, -0.09];

  const [plan, setPlan] = useState({});
  const [isValidPlan, setValidPlan] = useState(false);
  const [positionFrom, setPositionFrom] = useState(null);
  const [positionTo, setPositionTo] = useState(null);

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

  // check if there is already a valid plan fetched from OTP server, there isn't at the beginning because of async while fetching
  useEffect(() => {
    if (plan != {}) setValidPlan(true);
    if (isValidPlan) {
      console.log("PLAN:", plan);
    }
  }, [plan]);

  
  function ShowTravelPlan() {
    // if you click on the map you will fly to the start coordinates of the travel plan
    const map = useMapEvents({
      click() {
        if (isValidPlan) {
          const fromLocation = { lat: plan.from.lat, lon: plan.from.lon };
          const toLocation = { lat: plan.to.lat, lon: plan.to.lon };
          setPositionFrom(fromLocation);
          setPositionTo(toLocation);
          map.flyTo(fromLocation, map.getZoom());
        }
      },
    });

    if (positionFrom === null) {
      return null;
    }

    //adds markers to the start and stop coordinates of the travel plan
    new L.marker(positionFrom, { icon: fromIcon }).addTo(map);
    new L.marker(positionTo, { icon: toIcon }).addTo(map);

    // legGeometry.points holds encoded coordinates (lat, lon) of intermediate steps along the travel plan
    const polyUtil = require("polyline-encoded");
    const polypositions = polyUtil.decode(
      plan.itineraries[0].legs[0].legGeometry.points
    );
    console.log(polypositions);

    // sets Coordinates as Polyline to visualize the travel plan
    return <Polyline positions={polypositions} />;
  }

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
        <ShowTravelPlan />
      </MapContainer>
    </div>
  );
}
