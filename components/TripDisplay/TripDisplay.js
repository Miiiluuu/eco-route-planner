import { useState, Fragment } from 'react';
import Styles from './TripDisplay.module.css';

// this function extracts informations from the individually legs of the travel plan
const extractInfo = info => {
  console.log('Info leg', info);
  const mode = 'mode' in info ? info.mode : 'unavailable';
  const time = 'duration' in info ? info.duration : 'unavailable';
  console.log('duration', time);
  console.log('mode', mode);
  return 'test';
};

export default function TripDisplay({ planBicycle, planCar, planTransit }) {
  const [show, setShow] = useState(false); // hook to show the details of the trip
  // some features:
  const duration = planTransit.itineraries?.[1]?.duration; // duration transit trip No1 in sec

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
        {/* display transit trip(s) */}
        <div
          className={Styles.single_trip}
          onClick={() => onSuggestHandler()}
          tabIndex="-1" // By default an <div> element has no focus so onBlur usually doesn't work, this is a workaround but not recommended. Using a button instead would be the right way
          onBlur={() => setShow(false)}
        >
          {/* emission specification */}
          <div className={Styles.icon_leafs}>
            <img src="leaf_icon.png" alt="leaf icon" />
            <img src="leaf_icon.png" alt="leaf icon" />
          </div>

          {/* transportation&time specification */}
          <div className={Styles.icon_transportation_time}>
            <img src="transit_icon.png" alt="transit icon" />
            <div className={Styles.trip_time}>
              {`${Math.round(duration / 60)} min`}
            </div>
          </div>

          {/* trip overview */}
          <div className={Styles.trip_overview}>
            {planTransit.itineraries?.[1]?.legs.map((leg, index) => {
              extractInfo(leg);
              console.log('Mode inside JSX: ', leg.mode);
              return (
                <Fragment key={index}>
                  <div className={Styles.transportation_icon_container}>
                    <img
                      className={Styles.transportation_icon}
                      src={
                        leg.mode == 'WALK'
                          ? 'walk_icon.png'
                          : 'transit_icon.png'
                      }
                      alt="transportation icon"
                    />
                  </div>
                  <div className={`${leg.mode}`}>
                    {/* inline styling with Styled JSX (CSS-in-JS library) */}
                    <style jsx>{`
                      .${leg.mode} {
                        height: 4px;
                        display: flex;
                      }
                    `}</style>
                    {/* the dynamic style has a separate <style jsx> tag so that only the dynamic parts are recomputed when props change. */}
                    <style jsx>{`
                      .${leg.mode} {
                        background-color: ${leg.mode == 'WALK'
                          ? '#e2d784'
                          : '#4CAF50'};
                        width: ${leg.duration}px;
                      }
                    `}</style>
                  </div>
                </Fragment>
              );
            })}
            <div className={Styles.circle}></div>
          </div>
        </div>

        {show && <div className={Styles.trip_details}>show details!!!</div>}
      </>
    );
  }
  return null;
}
