import Map from "../components/Map/Map";
import { useState } from "react";
import SearchInput from "../components/SearchInput/SearchInput";

export default function Home() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <div>
      <h1>Home</h1>
      <SearchInput start={start} setStart={setStart} end={end} setEnd={setEnd} />
      <Map start={start} end={end} />
    </div>
  );
}
