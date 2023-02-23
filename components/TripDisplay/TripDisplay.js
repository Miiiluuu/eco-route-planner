import Styles from './TripDisplay.module.css';
import DisplaySingleTrip from './DisplaySingleTrip';

export default function TripDisplay({
  planBicycle,
  planCar,
  planTransit,
  startLocationInput,
  endLocationInput,
}) {
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
        {/* displays trip bicycle */}
        <DisplaySingleTrip
          plan={planBicycle}
          modus="bicycle"
          startLocationInput={startLocationInput}
          endLocationInput={endLocationInput}
        />
        {/* displays (3) transit trips */}
        <DisplaySingleTrip
          plan={planTransit}
          modus="transit"
          startLocationInput={startLocationInput}
          endLocationInput={endLocationInput}
        />
        {/* displays trip by car */}
        <DisplaySingleTrip
          plan={planCar}
          modus="car"
          startLocationInput={startLocationInput}
          endLocationInput={endLocationInput}
        />
      </>
    );
  }
  return null;
}
