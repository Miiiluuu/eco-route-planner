import { useState } from 'react';
import Styles from './SearchInput.module.css';
import axios from 'axios';

// this function sets the AutoComplete Suggestions in a readable format
const placeMapperHelper = p => {
  const name = 'name' in p ? p.name + ', ' : '';
  const city = 'city' in p ? p.city + ', ' : '';
  const street = 'street' in p ? p.street + ', ' : '';
  const country = 'country' in p ? p.country : '';
  return `${name}${city}${street}${country}`;
};

export default function AutoCompleteField({ value, setValue, placeholder }) {
  const [suggestions, setSuggestions] = useState([]); // List of Autocomplete suggestions
  const [keepListOpen, setKeepListOpen] = useState(false); // necessary for clicking somewhere that is not the suggest field
  const [oldInput, setOldInput] = useState(''); // keep the previous  input for comparison with new input (for API throttling)

  // if the input text changes, new suggestions for AutoComplete are fetched
  const onChangeHandler = input => {
    setValue(input);
    // to avoid too many API calls datas are only fetched after the user entered > 3 letters, also if the user deletes letters there will be no fetching (API throttling)
    if (input.length > 3 && input.length > oldInput.length) {
      const fetchSuggestions = async () => {

        try {
          let result = await axios(
            // API call contains location bias (hamburg airport), number of results is limited to 5
            `https://photon.komoot.io/api/?q=${input}&limit=5&lat=53.63&lon=9.99`
          );
          const features = result.data.features;
          //console.log(features)
          if (features.length > 0) {
            // 0 features occurs when no places are found
            const sugg = features.map(f => placeMapperHelper(f.properties));
            // Set() will remove repeating list elements of suggestions
            setSuggestions([...new Set(sugg)]);
          }
        } catch (error) {
          // TypeError: Failed to fetch
          console.log('There was an error', error);

        }
      };

      fetchSuggestions();
    }
    setOldInput(input);
  };

  // if the user selects a suggestion in the drop down, this element will be used as input and the suggestion list will be emptied
  const onSuggestHandler = input => {
    setValue(input);
    setSuggestions([]);
    setKeepListOpen(false); // for onBlur
  };

  // if the user leaves the input field (clicks somewhere else) the suggestion list will be emptied as well
  const onBlurHandler = () => {
    if (!keepListOpen) {
      setSuggestions([]);
    }
  };

  return (
    <div className={Styles.autocomp_container}>
      <input
        type="text"
        className={Styles.input_field}
        value={value}
        onChange={event => onChangeHandler(event.target.value)}
        placeholder={placeholder}
        required
        onBlur={() => onBlurHandler()}
      />

      <div className={Styles.suggestion_container}>
        {/* each suggestion will be displayed as <div> element underneath the input field */}
        {suggestions /* if there are no suggestions nothing will appear*/ &&
          suggestions.map((suggestion, index) => (
            <div
              className={Styles.suggestion}
              onMouseDown={() => setKeepListOpen(true)}
              onClick={() => onSuggestHandler(suggestion)}
              key={index}
            >
              {suggestion}
            </div>
          ))}
      </div>
    </div>

  );
}
