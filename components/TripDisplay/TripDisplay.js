import Styles from './TripDisplay.module.css';
import DisplaySingleTrip from './DisplaySingleTrip';

// function to estimate emissions
const estimateEmissions = plan => {
  let trip_emission = 0;
  // emission factor
  const emission_bicycle = 1; //co2 equivalent caused by bicycle, unit per meter
  const emission_car = 3; //co2 equivalent caused by car, unit per meter
  const emission_rail = 2; //co2 equivalent caused by rail, unit per meter
  const emission_subway = 2; //co2 equivalent caused by subway, unit per meter
  const emission_bus = 1.5; //co2 equivalent caused by bus, unit per meter

  plan?.legs?.map(leg => {
    leg.mode == 'WALK' // walking has no emissions, just add emissions if it's not 'WALK'
      ? (trip_emission += 0)
      : leg.mode == 'CAR'
      ? (trip_emission += leg.distance * emission_car)
      : leg.mode == 'BICYCLE'
      ? (trip_emission += leg.distance * emission_bicycle)
      : leg.mode == 'RAIL'
      ? (trip_emission += leg.distance * emission_rail)
      : leg.mode == 'SUBWAY'
      ? (trip_emission += leg.distance * emission_subway)
      : leg.mode == 'BUS'
      ? (trip_emission += leg.distance * emission_bus)
      : console.log('no emission factor specified');
  });

  return trip_emission;
};

// function to calculate plus compare the emissions of transit / car / bicycle trips and to sort the emission values
const calculateEmissions = (planBicycle, planTransit, planCar) => {
  // calculate emissions
  const emission_BicycleTrip = estimateEmissions(planBicycle?.itineraries?.[0]); // unit co2 equivalent
  const emission_TransitTripOne = estimateEmissions(
    planTransit?.itineraries?.[0]
  ); // unit co2 equivalent
  const emission_TransitTripTwo = estimateEmissions(
    planTransit?.itineraries?.[1]
  ); // unit co2 equivalent
  const emission_TransitTripTree = estimateEmissions(
    planTransit?.itineraries?.[2]
  ); // unit co2 equivalent
  const emission_CarTrip = estimateEmissions(planCar?.itineraries?.[0]); // unit co2 equivalent

  // saving emissions in an array
  let sortable = [
    ['BICYCLE', emission_BicycleTrip],
    ['TRANSIT_TRIP_ONE', emission_TransitTripOne],
    ['TRANSIT_TRIP_TWO', emission_TransitTripTwo],
    ['TRANSIT_TRIP_TREE', emission_TransitTripTree],
    ['CAR', emission_CarTrip],
  ];
  // sort this array from lowest to highest value
  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });

  // now encode the ordered emissions in an array ('first' means lowest emissions, 'fifth' means highest emissions)
  let emissions = [
    [sortable[0][0], sortable[0][1], 'first'],
    [sortable[1][0], sortable[1][1], 'second'],
    [sortable[2][0], sortable[2][1], 'third'],
    [sortable[3][0], sortable[3][1], 'fourth'],
    [sortable[4][0], sortable[4][1], 'fifth'],
  ];

  return emissions;
};

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
    // just display this element if all informations are fetched (maybe there is a shorter way to express that?)

    // define emissions of all trips
    const emissions = calculateEmissions(planBicycle, planTransit, planCar);

    const emissonsBicycle = emissions.filter(
      element => element[0] == 'BICYCLE'
    );
    const emissionsTransitTripOne = emissions.filter(
      element => element[0] == 'TRANSIT_TRIP_ONE'
    );
    const emissionsTransitTripTwo = emissions.filter(
      element => element[0] == 'TRANSIT_TRIP_TWO'
    );
    const emissionsTransitTripTree = emissions.filter(
      element => element[0] == 'TRANSIT_TRIP_TREE'
    );
    const emissionsCar = emissions.filter(element => element[0] == 'CAR');

    console.log('FILTERED nach BICYCLE', emissonsBicycle);
    console.log('FILTERED nach CAR', emissionsCar);
    console.log('FILTERED nach Transit No1', emissionsTransitTripOne);
    console.log('FILTERED nach Transit No2', emissionsTransitTripTwo);
    console.log('FILTERED nach Transit No3', emissionsTransitTripTree);

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
