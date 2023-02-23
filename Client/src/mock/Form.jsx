// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Row, Form, Modal } from "react-bootstrap";
import ZoneComponent from "../components/ZoneComponent";
import axios from "../helper/axios";

function FormComponent(location) {

    // const connection = "http://localhost:8000/postSheets"

    const [errorEmailMessage, setErrorEmailMessage] = useState();
    const [errorNumberMessage, setErrorNumberMessage] = useState();
    const [isEmailError, setIsEmailError] = useState();
    const [isNumberError, setIsNumberError] = useState();

    const [isValidated, setValidated] = useState();

    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [designation, setDesignation] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertNotif, setAlertNotif] = useState(false);
    const [messageAlert, setMessageAlert] = useState();
    const [information, setInformation] = useState({});

    const handleClose = () => {
        setShow(false)
        setAlertNotif(false)
    };

    // const proplocation = () =>{
    //     (async () => {
    //       let geolocation = await navigator.geolocation;
    //       if (!geolocation) {
    //         console.log("Permission to access location was denied");
    //         return;
    //       }
    //       await geolocation.watchPosition((position) => {
    //         return position.coords
    //       });
    //     })();
    //   }

    const IsEmailValid = (email) => {
        let isValid =
            /\S+@\S+\.\S+/.test(email) && email.endsWith("mlhuillier.com");
        return isValid;
    };
    const IsNumberValid = (number) => {
        let isValid = /^(\+639)\d{9}$/gm.test(number);
        // let isValid = /^(09|\+639)\d{9}$/gm.test(number)

        return isValid;
    };
    const CheckEmail = (event) => {
        let email = event.target.value;

        if (!IsEmailValid(email)) {
            setIsEmailError(true);
            setErrorEmailMessage("Email is invalid!");
        } else {
            setIsEmailError(false);
            setErrorEmailMessage(null);
        }
        setEmail(email);
    };
    const CheckNumber = (event) => {
        let number = event.target.value;

        if (!IsNumberValid(number)) {
            setIsNumberError(true);
            setErrorNumberMessage("Number is invalid.");
        } else {
            setIsNumberError(false);
            setErrorNumberMessage(null);
        }
        setNumber(number);
    };
    const selectDesignation = (e) => {
        let val = e.target.value;
        setDesignation(val);
    };
    const onFormSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;

        let groupdata = {
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            email: event.target[2].value,
            number: event.target[3].value,
            designation: event.target[4].value,
            zone: event.target[5].value,
            region: event.target[6].value,
            area: event.target[7].value,
            branch: event.target[8].value,
            ...location
        }

        if (form.checkValidity()) {
            setValidated(true);
            setShow(true)
            setInformation(groupdata)

        }

    };
    const postInformation = () => {
        setLoading(true)

        axios.post('/postSheets', information).then(res => {
            setTimeout(() => {
                setLoading(false)
                setShow(false)
                setTimeout(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 800);
                    setAlertNotif(true)
                    setMessageAlert('Submitted Successfully!')
                }, 1000);
            }, 1300);
        }).catch(e => {
            console.log(e);
            setMessageAlert(e.message);
        })
    }

    const Designation = [
        "Area Manager",
        "Assistant Branch Manager",
        "Branch Manager",
        "Regional Manager",
        "Teller/FLA",
        "LPTL",
        "RT",
        "RST",
    ];

    return (

        <Form
            onSubmit={onFormSubmit}
            validated={isValidated}
            id="form"
            noValidate
            style={{ margin: "0px 15px" }}
        >

            <Row className="justify-content-md-center mb-3">
                <Col sm={12} md={10}>
                    <h4>USER INFORMATION</h4>
                    <p style={{ fontStyle: "italic" }}>
                        <span style={{ color: "red" }}>*</span> Fill out required fields
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={12} xs={12} md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span style={{ color: "red" }}>*</span> First Name
                        </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control autoComplete='off' placeholder="First name" size='sm' maxLength={15}
                                minLength={3} name='firstname' required={true} style={{ backgroundColor: firstname ? 'whitesmoke' : '' }}
                                onKeyDown={(e) => setFirstname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please enter your first name.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm={12} xs={12} md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span style={{ color: "red" }}>*</span> Last Name
                        </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                autoComplete="off"
                                placeholder="Last name"
                                size="sm"
                                maxLength={15}
                                minLength={2}
                                name="lastname"
                                required={true}
                                style={{ backgroundColor: lastname ? "whitesmoke" : "" }}
                                onKeyDown={(e) => setLastname(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your last name.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={12} xs={12} md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span style={{ color: "red" }}>*</span> Email address
                        </Form.Label>
                        <InputGroup hasValidation>
                            {/* <Form.Control size='sm' autoComplete="off" isInvalid={isEmailError}
                    /> */}
                            <Form.Control
                                autoComplete="off"
                                // type="email"
                                isInvalid={isEmailError}
                                placeholder="Enter email"
                                size="sm"
                                onChange={CheckEmail}
                                name="email"
                                value={email}
                                required={true}
                                style={{ backgroundColor: email ? "whitesmoke" : "" }}
                            />
                            {isEmailError ? (
                                <Form.Control.Feedback type="invalid">
                                    {errorEmailMessage}
                                </Form.Control.Feedback>
                            ) : (
                                <Form.Control.Feedback type="invalid">
                                    Please enter your email.
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Please use your mlhuillier email address.
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col sm={12} xs={12} md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span style={{ color: "red" }}>*</span> Mobile Number:{" "}
                        </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                autoComplete="off"
                                // type="text"
                                isInvalid={isNumberError}
                                placeholder="Enter Mobile Number"
                                size="sm"
                                onChange={CheckNumber}
                                name="number"
                                value={number}
                                required={true}
                                style={{ backgroundColor: number ? "whitesmoke" : "" }}
                            ></Form.Control>
                            {isNumberError ? (
                                <Form.Control.Feedback type="invalid">
                                    {errorNumberMessage}
                                </Form.Control.Feedback>
                            ) : (
                                <Form.Control.Feedback type="invalid">
                                    Please enter your number.
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                        <Form.Text className="text-muted">
                            <span style={{ fontStyle: "italic" }}>e.g.</span>{" "}
                            <span style={{ fontStyle: "italic" }}> +639491234567</span>
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={12} xs={12} md={10}>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>
                            <span style={{ color: "red" }}>*</span> Designation/Position
                        </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Select
                                size="sm"
                                name="designation"
                                required={true}
                                onChange={selectDesignation}
                                value={designation}
                                style={{ backgroundColor: designation ? "whitesmoke" : "" }}
                            >
                                <option value="">default</option>
                                {Designation?.map((designation, key) => {
                                    return (
                                        <option key={key} value={designation}>
                                            {designation}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select your designation.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <ZoneComponent />
            {/* <Row className='justify-content-end mt-3 mb-5'>
                        <Col>
                            <Button variant="danger" type="submit" size='sm'>
                                Submit
                            </Button>
                        </Col>
                    </Row> */}
            <div className='d-grid justify-content-md-center' style={{ margin: '20px 75px 0px 75px' }}>
                <Button variant="danger" type="submit">
                    Submit
                </Button>
            </div>
            <br />
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Submit Information?</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="mt-1">
                        <h3>Submit Information?</h3>
                        <p className="mt-3">You are about to submit your information. <br /><br /> Click Save to proceed.</p>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end" style={{ margin: '5px 15px 6px 15px' }}>
                        {
                            loading ? <Button variant="secondary" disabled={loading} className="mr-1">
                                Close
                            </Button> : <Button variant="secondary" onClick={handleClose} className="mr-1">
                                Close
                            </Button>
                        }
                        {
                            loading ? <Button variant="danger" disabled={loading} className="ml-1">
                                Saving...
                            </Button> : <Button variant="danger" onClick={postInformation} className="ml-1">
                                Save
                            </Button>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal show={alertNotif} onClick={handleClose} backdrop="static"
                keyboard={false}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Submit Information?</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="mt-1 text-center">
                        <h5>{messageAlert}</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-center" style={{ margin: '3px 15px 6px 15px' }}>
                        <Button variant="secondary" onClick={handleClose} className="mr-1" size="sm">
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}
export default FormComponent;
