import { Polyline, useMap, Marker } from 'react-leaflet';
import polyUtil from 'polyline-encoded';

// in this form just working right for bicycle, car and walking trips
// TODO: ShowTravelPlan executes before all informations/plans are fetched, it would be better if there is like a spinner and the function waits until all OTP datas are fetched..
export default function ShowTravelPlan({ plan, toIcon, fromIcon }) {
  const map = useMap();

  if (typeof plan != 'undefined' && Object.keys(plan).length > 0) {
    const positionFrom = { lat: plan.from.lat, lon: plan.from.lon };
    const positionTo = { lat: plan.to.lat, lon: plan.to.lon };
    const latCenter = plan.to.lat + (plan.from.lat - plan.to.lat) / 2;
    const lonCenter = plan.to.lon + (plan.from.lon - plan.to.lon) / 2;
    const roadCenter = { lat: latCenter, lon: lonCenter };
    map.flyTo(roadCenter, map.getZoom());

    // legGeometry.points holds encoded coordinates (lat, lon) of intermediate steps along the travel plan
    const polypositions = polyUtil.decode(
      plan.itineraries[0].legs[0].legGeometry.points
    );
    // sets Coordinates as Polyline to visualize the travel plan
    return (
      <>
        <Polyline positions={polypositions} />
        <Marker icon={fromIcon} position={positionFrom} />
        <Marker icon={toIcon} position={positionTo} />
      </>
    );
  }

  return null;
}
