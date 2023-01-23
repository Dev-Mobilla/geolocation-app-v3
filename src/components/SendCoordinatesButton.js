import axios from "axios";
import React from "react";

function SendCoordinatesButton({ latitude, longitude }) {
  return (
    <button
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
      }
      type="button"
      style={{
        zIndex: 100,
        bottom: "3vh",
      }}
      onClick={() => {
        alert(
          "Coordinates:\n" +
            "Latitude: " +
            latitude +
            "\nLongitude: " +
            longitude
        );

        const data = {
          Latitude: latitude,
          Longitude: longitude,
          Radius: "Example",
        };
        axios
          .post(
            "https://sheet.best/api/sheets/4c7f0e06-db0a-42b1-b025-a0de38616728",
            data
          )
          .then((respose) => {
            console.log(respose);
          });
      }}
    >
      Click
    </button>
  );
}

export default SendCoordinatesButton;
