// leaflet cannot use server-side-rendering, so we have to set ssr to 'false'
// to configure the map go to DynamicMaps.js, that's 'the real map'
import dynamic from "next/dynamic";
const DynamicMap = dynamic(() => import("./DynamicMap"), { ssr: false });

export default function Map() {
    return <DynamicMap/>;
}