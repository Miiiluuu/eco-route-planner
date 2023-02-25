import Map from '../components/Map/Map';
import { useState } from 'react';
import SearchInput from '../components/SearchInput/SearchInput';
import {About} from "../components/About/About";

export default function Home() {
  const [startCoords, setStartCoords] = useState(''); // coordinates in lat,lon
  const [endCoords, setEndCoords] = useState(''); // coordinates in lat,lon

  return (
    <div className="total">
      <h1>Home</h1>
      <SearchInput
        setStartCoords={setStartCoords}
        setEndCoords={setEndCoords}
      />
      <Map start={startCoords} end={endCoords} />
      <About/>
    </div>
  );
}
