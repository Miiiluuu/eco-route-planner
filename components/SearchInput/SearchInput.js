import { useState } from "react";
import Styles from "./SearchInput.module.css";
import axios from "axios";
import AutocompleteField from "./AutocompleteField";

export default function SearchInput({ setStart, setEnd }) {

  // hooks for geocoding
  const [input_start_place, setInputStartPlace] = useState("");
  const [input_end_place, setInputEndPlace] = useState("");
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // fetch data from Nominatim for geocoding
    const fetchItems = async () => {
      let result = await axios(
        `https://photon.komoot.io/api/?q=${input_start_place}&limit=1`
      );

      setStart(
        `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
      );

      result = await axios(
        `https://photon.komoot.io/api/?q=${input_end_place}&limit=1`
      );
      console.log(result.data);

      setEnd(
        `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
      );
    };

    fetchItems();

//TODO: Funktion schreiben, um TravelRoute anzuzeigen

  };

  return (
    <section className={Styles.search}>
      <form className={Styles.search_fields} onSubmit={handleSubmit}>
        <div>
          <AutocompleteField
            value={input_start_place}
            setValue={setInputStartPlace}
            placeholder="from..."
          />
          <AutocompleteField
            value={input_end_place}
            setValue={setInputEndPlace}
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
