import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to detect map click
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function CampusMap({ locations, onMapClick }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Campus Accessibility Map</h3>

      <MapContainer
       center={[26.502166, 80.274699]}
 // example campus center
       zoom={18}                    // 👈 campus-level clarity
  minZoom={17}
  maxZoom={20}
        className="h-96 w-full rounded"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={onMapClick} />

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.place}</strong>
              <br />
              {loc.description}
              <br />
              <span className="text-sm text-gray-600">
                Type: {loc.type}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
