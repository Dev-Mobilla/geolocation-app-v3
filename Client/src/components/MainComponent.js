import React, { useContext, useState } from "react";
import { useEffect } from "react";
import {
  // Col,
  Container,
  // Form,
  Row,
  // Alert,
  // InputGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { DataContext } from "../App";
import BrandImg from "../assets/images/ml-logo.png";
import FormComponent from "../mock/Form";
import MapComponent from "./MapComponent";
// import ZoneComponent from "./ZoneComponent";

function MainComponent() {
  const [location, setLocation] = useState({ longitude: null, latitude: null })

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
        // console.log(position);
      });
    })();
  }, [setLocation, location]);
  // const contextData = useContext(DataContext);
  const [navigateForm, setNavForm] = useState();
  const [sbmLctBtn, setSbmLctBtn] = useState(true);

  const SubmitLocation = () => {
    setNavForm(true)
    setSbmLctBtn(false)
  }

  return (
    <Container className="mt-5 mb-5 mx-auto" style={{ padding: "0px" }}>
      <Card
        style={{ width: "80%", borderTop: "10px solid red" }}
        className="mx-auto"
      >
        <div
          className="mt-5 mb-3"
          style={{
            textDecorationLine: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <Image src={BrandImg} width="38%" style={{ maxWidth: "100%" }} />
        </div>
        <br />
        {
          navigateForm ?
            <FormComponent location={location}/>
            :
            <MapComponent longitude={location.longitude} latitude={location.latitude} />
        }
        {
          location.longitude && location.latitude && sbmLctBtn ? <Row className="justify-content-sm-center mx-auto mt-5 mb-5">
            <Button size='sm' variant='danger' onClick={SubmitLocation}>SUBMIT LOCATION</Button>
          </Row>
            : <></>
        }
      </Card>
    </Container>
  );
}

export default MainComponent;
