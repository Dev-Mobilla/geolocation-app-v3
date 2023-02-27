import React, { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Row,
  Image,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

import BrandImg from "../assets/images/branchlocator_logo.png";
import FormComponent from "../mock/Form";
import MapComponent from "./MapComponent";

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
      });
    })();
  }, [setLocation, location]);
  const [navigateForm, setNavForm] = useState();
  const [sbmLctBtn, setSbmLctBtn] = useState(true);
  const [modalNote, setModalNote] = useState(true)

  const SubmitLocation = () => {
    setNavForm(true)
    setSbmLctBtn(false)
  }

  const handleCloseModal = () => {
    setModalNote(false)
  }

  return (
    <>
      {
        modalNote ? <Modal show={modalNote} backdrop="static"
          keyboard={false}>
          < Modal.Body onClick={e => e.stopPropagation()} >
            <div className="mt-1">
              <p style={{ marginBottom: '0.25rem', fontWeight: '500' }}> Please follow these steps carefully:</p>
              <p style={{ marginBottom: '0.25rem' }}>- Only one (1) entry is required per branch.</p>
              <p style={{ marginBottom: '0.25rem' }}>- An Android or Apple smartphone must be used</p>
              <p style={{ marginBottom: '0.25rem' }}>- Location must be switched on</p>
            </div>
          </Modal.Body >
          <Modal.Footer>
            <div className="d-flex justify-content-center" style={{ margin: '3px 15px 6px 15px' }}>
              <Button variant="danger" onClick={handleCloseModal} className="mr-1" size="sm">
                I understand
              </Button>
            </div>
          </Modal.Footer>
        </Modal > :
          <Container className="mt-5 mb-5 mx-auto" style={{ padding: "0px" }}>
            <Card
              style={{ width: "95%", borderTop: "10px solid red" }}
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
                <Image src={BrandImg} style={{ maxWidth: "65%" }} />
              </div>
              <br />
              {
                navigateForm ?
                  <FormComponent location={location} />
                  :
                  <MapComponent longitude={location.longitude} latitude={location.latitude} />
              }
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {
                location.longitude && location.latitude && sbmLctBtn ? <Row className="justify-content-sm-center mx-auto mb-5" style={{ marginTop:'30px' }}>
                  <Button size='sm' variant='danger' onClick={SubmitLocation}>SUBMIT LOCATION</Button>
                </Row>
                  : <></>
              }
            </Card>
          </Container>
      }
    </>

  );
}

export default MainComponent;
