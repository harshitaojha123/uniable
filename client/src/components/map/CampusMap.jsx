
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons in Vite.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Capture coordinates when the user clicks the map.
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      if (typeof onMapClick === "function") {
        onMapClick({
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        });
      }
    },
  });

  return null;
}

export default function CampusMap({
  locations = [],
  onMapClick,
}) {
  const validLocations = locations.filter(
    (loc) =>
      loc.lat != null &&
      loc.lng != null &&
      Number.isFinite(Number(loc.lat)) &&
      Number.isFinite(Number(loc.lng))
  );

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">
        Campus Accessibility Map
      </h3>

      <MapContainer
        center={[26.502166, 80.274699]}
        zoom={17}
        minZoom={3}
        maxZoom={20}
        scrollWheelZoom={true}
        className="h-96 w-full rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={onMapClick} />

        {validLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={[
              Number(loc.lat),
              Number(loc.lng),
            ]}
          >
            <Popup>
              <div className="min-w-40">
                <strong>
                  {loc.place || loc.name || "Campus location"}
                </strong>

                <p className="mt-1">
                  {loc.description || "No description provided"}
                </p>

                <p className="text-sm">
                  Type: {loc.type || "General"}
                </p>

                <p className="text-sm">
                  Status: {loc.resolved ? "Resolved" : "Pending"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <p className="mt-3 text-sm text-gray-600">
        Click the map to select a location for a new accessibility
        report. Click an existing marker to view its details.
      </p>
    </div>
  );
}
