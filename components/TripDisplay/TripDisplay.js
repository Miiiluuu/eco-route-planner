import { useState, useEffect } from 'react';
import Styles from './TripDisplay.module.css';
import axios from 'axios';

export default function TripDisplay({ start, end }) {
  const [show, setShow] = useState(false); // hook to show the details of the trip
  const [planBicycle, setPlanBicycle] = useState({}); // hook for saving travel plan via BICYLE
  const [planCar, setPlanCar] = useState({}); // hook for saving travel plan via CAR
  const [planTransit, setPlanTransit] = useState({}); // hook for saving travel plan via TRANSIT

  // fetch data from OTP server
  // currently map of hamburg is loaded
  const server =
    'http://eco-router-planner-api.kmuenster.com/otp/routers/default/plan';

  useEffect(() => {
    // API call by BICYCLE
    const fetchItemsTripByBicycle = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=BICYCLE&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
      );
      setPlanBicycle(result.data.plan);
      console.log('TripDisplay: Trip by BICYCLE:', result.data);
      //console.log("TripDisplay: setPlan BICYCLE");
    };

    // API call by CAR
    const fetchItemsTripByCar = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=CAR&showIntermediateStops=true&maxStopToShapeSnapDistance=1`
      );
      setPlanCar(result.data.plan);
      console.log('TripDisplay: Trip by CAR:', result.data);
      //console.log("TripDisplay: setPlan CAR");
    };

    // API call by TRANSIT
    const fetchItemsTripByTransit = async () => {
      const result = await axios(
        `${server}?fromPlace=${start}&toPlace=${end}&mode=TRANSIT%2CWALK&showIntermediateStops=true&maxStopToShapeSnapDistance=1&filterItinerariesWithSameFirstOrLastTrip=true&numItineraries=7`
      ); // only 7 Itineraries are returned, some of them are doubled, needs to be filtered later
      setPlanTransit(result.data.plan);
      console.log('TripDisplay: Trip by TRANSIT:', result.data);
      console.log('planTransit: ', planTransit);
      //console.log("TripDisplay: setPlan TRANSIT");
    };

    if (start && end) {
      // start and end are only defined after the first geocoding call (when the submit button is pressed). Only call the API with both start and end defined.
      fetchItemsTripByBicycle();
      fetchItemsTripByCar();
      fetchItemsTripByTransit();
    }
  }, [start, end]);

  // if the user clicks on a trip then more details are shown and the route is displayed on the map
  const onSuggestHandler = () => {
    setShow(true);
  };

  if (start && end) {
    return (
      <>
        <div
          className={Styles.single_trip}
          onClick={() => onSuggestHandler()}
          tabIndex="-1" // By default an <div> element has no focus so onBlur usually doesn't work, this is a workaround but not recommended. Using a button instead would be the right way
          onBlur={() => setShow(false)}
        >
          <div className={Styles.icon_leafs}>
            <img src="leaf_icon.png" alt="leaf icon" />
            <img src="leaf_icon.png" alt="leaf icon" />
          </div>
          <div className={Styles.icon_transportation_time}>
            <img src="transit_icon.png" alt="leaf icon" />
            <div className={Styles.trip_time}>
              {/* 20 min */}
              {'itineraries' in planTransit
                ? `${planTransit.itineraries[0].duration}`
                : null}
            </div>
          </div>
          <div className={Styles.trip_overview}>
            <div className={Styles.circle}></div>
            <div className={Styles.line}></div>
            <div className={Styles.circle}></div>
          </div>
        </div>
        {show && <div className={Styles.trip_details}>show it!!!</div>}
      </>
    );
  }
  return null;
}
