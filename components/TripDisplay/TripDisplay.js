import { useState, Fragment } from 'react';
import Styles from './TripDisplay.module.css';

// function to extract Date (old format: Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time), new format day/month/year)
const extractJustDate = date => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let year = date.getFullYear();
  let day = date.getDate();
  let month_name = month[date.getMonth()];
  return `${day}/${month_name}/${year}`;
};

// function to extract Time (old format: Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time), new format hour:minutes)
const extractJustTime = date => {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  console.log(typeof minutes);
  if (minutes.toString().length < 2) {
    minutes = `${0}${minutes}`;
  }
  return `${hour}:${minutes}`;
};

// this function extracts informations from the individually legs of the travel plan
const extractInfo = info => {
  console.log('Info leg', info);
  const mode = 'mode' in info ? info.mode : 'unavailable';
  const time = 'duration' in info ? info.duration : 'unavailable';
  console.log('duration', time);
  console.log('mode', mode);
  return 'test';
};

export default function TripDisplay({
  planBicycle,
  planCar,
  planTransit,
  startLocationInput,
  endLocationInput,
}) {
  const [show, setShow] = useState(false); // hook to show the details of the trip

  // some features of the trip !No1!:
  const duration = planTransit.itineraries?.[1]?.duration; // duration transit trip No1 in sec
  const startTimeFull = new Date( // startTime transit trip No1 (format: eg. Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time))
    parseInt(planTransit.itineraries?.[1]?.startTime)
  );
  const endTimeFull = new Date(parseInt(planTransit.itineraries?.[1]?.endTime)); // endTime transit trip No1 (format: eg. Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time))
  const transfers = planTransit.itineraries?.[1]?.transfers; // transfers of transit trip No1

  const date = extractJustDate(startTimeFull); // in day/month/year
  const startTime = extractJustTime(startTimeFull); // in h:min
  const endTime = extractJustTime(endTimeFull); // in h:min

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

          {/* trip outline */}
          <div className={Styles.trip_outline}>
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

        {/* {show && ( // if show is true then more details are shown*/}
        <div className={Styles.connection_details}>
          {/* a short summary of the connection follows */}
          <div className={Styles.connection_info}>
            <div className={Styles.connection_header}>
              <div className={Styles.connection_date}> {`${date}`} </div>
              <div className={Styles.connection_time_and_location}>
                <div className={Styles.times}>
                  <div className={Styles.connection_departure}>
                    {`${startTime}`}
                  </div>
                  <div className={Styles.connection_arrival}>
                    {`${endTime}`}
                  </div>
                </div>
                <div className={Styles.connection_locations}>
                  <div>{`${startLocationInput}`}</div>
                  <div>{`${endLocationInput}`}</div>
                </div>
              </div>
              <div className={Styles.connection_summary}>
                <span className={Styles.icon_transportation}>
                  <img src="transit_icon.svg" alt="transit icon" />
                </span>
                <span className={Styles.connection_duration}>
                  <span className={Styles.icon_clock}>
                    <img src="clock_icon.svg" alt="clock icon" />
                  </span>
                  {`${Math.round(duration / 60)} min`}
                </span>
                <span className={Styles.connection_interchanges}>
                  <span className={Styles.icon_transfer}>
                    <img src="transfer_icon.svg" alt="transfer icon" />
                  </span>
                  {`${transfers}${transfers != 1 ? ' Umstiege' : ' Umstieg'}`}
                </span>
              </div>
            </div>
          </div>

          {/* a detailed outline of the connection follows */}
          <div className={Styles.connection_journey}>
            {planTransit.itineraries?.[1]?.legs.map((leg, index) => {
              //extractInfo(leg);
              //console.log('Mode inside JSX: ', leg.mode);
              return (
                <Fragment key={index}>
                  <div className={Styles.journey_details}>
                    <div className={Styles.journey_header}>
                      <div className={Styles.top_border}></div>
                      <div className={Styles.journey_icon_container}>
                        <img
                          className={Styles.journey_icon}
                          src={
                            leg.mode == 'WALK'
                              ? 'walk_icon.svg'
                              : 'transit_icon.svg'
                          }
                          alt="transportation icon"
                        />
                      </div>
                    </div>

                    <div className={Styles.first_stop}>
                      <div className={Styles.stop_past}>
                        <div className={Styles.time}>
                          <span className={Styles.past}>16:00</span>
                        </div>
                        <div className={Styles.delay}></div>
                        <div className={Styles.station}>Grindelhof</div>
                      </div>
                    </div>
                    <div className={Styles.journey_direction}>
                      <span className={Styles.direction}>
                        <span className={Styles.icon_arrow}>
                          <img src="arrow_icon.svg" alt="arrow icon" />
                          Hauptbahnhof Hbf/ZOB
                        </span>
                      </span>
                    </div>
                    <div className={Styles.journey_intermediate_stops}>
                      Fahrt 1 Station (4min)
                    </div>
                    <div className={Styles.last_stop}>
                      <div className={Styles.stop_past}>
                        <div className={Styles.time}>
                          <span className={Styles.past}>16:30</span>
                        </div>
                        <div className={Styles.delay}></div>
                        <div className={Styles.station}>Bf. Dammtor</div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        {/*    )} */}
      </>
    );
  }
  return null;
}
