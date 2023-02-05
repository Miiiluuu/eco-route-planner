import { useState } from "react";
import Styles from "./SearchInput.module.css";
import axios from "axios";

export default function SearchInput({ value, setValue, placeholder }) {
  // for Autocomplete

  const placeMapperHelper = (p) => {
    const name = "name" in p ? p.name + ", " : "";
    const city = "city" in p ? p.city + ", " : "";
    const street = "street" in p ? p.street + ", " : "";
    const country = "country" in p ? p.country : "";
    console.log(p)
    return `${name}${city}${street}${country}`;
    
  };

  const [suggestions, setSuggestions] = useState([]);

  const onChangeHandler = (input) => {
    setValue(input);
    if (input.length > 3) {
      const fetchItems = async () => {
        let result = await axios(
          `https://photon.komoot.io/api/?q=${input}&limit=5`
        );

        const features = result.data.features;

        if (features.length > 0) {
          const sugg = features.map((f) => placeMapperHelper(f.properties));
          setSuggestions(sugg);
        }
      };
      fetchItems();
    }
  };

  const onSuggestHandler = (input) => {
    setValue(input);
    setSuggestions([]);
  };

  return (
    <>
      <input
        type="text"
        className={Styles.input_field}
        value={value}
        onChange={(event) => onChangeHandler(event.target.value)}
        placeholder={placeholder}
        required
        //onBlur={() => setSuggestions([])}
      />
      {suggestions &&
        suggestions.map((i) => (
          <div className={Styles.suggestion} onClick={() => onSuggestHandler(i)}>
            {i}
          </div>
        ))}
    </>
  );
}
