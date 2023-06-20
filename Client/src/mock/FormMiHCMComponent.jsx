// import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button, Col, InputGroup, Row, Form, Modal, Container, Image,
    Card
} from "react-bootstrap";
import ZoneComponent from "../components/ZoneComponent";
import axios from "../helper/axios";

import BrandImg from "../assets/images/branchlocator_logo.png";

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
    const [reason, setReason] = useState();
    const [performed, setPerformed] = useState();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertNotif, setAlertNotif] = useState(false);
    const [messageAlert, setMessageAlert] = useState();
    const [noteAlert, setNoteAlert] = useState()
    const [information, setInformation] = useState({});
    const [disableReason, setDisableReason] = useState(false);

    const handleClose = () => {
        setShow(false)
        //         setAlertNotif(false)
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

        let branch = event.target[8].value;

        let branchSplit = branch.split("-");

        let groupdata = {
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            email: event.target[2].value,
            number: event.target[3].value,
            designation: event.target[4].value,
            zone: event.target[5].value,
            region: event.target[6].value,
            area: event.target[7].value,
            branchname: branchSplit[0],
            branchcode: branchSplit[1],
            performed: performed,
            reason: event.target[11].value
        }

        if (form.checkValidity()) {
            setValidated(true);
            setShow(true)
            setInformation(groupdata)

        }

    };
    const postInformation = () => {
        setLoading(true)

        axios.post('/postToMihcm', information).then(res => {
            console.log('RES', res);
            if (res.status === 200) {

                if (res.data.code === 200) {
                    setTimeout(() => {
                        setLoading(false)
                        setShow(false)
                        setTimeout(() => {
                            // setTimeout(() => {
                            //     window.location.reload()
                            // }, 800);
                            setAlertNotif(true)
                            setMessageAlert('Submitted Successfully!')
                            // setNoteAlert('Only one (1) entry is needed for each branch.')
                        }, 1000);
                    }, 1200);
                } else {
                    setTimeout(() => {
                        setLoading(false)
                        setShow(false)
                        setTimeout(() => {
                            setAlertNotif(true)
                            setMessageAlert('Submission Failed!');
                            setNoteAlert(' Please contact admin or try again later.')
                        }, 1000);
                    }, 1200);

                }
            } else {
                setTimeout(() => {
                    setLoading(false)
                    setShow(false)
                    setTimeout(() => {
                        setAlertNotif(true)
                        setMessageAlert('Submission Failed!');
                        setNoteAlert(' Please contact admin or try again later.')
                    }, 1000);
                }, 1200);
            }
        }).catch(e => {
            setLoading(false)
            setShow(false)
            setAlertNotif(true)
            setMessageAlert(e.message);
            setNoteAlert(' Please contact admin or try again later.')
        })
    }

    const handleWindowRld = () => {
        setAlertNotif(false)
        setTimeout(() => {
            window.location.reload()
        }, 800);
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

    const onValueChange = (e) => {
        let val = e.target.value;

        if (val.toLowerCase() != "yes") {
            setPerformed("No")
            setDisableReason(false)
        } else {
            setPerformed("Yes")
            setDisableReason(true)
        }
    }

    return (
        <Container className="mt-5 mb-5 mx-auto" style={{ padding: "0px" }}>
            <Card
                style={{ width: "95%" }}
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
                    <Image src={BrandImg} style={{ maxWidth: "50%" }} />
                </div>

                <Form
                    onSubmit={onFormSubmit}
                    validated={isValidated}
                    id="form"
                    noValidate
                    style={{ margin: "30px 15px 0px 15px" }}
                >

                    <Row className="justify-content-md-center mb-3">
                        <Col sm={12} md={10}>
                            <h4>USER INFORMATION</h4>
                            <p style={{ fontStyle: "italic", fontSize: '12px' }}>
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
                                    <Form.Control autoComplete='off' placeholder="First name" size='sm' maxLength={30}
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
                                        maxLength={30}
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
                                        placeholder="Enter Mobile Number"
                                        size="sm"
                                        name="number"
                                        value={number}
                                        required={true}
                                        onChange={CheckNumber}
                                        style={{ backgroundColor: number ? "whitesmoke" : "" }}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your number.
                                    </Form.Control.Feedback>
                                </InputGroup>
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
                    <Row className="justify-content-md-center mt-2">
                        <Col sm={12} xs={12} md={10}>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>
                                    <span style={{ color: "red" }}>*</span> Have you successfully performed Time In & Out using the HRIS MiHCM App within your branch premise?
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Check // prettier-ignore
                                        type="radio"
                                        id="Yes"
                                        label="Yes"
                                        name="performed"
                                        onChange={onValueChange}
                                        value="Yes"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        id="No"
                                        style={{ paddingLeft: '2.5em' }}
                                        name="performed"
                                        onChange={onValueChange}
                                        value="No"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm={12} xs={12} md={10}>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>
                                    <span style={{ color: "red" }}>*</span> If <span style={{ fontWeight: 'bold' }}>No</span>, please briefly describe the problem that you experienced.
                                </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        size="sm"
                                        name="reason"
                                        required={true}
                                        disabled={disableReason}
                                        onKeyDown={(e) => setReason(e.target.value)}
                                        style={{ backgroundColor: reason ? "whitesmoke" : "" }}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter reason.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* <Row className='justify-content-end mt-3 mb-5'>
                        <Col>
                            <Button variant="danger" type="submit" size='sm'>
                                Submit
                            </Button>
                        </Col>
                    </Row> */}
                    <div className='d-grid justify-content-md-center' style={{ margin: '20px 75px 0px 75px' }}>
                        <Button variant="danger" type="submit" style={{ padding: '5px 20px' }}>
                            Submit
                        </Button>
                    </div>
                    <br />
                    <Modal show={show} onHide={handleClose} backdrop="static"
                        keyboard={false}>
                        {/* <Modal.Header closeButton>
                    <Modal.Title>Submit Information?</Modal.Title>
                </Modal.Header> */}
                        <Modal.Body onClick={e => e.stopPropagation()}>
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
                    <Modal show={alertNotif} onClick={handleWindowRld} backdrop="static"
                        keyboard={false}>
                        {/* <Modal.Header closeButton>
                    <Modal.Title>Submit Information?</Modal.Title>
                </Modal.Header> */}
                        <Modal.Body onClick={e => e.stopPropagation()}>
                            <div className="mt-1 text-center">
                                <h5>{messageAlert}</h5>
                                <p>{noteAlert}</p>
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

            </Card>
        </Container>
    )
}
export default FormComponent;
