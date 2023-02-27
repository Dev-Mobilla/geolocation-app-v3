import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // eslint-disable-next-line
import { useEffect, useMemo, useState } from "react";
// import SendCoordinatesButton from "./SendCoordinatesButton";

function MapComponent({ longitude, latitude }) {
  //   const [location, setLocation] = useState({
  //     latitude: latitude,
  //     longitude: longitude,
  //   });



  const showMapContainer = useMemo(() => {
    if (latitude && longitude) {
      return (
        <>
          <div className="ml-5 mr-5 mb-3">
            <p style={{ marginBottom: '0.25rem', textAlign: 'justify' }}> 1. Walk to the main entrance door of your branch.</p>
            <p style={{ marginBottom: '0.25rem', textAlign: 'justify' }}>2. Use your smartphone to access: <b>branchlocator.mlhuillier.net</b></p>
            <p style={{ marginBottom: '0.25rem', textAlign: 'justify' }}>3. The location pin of your branch will automatically appear.</p>
            <p style={{ marginBottom: '0.25rem', textAlign: 'justify' }}>4. Press "Submit Location" at the bottom of the page.</p>
          </div>
          <MapContainer
            center={[latitude, longitude]}
            zoom={20}
            scrollWheelZoom={false}
            style={{ height: "100%", width: '96%', maxWidth: '100%', margin: '0px 16px 0px 9px' }}
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
        </>
      );
    } else {

      return (
        //   <div style={{ height: "100vh", width: "100vw" }}>
        <h3 className="m-2">Please turn on your location and restart the page.</h3>
        //   </div>
      );
    }

  }, [longitude, latitude]);

  return (
    <div style={{ height: "60vh" }} className="text-center mb-5">
      {showMapContainer}
      {/* <SendCoordinatesButton
        latitude={location.latitude}
        longitude={location.longitude}
      /> */}
    </div>
  );
}

export default MapComponent;
