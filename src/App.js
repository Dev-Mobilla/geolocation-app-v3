import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // eslint-disable-next-line
import { useEffect, useMemo, useState } from "react";
import SendCoordinatesButton from "./components/SendCoordinatesButton";

function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let geolocation = await navigator.geolocation;
      if (!geolocation) {
        console.log("Permission to access location was denied");
        return;
      }
      await geolocation.watchPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setPermission(true);
      });
    })();
  }, []);

  const showMapContainer = useMemo(() => {
    if (location.latitude && location.longitude) {
      return (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[location.latitude, location.longitude]}
            draggable={true}
          >
            <Popup>
              latitude: {location.latitude}, longitude {location.longitude}
            </Popup>
          </Marker>
        </MapContainer>
      );
    }

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <h1>Please turn on your location and restart the page.</h1>
      </div>
    );
  }, [location, permission]);

  return (
    <div style={{ height: "80vh" }} className={"text-center"}>
      {showMapContainer}
      <SendCoordinatesButton
        latitude={location.latitude}
        longitude={location.longitude}
      />
    </div>
  );
}

export default App;
