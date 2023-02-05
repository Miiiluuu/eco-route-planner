import { useState } from "react";
import Styles from "./SearchInput.module.css";
import axios from "axios";
import AutoCompleteField from "./AutoCompleteField";

export default function SearchInput({ setStartCoords, setEndCoords }) {
  // for geocoding
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  // if you press submit the entered locations will be translated to coordinates (lat,lon)
  const handleSubmit = (event) => {
    event.preventDefault();

    // fetch data from photon API for geocoding
    const fetchItemsStartLocation = async () => {
      const result = await axios(
        `https://photon.komoot.io/api/?q=${startLocation}&limit=1`
      );
      setStartCoords(
        `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
      );
    };

    const fetchItemsEndLocation = async () => {
      const result = await axios(
        `https://photon.komoot.io/api/?q=${endLocation}&limit=1`
      );
      setEndCoords(
        `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
      );
    };

    fetchItemsStartLocation();
    fetchItemsEndLocation();

    //TODO: Funktion schreiben, um TravelRoute anzuzeigen nach Submit
  };

  return (
    <section className={Styles.search}>
      <form className={Styles.search_fields} onSubmit={handleSubmit}>
        <div>
          <AutoCompleteField
            value={startLocation}
            setValue={setStartLocation}
            placeholder="from..."
          />
          <AutoCompleteField
            value={endLocation}
            setValue={setEndLocation}
            placeholder="to..."
          />
        </div>
        <button type="submit" className={Styles.submit_field}>
          Search Routes
        </button>
      </form>
    </section>
  );
}
