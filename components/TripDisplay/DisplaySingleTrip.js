import { useState, Fragment } from 'react';
import Styles from './TripDisplay.module.css';

// function to extract Date (old format is integer value representing the number of milliseconds since January 1, 1970, 00:00:00 UTC, new format is day/month/year)
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
  const date_full = new Date(parseInt(date)); // changes format to eg. Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time))
  let year = date_full.getFullYear();
  let day = date_full.getDate();
  let month_name = month[date_full.getMonth()];
  return `${day}/${month_name}/${year}`;
};

// function to extract Time (old format is integer value representing the number of milliseconds since January 1, 1970, 00:00:00 UTC, new format is hour:minutes)
const extractJustTime = date => {
  const date_full = new Date(parseInt(date)); // changes format to eg. Tue Feb 21 2023 15:08:59 GMT+0100 (Central European Standard Time))
  let hour = date_full.getHours();
  let minutes = date_full.getMinutes();
  if (minutes.toString().length < 2) {
    minutes = `${0}${minutes}`;
  }
  return `${hour}:${minutes}`;
};

// if the user clicks on a trip then more details are shown (and the route is displayed on the map)
const onSuggestHandler = (show, setShow) => {
  setShow(!show);
};

export default function DisplaySingleTrip({
  plan,
  modus,
  emissions,
  startLocationInput,
  endLocationInput,
}) {
  const [showTripOne, setShowTripOne] = useState(false); // hook to show the details of the trip No1
  const [showTripTwo, setShowTripTwo] = useState(false); // hook to show the details of the trip No2
  const [showTripTree, setShowTripTree] = useState(false); // hook to show the details of the trip No3

  const show = [showTripOne, showTripTwo, showTripTree]; //used array to address the right hook inside map()
  const setShow = [setShowTripOne, setShowTripTwo, setShowTripTree]; //used array to address the right hook inside map()

  console.log('INSIDE SingleTrip Bicycle', emissions);

  return (
    <>
      {plan?.itineraries?.map((itinerary, index) => {
        return (
          <Fragment key={index}>
            <div
              className={Styles.single_trip}
              onClick={() => onSuggestHandler(show[index], setShow[index])}
              tabIndex="-1" // By default an <div> element has no focus so onBlur usually doesn't work, this is a workaround but not recommended. Using a button instead would be the right way
              /* onBlur={() => setShow(false)} */
            >
              {/* emission specification */}
              <div className={Styles.icon_leafs}>
                {emissions[index][0][2] == 'first' ? ( // the trip with the lowest emission will get tree leafs
                  <>
                    <img src="leaf_icon.png" alt="leaf icon" />
                    <img src="leaf_icon.png" alt="leaf icon" />
                    <img src="leaf_icon.png" alt="leaf icon" />
                  </>
                ) : emissions[index][0][2] == 'second' ? ( // the trip with the second lowest emission will get two leafs
                  <>
                    <img src="leaf_icon.png" alt="leaf icon" />
                    <img src="leaf_icon.png" alt="leaf icon" />
                  </>
                ) : emissions[index][0][2] == 'third' ? ( // the trip with the third lowest emission will get one leaf
                  <>
                    <img src="leaf_icon.png" alt="leaf icon" />
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* time specification */}
              <div className={Styles.icon_transportation_time}>
                <div className={Styles.trip_time}>
                  {`${extractJustTime(itinerary?.startTime)}`}
                </div>
                <div className={Styles.trip_time}>
                  {`${extractJustTime(itinerary?.endTime)}`}
                </div>
              </div>

              {/* duration specification */}
              <div className={Styles.trip_time}>
                {`${Math.round(itinerary.duration / 60)} min`}
              </div>

              {/* trip outline */}
              <div className={Styles.trip_outline}>
                {itinerary?.legs?.map((leg, index) => {
                  return (
                    <Fragment key={index}>
                      <div className={Styles.transportation_icon_container}>
                        <img
                          className={Styles.transportation_icon}
                          src={
                            leg.mode == 'WALK'
                              ? 'walk_icon.png'
                              : leg.mode == 'CAR'
                              ? 'car_icon.png'
                              : leg.mode == 'BICYCLE'
                              ? 'bicycle_icon.png'
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
                              : leg.mode == 'CAR'
                              ? '#ED6B5B'
                              : leg.mode == 'BICYCLE'
                              ? '#4971e7'
                              : '#4CAF50'};
                            width: ${leg.distance}px;
                          }
                        `}</style>
                      </div>
                    </Fragment>
                  );
                })}
                <div className={Styles.circle}></div>
              </div>
            </div>

            {show[index] && ( // if show is true then more details are shown
              <div className={Styles.connection_details}>
                {/* a short summary of the connection follows */}
                <div className={Styles.connection_info}>
                  <div className={Styles.connection_header}>
                    <div className={Styles.connection_date}>
                      {`${extractJustDate(itinerary?.startTime)}`}
                    </div>
                    <div className={Styles.connection_time_and_location}>
                      <div className={Styles.times}>
                        <div className={Styles.connection_departure}>
                          {`${extractJustTime(itinerary?.startTime)}`}
                        </div>
                        <div className={Styles.connection_arrival}>
                          {`${extractJustTime(itinerary?.endTime)}`}
                        </div>
                      </div>
                      <div className={Styles.connection_locations}>
                        <div>{`${startLocationInput}`}</div>
                        <div>{`${endLocationInput}`}</div>
                      </div>
                    </div>
                    <div className={Styles.connection_summary}>
                      <span className={Styles.icon_transportation}>
                        <img
                          src={
                            itinerary.transitTime != 0
                              ? 'transit_icon.svg'
                              : modus == 'car'
                              ? 'car_icon.svg'
                              : modus == 'bicycle'
                              ? 'bicycle_icon.svg'
                              : 'walk_icon.svg'
                          }
                          alt="transportation icon"
                        />
                      </span>
                      <span className={Styles.connection_duration}>
                        <span className={Styles.icon_clock}>
                          <img src="clock_icon.svg" alt="clock icon" />
                        </span>
                        {`${Math.round(itinerary.duration / 60)} min`}
                      </span>
                      <span className={Styles.connection_interchanges}>
                        <span className={Styles.icon_transfer}>
                          <img src="transfer_icon.svg" alt="transfer icon" />
                        </span>
                        {`${itinerary.transfers}${
                          itinerary.transfers != 1 ? ' transfers' : ' transfer'
                        }`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* a detailed outline of the connection follows */}
                <div className={Styles.connection_journey}>
                  {itinerary?.legs.map((leg, index) => {
                    return (
                      <Fragment key={index}>
                        <div className={`${leg.mode}`}>
                          {/* inline styling with Styled JSX (CSS-in-JS library) */}
                          <style jsx>{`
                            .${leg.mode} {
                              border-left: ${leg.mode == 'WALK'
                                ? '5px solid #e2d784'
                                : leg.mode == 'CAR'
                                ? '5px solid #ED6B5B'
                                : leg.mode == 'BICYCLE'
                                ? '5px solid #4971e7'
                                : '5px solid #4CAF50'};
                            }
                          `}</style>
                          <div className={Styles.journey_header}>
                            <div className={Styles.journey_icon_container}>
                              <img
                                className={Styles.journey_icon}
                                src={
                                  leg.mode == 'WALK'
                                    ? 'walk_icon.png'
                                    : leg.mode == 'CAR'
                                    ? 'car_icon.png'
                                    : leg.mode == 'BICYCLE'
                                    ? 'bicycle_icon.png'
                                    : 'transit_icon.png'
                                }
                                alt="transportation icon"
                              />
                            </div>
                            <div className={Styles.top_border}></div>
                          </div>
                          <div className={Styles.first_stop}>
                            <div className={Styles.stop_past}>
                              <div className={Styles.time}>
                                <span className={Styles.past}>
                                  {`${extractJustTime(leg.startTime)}`}{' '}
                                </span>
                              </div>
                              <div className={Styles.delay}></div>
                              <div className={Styles.station}>{`${
                                leg.from.name == 'Origin'
                                  ? startLocationInput
                                  : leg.from.name
                              }`}</div>
                            </div>
                          </div>
                          {leg.transitLeg ? (
                            <div className={Styles.transit_specific_details}>
                              <div className={Styles.journey_direction}>
                                <span className={Styles.direction}>
                                  <span className={Styles.icon_arrow}>
                                    <img
                                      src="arrow_icon.svg"
                                      alt="arrow icon"
                                    />
                                    <span className={Styles.route_short_name}>
                                      {leg.routeShortName}
                                    </span>
                                    {leg.headsign}
                                  </span>
                                </span>
                              </div>
                              <div
                                className={Styles.journey_intermediate_stops}
                              >
                                {`${leg.mode} (${
                                  leg.intermediateStops.length + 1
                                } ${
                                  leg.intermediateStops.length != 0
                                    ? ' stations'
                                    : ' station'
                                } / ${Math.round(leg.duration / 60)} min)`}
                              </div>
                            </div>
                          ) : (
                            <div
                              className={
                                Styles.walk_car_bicycle_specific_details
                              }
                            >
                              <div
                                className={Styles.journey_walk_specification}
                              >
                                {`${leg.mode} (${Math.round(
                                  leg.distance
                                )} m / ${Math.round(leg.duration / 60)} min)`}
                              </div>
                            </div>
                          )}
                          <div className={Styles.last_stop}>
                            <div className={Styles.stop_past}>
                              <div className={Styles.time}>
                                <span
                                  className={Styles.past}
                                  r
                                >{`${extractJustTime(leg.endTime)}`}</span>
                              </div>
                              <div className={Styles.delay}></div>
                              <div className={Styles.station}>{`${
                                leg.to.name == 'Destination'
                                  ? endLocationInput
                                  : leg.to.name
                              }`}</div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                  <div className={Styles.circle_black}></div>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
