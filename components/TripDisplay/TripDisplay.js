import { useState } from 'react';
import Styles from './TripDisplay.module.css';

// this function extracts informations from the individually legs of the travel plan
const ExtractInfo = leg => {
  console.log("Info leg", leg)
  const legMode = 'mode' in leg ? leg.mode : '';
  const time = 'duration' in leg ? leg.duration : '';
  console.log("Modus", legMode);
  console.log("duration", time);
  return `${legMode}`;
};

export default function TripDisplay({ planBicycle, planCar, planTransit }) {
  const [show, setShow] = useState(false); // hook to show the details of the trip

  // if the user clicks on a trip then more details are shown and the route is displayed on the map
  const onSuggestHandler = () => {
    setShow(!show);
  };

  if (
    typeof planTransit != 'undefined' &&
    typeof planCar != 'undefined' &&
    typeof planBicycle != 'undefined' &&
    Object.keys(planTransit).length > 0 &&
    Object.keys(planCar).length > 0 &&
    Object.keys(planBicycle).length > 0
  ) {
    // just show this element if all informations are fetched (maybe there is a shorter way to express that?)
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
            <img src="transit_icon.png" alt="transit icon" />
            <div className={Styles.trip_time}>
              {`${Math.round(planTransit.itineraries?.[0]?.duration / 60)} min`}
            </div>
          </div>
          <div className={Styles.trip_overview}>
            <div className={Styles.circle}></div>

            {planTransit.itineraries?.[1]?.legs.map((leg, index) => (
              <>
              <ExtractInfo leg={leg}/>
                <div className={`${Styles.mode} line`} key={index}>
                  test
                </div>
              </>
            ))}

            {/* <div className={Styles.line}></div> */}
            <div className={Styles.circle}></div>
          </div>
        </div>
        {show && <div className={Styles.trip_details}>show it!!!</div>}
      </>
    );
  }
  return null;
}
