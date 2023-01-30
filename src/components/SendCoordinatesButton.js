import axios from "axios";
import React, { useState } from "react";

function SendCoordinatesButton({ latitude, longitude }) {
  const [branchName, setBranchName] = useState(null);
  const [brachCode, setBranchCode] = useState(null);

  return (
    <div>
      <form className={"w-full max-w-lg"}>
        <div className={"flex flex-wrap -mx-3 mb-6"}>
          <div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
            <label
              className={
                "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              }
            >
              Branch Name
            </label>
            <input
              className={
                "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              }
              id="grid-first-name"
              type="text"
              placeholder="Branch Name"
              onChange={(e) => {
                setBranchName(e.target.value);
              }}
            />
          </div>
          <div className={"w-full md:w-1/2 px-3"}>
            <label
              className={
                "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              }
            >
              Branch Code
            </label>
            <input
              className={
                "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              }
              id="grid-last-name"
              type="text"
              placeholder="Branch Code"
              onChange={(e) => {
                setBranchCode(e.target.value);
              }}
            />
          </div>
          <div className={"w-full md:w-1/2 px-3"}>
            <button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
              }
              type="button"
              onClick={() => {
                if (branchName && brachCode) {
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
                      BranchName: branchName,
                      BranchCode: brachCode,
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
                  }
                } else {
                  alert("Please fill all inputs.");
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
