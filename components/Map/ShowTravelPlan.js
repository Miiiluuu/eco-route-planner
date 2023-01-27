import {useMapEvents, Polyline,} from "react-leaflet";
import polyUtil from "polyline-encoded";
import L from "leaflet";
import { useState } from "react";

export default function ShowTravelPlan({plan, toIcon, fromIcon}) {
    
    const [positionFrom, setPositionFrom] = useState(null);
    const [positionTo, setPositionTo] = useState(null);

    // if you click on the map you will fly to the middle of the travel plan
    const map = useMapEvents({
      click() {
        if (plan != {}) {
          console.log("PLAN:", plan);
          const fromLocation = { lat: plan.from.lat, lon: plan.from.lon };
          const toLocation = { lat: plan.to.lat, lon: plan.to.lon };
          const latCenter = plan.to.lat + (plan.from.lat - plan.to.lat)/2
          const lonCenter = plan.to.lon + (plan.from.lon - plan.to.lon)/2
          const roadCenter = {lat: latCenter, lon: lonCenter};
          setPositionFrom(fromLocation);
          setPositionTo(toLocation);
          console.log(fromLocation);
          console.log(roadCenter);
          map.flyTo(roadCenter, map.getZoom());
        }
      },
    });

    if (positionFrom === null) {
      return null;
    }

    //adds markers to the start and stop coordinates of the travel plan
    new L.marker(positionFrom, { icon: fromIcon }).addTo(map);
    new L.marker(positionTo, { icon: toIcon }).addTo(map);

    // legGeometry.points holds encoded coordinates (lat, lon) of intermediate steps along the travel plan
    const polypositions = polyUtil.decode(
      plan.itineraries[0].legs[0].legGeometry.points
    );
    console.log(polypositions);

    // sets Coordinates as Polyline to visualize the travel plan
    return <Polyline positions={polypositions} />;
  }