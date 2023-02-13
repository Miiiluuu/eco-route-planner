import Map from "../components/Map/Map";
import { useState } from "react";
import SearchInput from "../components/SearchInput/SearchInput";

export default function Home() {
  const [startCoords, setStartCoords] = useState(''); // coordinates in lat,lon
  const [endCoords, setEndCoords] = useState(''); // coordinates in lat,lon

  return (
    <div>
      <h1>Home</h1>
      <SearchInput setStartCoords={setStartCoords} setEndCoords={setEndCoords} />
      <Map start={startCoords} end={endCoords} />
    </div>
  );
}
