import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowTravelPlan from './ShowTravelPlan';

export default function DynamicMap({ start, end }) {
  //console.log("DynamicMap: ganz oben " + start);

  // center of map, right now coordinates of airport Hamburg
  let center = [53.63383190811092, 9.99638283572184];

  // some const for data fetching:
  // currently map of hamburg is loaded
  const server =
    'http://eco-router-planner-api.kmuenster.com/otp/routers/default/plan';

  const [planBicycle, setPlanBicycle] = useState({}); // hook for saving travel plan via BICYLE
  const [planCar, setPlanCar] = useState({}); // hook for saving travel plan via CAR
  const [planTransit, setPlanTransit] = useState({}); // hook for saving travel plan via TRANSIT

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

  // fetch data from OTP server
  useEffect(() => {
    // API call by BICYCLE
    const fetchItemsTripByBicycle = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=BICYCLE&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
      );
      setPlanBicycle(result.data.plan);
      console.log('DynamicMap Trip by BICYCLE:', result.data);
      //console.log("DynamicMap: setPlan BICYCLE");
    };

    // API call by CAR
    const fetchItemsTripByCar = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=CAR&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
      );
      setPlanCar(result.data.plan);
      console.log('DynamicMap Trip by CAR:', result.data);
      //console.log("DynamicMap: setPlan CAR");
    };

    // API call by TRANSIT
    const fetchItemsTripByTransit = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=TRANSIT%2CWALK&showIntermediateStops=true&maxStopToShapeSnapDistance=1&filterItinerariesWithSameFirstOrLastTrip=true&numItineraries=7`
      );  // only 7 Itineraries are returned, some of them are doubled, needs to be filtered later
      setPlanTransit(result.data.plan);
      console.log('DynamicMap Trip by TRANSIT:', result.data);
      //console.log("DynamicMap: setPlan TRANSIT");
    };

    if (start && end) {
      // start and end are only defined after the first geocoding call (when the submit button is pressed). Only call the API with both start and end defined.
      fetchItemsTripByBicycle();
      fetchItemsTripByCar();
      fetchItemsTripByTransit();
    }
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
        <ShowTravelPlan
          plan={planBicycle}
          toIcon={toIcon}
          fromIcon={fromIcon}
        />
      </MapContainer>
    </div>
  );
}
