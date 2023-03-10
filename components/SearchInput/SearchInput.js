import { useState } from 'react';
import Styles from './SearchInput.module.css';
import axios from 'axios';
import AutoCompleteField from './AutoCompleteField';

export default function SearchInput({ setStartCoords, setEndCoords, setStartLocationInput, setEndLocationInput }) {
  // for geocoding
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  // if you press submit the entered locations will be translated to coordinates (lat,lon)
  const handleSubmit = event => {

    event.preventDefault();

    setStartLocationInput(startLocation); // sets and save the startLocation when the user press submit
    setEndLocationInput(endLocation); // sets and save the endLocation when the user press submit

    // fetch data from photon API for geocoding
    const fetchItemsStartLocation = async () => {
      try {
        const result = await axios(
          `https://photon.komoot.io/api/?q=${startLocation}&limit=1`
        );
        setStartCoords(
          `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
        );
      } catch (error) {
        // TypeError: Failed to fetch
        console.log('There was an error', error);
      }
    };

    const fetchItemsEndLocation = async () => {
      try {
        const result = await axios(
          `https://photon.komoot.io/api/?q=${endLocation}&limit=1`
        );
        setEndCoords(
          `${result.data.features[0].geometry.coordinates[1]},${result.data.features[0].geometry.coordinates[0]}`
        );
      } catch (error) {
        // TypeError: Failed to fetch
        console.log('There was an error', error);
      }
    };

    fetchItemsStartLocation();
    fetchItemsEndLocation();
  };

  return (
    <section className={Styles.search}>
      <form className={Styles.search_fields} onSubmit={handleSubmit}>
        <div className={Styles.input_container}>
          <div className={Styles.autocomp}>
            <AutoCompleteField
              value={startLocation}
              setValue={setStartLocation}
              placeholder="from..."
            />
          </div>

          <div className={Styles.autocomp}>
            <AutoCompleteField
              value={endLocation}
              setValue={setEndLocation}
              placeholder="to..."
            />
          </div>
        </div>
        <button type="submit" className={Styles.submit_field}>
          Plan your trip!
        </button>
      </form>
    </section>
  );
}
