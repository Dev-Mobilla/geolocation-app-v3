import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // eslint-disable-next-line
import { useEffect, useMemo, useState } from "react";
// import SendCoordinatesButton from "./SendCoordinatesButton";

function MapComponent({longitude, latitude}) {
//   const [location, setLocation] = useState({
//     latitude: latitude,
//     longitude: longitude,
//   });

//   useEffect(() => {
//     (async () => {
//       let geolocation = await navigator.geolocation;
//       if (!geolocation) {
//         console.log("Permission to access location was denied");
//         return;
//       }
//       await geolocation.watchPosition((position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       });
//     })();
//   }, []);

  const showMapContainer = useMemo(() => {
    if (latitude && longitude) {
      return (
        <MapContainer
          center={[latitude, longitude]}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "100%", width:'96%', maxWidth:'100%', margin:'0px 16px 0px 16px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[latitude, longitude]}
            draggable={true}
          >
            <Popup>
              latitude: {latitude}, longitude {longitude}
            </Popup>
          </Marker>
        </MapContainer>
      );
    }

    return (
    //   <div style={{ height: "100vh", width: "100vw" }}>
        <h3>Please turn on your location and restart the page.</h3>
    //   </div>
    );
  }, [longitude, latitude]);

  return (
    <div style={{ height: "70vh" }} className={"text-center"}>
      {showMapContainer}
      {/* <SendCoordinatesButton
        latitude={location.latitude}
        longitude={location.longitude}
      /> */}
    </div>
  );
}

export default MapComponent;
