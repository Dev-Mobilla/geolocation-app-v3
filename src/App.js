import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // eslint-disable-next-line
import { useEffect, useMemo, useState } from "react";

function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

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
      });
    })();
  }, []);

  const showMapCOntainer = useMemo(() => {
    if (location.latitude && location.longitude) {
      return (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100vw" }}
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
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      );
    }

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <h1>Loading...</h1>
      </div>
    );
  }, [location]);

  return <div>{showMapCOntainer}</div>;
}

export default App;
