import { useState } from 'react';
import Styles from './TripDisplay.module.css';

export default function TripDisplay({ start, end }) {
  const [show, setShow] = useState(false);

  // if the user clicks on a trip then more details are shown and the route is displayed on the map
  const onSuggestHandler = () => {
    setShow(true);
  };

  return (
    <>
      <div
        className={Styles.single_trip}
        onClick={() => onSuggestHandler()}
        tabindex="-1" // By default an <div> element has no focus so onBlur usually doesn't work, this is a workaround but not recommended. Using a button instead would be the right way
        onBlur={() => setShow(false)}
      >
        <div className={Styles.icon_leafs}>Blätter</div>
        <div className={Styles.icon_transportation}>Verkehrsmittel</div>
        <div className={Styles.trip_line}>
          <div className={Styles.circle}></div>
          <div className={Styles.line}></div>
          <div className={Styles.circle}></div>
        </div>
      </div>
      {show && <div className={Styles.trip_details}>show it!!!</div>}
    </>
  );
}
