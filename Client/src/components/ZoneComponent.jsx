import React from "react";
import Form from "react-bootstrap/Form";
import { useState} from "react";
import { Col, InputGroup, Row } from "react-bootstrap";

import ZONES from "../Zones/zones";

function ZoneComponent() {
  const [zone, setZone] = useState();
  const [region, setRegion] = useState();
  const [area, setArea] = useState();
  const [branch, setBranch] = useState();

  const [regionIndex, setRegionIndex] = useState();

  const [regionArray, setRegionsArray] = useState();
  const [areaArray, setAreaArray] = useState();
  const [branches, setBranches] = useState();

  const ZONE = ZONES;

  const zones = ["NCR", "LUZON", "VISAYAS", "MINDANAO"];

  const selectZone = (e) => {
    let val = e.target.value;

    setZone(val); //property name

    setRegionsArray(ZONE[val]);
  };
  const selectRegion = (e) => {
    let val = e.target.value;

    setRegion(val); //property name

    let index = parseInt(e.target.selectedIndex) - 1;

    setRegionIndex({ val: val, index: index });

    setAreaArray(ZONE[zone][index]);
  };
  const selectArea = (e) => {
    let val = e.target.value;
    setArea(val); //property name

    let index = parseInt(e.target.selectedIndex) - 1;
    console.log(ZONE[zone][regionIndex.index].areaSet[index].BRANCHES);
    // setBranches(ZONE[zone][index].areaSet[regionIndex.index].BRANCHES);
    setBranches(ZONE[zone][regionIndex.index].areaSet[index].BRANCHES)
  };
  const selectBranch = (e) => {
    console.log(e);
    let val = e.target.value;
    setBranch(val);
  };


  return (
    <div className="ZoneComponent">
      <Row className="justify-content-md-center">
        <Col sm={12} xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <span style={{ color: "red" }}>*</span> Zone
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                size="sm"
                name="zone"
                required={true}
                onChange={selectZone}
                value={zone}
                style={{ backgroundColor: zone ? "whitesmoke" : "" }}
              >
                <option value="">default</option>
                {zones.map((el, key) => {
                  // console.log(el, key);
                  return (
                    <option key={key} value={el}>
                      {el}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select zone.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col sm={12} xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <span style={{ color: "red" }}>*</span> Region
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                size="sm"
                name="region"
                required={true}
                value={region}
                onChange={selectRegion}
                style={{ backgroundColor: region ? "whitesmoke" : "" }}
              >
                <option value="">default</option>
                {regionArray?.map((el, key) => {
                  return (
                    <option key={key} value={el.region}>
                      {el.region}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select region.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={12} xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <span style={{ color: "red" }}>*</span> Area
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                size="sm"
                name="area"
                required={true}
                value={area}
                onChange={selectArea}
                style={{ backgroundColor: area ? "whitesmoke" : "" }}
              >
                <option value="">default</option>
                {areaArray?.areaSet.map((el, key) => {
                  return (
                    <option key={key} value={el.area}>
                      {el.area}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select area.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col sm={12} xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <span style={{ color: "red" }}>*</span> Branch
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                size="sm"
                name="branch"
                required={true}
                value={branch}
                onChange={selectBranch}
                style={{ backgroundColor: branch ? "whitesmoke" : "" }}
              >
                <option value="">default</option>
                {branches?.map((el, key) => {
                  return (
                    <option key={key} value={el.branchname + '-' + el.branchcode}>
                      {el.branchname} - {el.branchcode}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select branch.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default ZoneComponent;
