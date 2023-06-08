import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import MainComponent from "../components/MainComponent";
import { WindowX } from 'react-bootstrap-icons';

function BranchLocator() {
    const [detectMobileDevice, setMobileDeviceDetector] = useState();
    const [modal, setModal] = useState();
  
    useEffect(() => {
  
      handleDeviceDetection()
  
    }, [])
  
    const handleDeviceDetection = () => {
      let userAgent = navigator.userAgent
  
      let isMobile = /android|iphone|kindle|ipad/i.test(userAgent)
  
      if (isMobile) {
  
        setMobileDeviceDetector(isMobile)
        setModal(false)
  
      } else {
  
        setMobileDeviceDetector(isMobile)
        setModal(true)
        
      }
    }
  return (
    <>
       <div>
      {
        detectMobileDevice ? <MainComponent />
          : <Modal show={modal} backdrop="static"
            keyboard={false}>
            <Modal.Body onClick={e => e.stopPropagation()}>
              <div className="mt-1 text-center">
                <Row><WindowX size={85} /></Row>
                <br />
                <h5>Desktop/PC detected.</h5>
                <h6>Please use a mobile phone instead.</h6>
              </div>
            </Modal.Body>
          </Modal>
      }
    </div>
    </>
  )
}

export default BranchLocator;