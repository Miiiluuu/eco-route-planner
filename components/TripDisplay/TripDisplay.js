import Styles from './TripDisplay.module.css';
import DisplayTransitWalk from './DisplayTransitWalk';

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
        <DisplayTransitWalk
          plan={planTransit}
          startLocationInput={startLocationInput}
          endLocationInput={endLocationInput}
        />
      </>
    );
  }
  return null;
}
