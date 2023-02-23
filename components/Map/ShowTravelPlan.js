import { Polyline, useMap, Marker } from "react-leaflet";
import polyUtil from "polyline-encoded";

export default function ShowTravelPlan({ plan, toIcon, fromIcon }) {
  console.log("ShowTravelPlan: ", plan);
  if (typeof plan != "undefined" && Object.keys(plan).length > 0) {
    const map = useMap();
    const positionFrom = { lat: plan.from.lat, lon: plan.from.lon };
    const positionTo = { lat: plan.to.lat, lon: plan.to.lon };
    const latCenter = plan.to.lat + (plan.from.lat - plan.to.lat) / 2;
    const lonCenter = plan.to.lon + (plan.from.lon - plan.to.lon) / 2;
    const roadCenter = { lat: latCenter, lon: lonCenter };
    map.flyTo(roadCenter, map.getZoom());

    /*     if (positionFrom === null) {
      return null;
    } */

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
