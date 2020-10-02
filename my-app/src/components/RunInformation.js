import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';

export default function RunInformation() {

    const [runs, setRuns] = useState({valid: false, value: ''})
    const [compactWeight, setCompactWeight] = useState({valid: false, value: ''})
    const [popVar, setPopVar] = useState({valid: false, value: ''})
    const [minGroup, setMinGroup] = useState({valid: false, values: [false, false, false, false, false]})
    const [start, setStart] = useState(false)
    const [show, setShow] = useState(false)
    // const [isRunning, setRunning] = useState(false)
    const [seaWulf, setSeaWulf] = useState(false)
    const [compMeasure, setCompMeasure] = useState({valid: false, value: ''})
    const [batchID, setBatchID] = useState(0)

    const reNum = /^[1-9]\d*$/
    const reFloat = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/

    const submitRequest = () => {
        // setRunning(true)
        // setBatchID(batchID+1)
        setShow(true)
        setBatchID(batchID+1)
        // console.log('Request Submitted')
    }

    // const handleCloseModal = () => {
    //     setShow(false)
    // }

    const handleSeaWulf = () => {
        setSeaWulf(!seaWulf)
    }

    function simulate() {
        return new Promise((resolve) => setTimeout(resolve, 2000))
    }

    useEffect(() => {
        if (show) {
            simulate().then(() => {
                setShow(false)
                // setBatchID(batchID+1)
            })
        }
    }, [show])

    const handleRunChange = (e) => {
        const value = e.target.value;
        const isValid = reNum.test(value) && parseInt(value) <= 5000;
        setRuns({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (isValid && compactWeight.valid && popVar.valid && minGroup.valid && compMeasure.valid) {
            setStart(true);
        }
    }

    const handleCompChange = (e) => {
        const value = e.target.value;
        const isValid = reFloat.test(value) && parseFloat(value) <= 100;
        setCompactWeight({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (runs.valid && isValid && popVar.valid && minGroup.valid && compMeasure.valid) {
            setStart(true);
        }
    }

    const handlePopChange = (e) => {
        const value = e.target.value;
        const isValid = reFloat.test(value) && parseFloat(value) <= 100;
        setPopVar({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (runs.valid && compactWeight.valid && isValid && minGroup.valid && compMeasure.valid) {
            setStart(true);
        }
    }

    const handleMinGroup = (e) => {
        var isValid = false
        let newValues = minGroup.values
        newValues[e.target.value] = !newValues[e.target.value]
        for (let i = 0; i < newValues.length; i++) {
            if (newValues[i]) {
                isValid = true
                break
            }
        }
        setMinGroup({
            values: newValues,
            valid: isValid
        })

        if(start && !isValid) {
            setStart(false)
        }

        if (runs.valid && compactWeight.valid && popVar.valid && isValid && compMeasure.valid) {
            setStart(true);
        }
    }

    const handleCompMeas = (e) => {
        const value = e.target.value
        const isValid = !(value === 'Choose...')
        setCompMeasure({
            value,
            valid: isValid
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (runs.valid && compactWeight.valid && popVar.valid && minGroup.valid && isValid) {
            setStart(true);
        }
    }

    return (
        <div>
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold">Configuration</Card.Header>
                <Card.Body>
                    <Form className="text-justify">
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Number of plans</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 1-5000 e.g. 1000" onChange={handleRunChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Compactness Method</Form.Label>
                                <Form.Control as="select" size="md" custom onChange={handleCompMeas}>
                                    <option defaultValue>Choose...</option>
                                    <option value="0">Polsby Popper</option>
                                    <option value="1">Schwartzberg</option>
                                    <option value="2">Convex Hull</option>
                                    <option value="3">Reock Score</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Compactness Threshold</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-100 e.g. 20" onChange={handleCompChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Population Variation Threshold</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-100 e.g. 20" onChange={handlePopChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Minority Groups</Form.Label>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox0">
                                <Form.Check value="0" type="checkbox" label="Black or African American" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox1">
                                <Form.Check value="1" type="checkbox" label="Hispanic or Latino" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox2">
                                <Form.Check value="2" type="checkbox" label="Asian" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox3">
                                <Form.Check value="3" type="checkbox" label="American Indian or Alaska Native" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox4">
                                <Form.Check value="4" type="checkbox" label="Native Hawaiian or Other Pacific Islander" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group className="ml-auto" controlId="formBasicCheckbox5">
                                <Form.Check value="seawulf" type="checkbox" label="Generate with SeaWulf" onClick={handleSeaWulf}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button className="ml-auto" variant={start?"primary":"secondary"} onClick={submitRequest} disabled={!start}>
                                {/* {isRunning ? "Generating... " : "Submit Request"} */}
                                {/* {isRunning ? <Spinner 
                                    as="span" size="sm" animation="border" role ="status" aria-hidden="true"/> : null} */}
                                    Submit Request
                            </Button>
                            {/* <Modal show={show} onHide={handleCloseModal} animation={false} backdrop="static" centered>
                                <Modal.Body>Your request has been submitted.</Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
                        </Form.Row>
                        <Form.Row>
                            {/* <Alert className="ml-auto" variant="success" show={show}>
                                {"Batch " + batchID + " requested"}
                            </Alert> */}
                            <Form.Text className="ml-auto text-success font-weight-bold" hidden={!show}>
                                {"Batch " + batchID + " requested"}
                            </Form.Text>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}