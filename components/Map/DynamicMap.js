import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

export default function DynamicMap() {
  return (
    <div>
      <MapContainer
        className={Styles.map_container}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
