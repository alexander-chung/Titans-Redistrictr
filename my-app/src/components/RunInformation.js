import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';

export default function RunInformation(props) {

    const [runs, setRuns] = useState({valid: false, value: ''})
    // const [compactWeight, setCompactWeight] = useState({valid: false, value: ''})
    const [districtNum, setDistrictNum] = useState({valid: false, value: ''})
    const [popVar, setPopVar] = useState({valid: false, value: ''})
    const [minGroup, setMinGroup] = useState({valid: false, values: [false, false, false, false, false]})
    const [start, setStart] = useState(false)
    const [show, setShow] = useState(false)
    // const [isRunning, setRunning] = useState(false)
    const [seaWulf, setSeaWulf] = useState(false)
    const [compMeasure, setCompMeasure] = useState({valid: false, value: ''})
    const [batchID, setBatchID] = useState(0)

    const batches = props.batches;

    const reNum = /^[1-9]\d*$/
    const reFloat = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/

    const submitRequest = () => {
        // setRunning(true)
        // setBatchID(batchID+1)
        setShow(true);
        setBatchID(batchID+1);
        var computeLocation = (seaWulf) ? "SEAWULF" : "LOCAL";
        
        const createJobParams = {
            "numDistrictings": runs.value,
            // "numDistricts": districtNum.value, // this should be a string either VERY, MODERATE, LITTLE, NONE
            "populationDifference": popVar.value,
            "compactnessMeasure": "VERY",
            // "minorityGroups": minGroup.value, // this should be a list of strings,
            "minorityGroups": ["ASIAN"],
            "computeLocation": computeLocation
        }

        const newJob = {
            batchStatus: 0,
            batchNumber: batches.length + 1,
            state: props.currState,
            districtings: runs.value,
            popVar: popVar.value,
            minorities: ["HISPANIC"],
            compMeasure: "VERY", //change later
            computeLocation: computeLocation
        }

        props.addJob(newJob);

        console.log(JSON.stringify(createJobParams));

        fetch('http://localhost:8080/createJob',  {
            method: "POST",
            // dataType: "JSON",
            headers: {"Content-Type": "application/json; charset=utf-8",},
            body: JSON.stringify(createJobParams)
        })
            .then(response => console.log(response.body))  
            // .then(data => console.log(data))
            .catch((error) => {
                console.error('My Error:', error);
              });
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

        if (isValid && districtNum.valid && popVar.valid && minGroup.valid && compMeasure.valid) {
            setStart(true);
        }
    }

    const handleDistrictNumChange = (e) => {
        const value = e.target.value;
        const isValid = reFloat.test(value) && parseFloat(value) <= 50;
        setDistrictNum({
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

        if (runs.valid && districtNum.valid && isValid && minGroup.valid && compMeasure.valid) {
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

        if (runs.valid && districtNum.valid && popVar.valid && isValid && compMeasure.valid) {
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

        if (runs.valid && districtNum.valid && popVar.valid && minGroup.valid && isValid) {
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
                                <Form.Control type='text' placeholder="Enter number from 1-5000 (e.g. 1000)" onChange={handleRunChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Number of districts</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-50 (e.g. 20)" onChange={handleDistrictNumChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Compactness Level</Form.Label>
                                <Form.Control as="select" size="md" custom onChange={handleCompMeas}>
                                    <option defaultValue>Choose...</option>
                                    <option value="0">Very Compact</option>
                                    <option value="1">Moderately Compact</option>
                                    <option value="2">Not Very Compact</option>
                                    <option value="3">Not Compact</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Population Variation Threshold</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-100 (e.g. 20)" onChange={handlePopChange}/>
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