import { useState } from "react";
import Styles from "./SearchInput.module.css";
import axios from "axios";

export default function SearchInput({ start, setStart, end, setEnd }) {
  // TODO: setStart und setEnd muss aus den Input Feldern stammen
  // TODO: Input Felder sollen Orte sein, welche von einer Funktion in Koordinaten ("lat,lon") umgewandelt werden
  // TODO: beim Drücken vom Submit Button muss Input Felder resettet werden
  // TODO: immer, wenn Submit Button gedrückt wird, muss Funktion ShowTravelPLan neu aufgerufen werden

  const [input_start_place, setInputStartPlace] = useState("");
  const [input_end_place, setInputEndPlace] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // fetch data from Nominatim geocoding
    const fetchItems = async () => {
      const result = await axios(
        `https://nominatim.openstreetmap.org/search?q=${input_start_place}`
      );
      console.log(result.data);
    };
    fetchItems();

    //nominatim.openstreetmap.org/search?<params>

    setStart("53.552719,10.005607");
    setEnd("53.54145079524408,9.98413080586419");
  };

  return (
    <section className={Styles.search}>
      <form className={Styles.search_fields} onSubmit={handleSubmit}>
        <input
          type="text"
          className="input_field"
          id="start"
          name="start"
          value={input_start_place}
          onChange={(event) => setInputStartPlace(event.target.value)}
          //TODO: Autocomplete bei OnChange
          placeholder="from ..."
        ></input>
        <input
          type="text"
          className="input_field"
          id="end"
          name="end"
          value={input_end_place}
          onChange={(event) => setInputEndPlace(event.target.value)}
          // TODO: Autocomplete bei OnChange
          placeholder="to ..."
        ></input>
        <button type="submit" className="submit_field">
          Search Routes
        </button>
      </form>
    </section>
  );
}
