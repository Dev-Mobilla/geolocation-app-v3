import axios from "axios";
import React from "react";

function SendCoordinatesButton({ latitude, longitude }) {
  return (
    <div>
      <form className={"w-full max-w-lg"}>
        <div className={"flex flex-wrap -mx-3 mb-6"}>
          <div className={"w-full md:w-1/2 px-3"}>
            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
              }
              type="button"
              onClick={() => {
                if (latitude && longitude) {
                  if (
                    window.confirm(
                      "Coordinates:\n" +
                        "Latitude: " +
                        latitude +
                        "\nLongitude: " +
                        longitude
                    )
                  ) {
                    const data = {
                      Latitude: latitude,
                      Longitude: longitude,
                    };
                    axios
                      .post(
                        "https://sheet.best/api/sheets/4c7f0e06-db0a-42b1-b025-a0de38616728",
                        data
                      )
                      .then((respose) => {
                        console.log(respose);
                      });
                    alert("Location Saved");
                    window.location.replace(
                      "https://forms.gle/GFVxJ1rYXaCQSuQU6"
                    );
                  }
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendCoordinatesButton;
