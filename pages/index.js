import Map from '../components/Map/Map';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput/SearchInput';
import TripDisplay from '../components/TripDisplay/TripDisplay';
import axios from 'axios';

export default function Home() {
  const [startCoords, setStartCoords] = useState(''); // coordinates in lat,lon
  const [endCoords, setEndCoords] = useState(''); // coordinates in lat,lon

  const [planBicycle, setPlanBicycle] = useState({}); // hook for saving travel plan via BICYLE
  const [planCar, setPlanCar] = useState({}); // hook for saving travel plan via CAR
  const [planTransit, setPlanTransit] = useState({}); // hook for saving travel plan via TRANSIT

  // data fetching from OTP server
  // currently map of hamburg is loaded
  const server =
    'http://eco-router-planner-api.kmuenster.com/otp/routers/default/plan';

  useEffect(() => {
    // API call by BICYCLE
    const fetchItemsTripByBicycle = async () => {
      try {
        const result = await axios(
          `${server}?fromPlace=${startCoords}&toPlace=${endCoords}&mode=BICYCLE&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
        );
        setPlanBicycle(result.data.plan);
        console.log('index.js: Trip by BICYCLE:', result.data);
        //console.log("index.js: setPlan BICYCLE");
      } catch (error) {
        // TypeError: Failed to fetch
        console.log('There was an error', error);
      }
    };

    // API call by CAR
    const fetchItemsTripByCar = async () => {
      try {
        const result = await axios(
          `${server}?fromPlace=${startCoords}&toPlace=${endCoords}&mode=CAR&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
        );
        setPlanCar(result.data.plan);
        console.log('index.js: Trip by CAR:', result.data);
        //console.log("index.js: setPlan CAR");
      } catch (error) {
        // TypeError: Failed to fetch
        console.log('There was an error', error);
      }
    };

    // API call by TRANSIT
    const fetchItemsTripByTransit = async () => {
      try {
        const result = await axios(
          `${server}?fromPlace=${startCoords}&toPlace=${endCoords}&mode=TRANSIT%2CWALK&showIntermediateStops=true&maxStopToShapeSnapDistance=1&filterItinerariesWithSameFirstOrLastTrip=true&numItineraries=7`
        ); // only 7 Itineraries are returned, some of them are doubled, needs to be filtered later
        setPlanTransit(result.data.plan);
        console.log('index.js: Trip by TRANSIT:', result.data);
        //console.log("index.js: setPlan TRANSIT");
      } catch (error) {
        // TypeError: Failed to fetch
        console.log('There was an error', error);
      }
    };

    if (startCoords && endCoords) {
      // startCoords and endCoords are only defined after the first geocoding call (when the submit button is pressed). Only call the API with both start and end defined.
      fetchItemsTripByBicycle();
      fetchItemsTripByCar();
      fetchItemsTripByTransit();
    }
  }, [startCoords, endCoords]);

  return (
    <div>
      <h1>Home</h1>
      <SearchInput
        setStartCoords={setStartCoords}
        setEndCoords={setEndCoords}
      />
      <Map planBicycle={planBicycle} />
      <TripDisplay
        planBicycle={planBicycle}
        planCar={planCar}
        planTransit={planTransit}
      />
    </div>
  );
}
