import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';

export default function RunInformation(props) {

    const [runs, setRuns] = useState({valid: false, value: ''})
    const [popVar, setPopVar] = useState({valid: false, value: ''})
    const [minGroup, setMinGroup] = useState({valid: false, values: [false, false, false, false]})
    const [start, setStart] = useState(false)
    const [show, setShow] = useState(false)
    const [compMeasure, setCompMeasure] = useState({valid: false, value: ''})
    const [jobID, setJobID] = useState(0)

    const reNum = /^[1-9]\d*$/
    const reFloat = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/

    const MinorityGroups = [
        "AFRICAN_AMERICAN",
        "HISPANIC",
        "ASIAN",
        "NATIVE_AMERICAN",
    ];

    const serverURL = "http://localhost:8080"

    const submitRequest = () => {
        var minGroupStrings = minGroup.values.map((val, index) => val? MinorityGroups[index] : "");
        minGroupStrings = minGroupStrings.filter(str => str !== "");
        
        const createJobParams = {
            "numDistrictings": runs.value,
            "populationDifference": popVar.value,
            "compactnessMeasure": compMeasure.value,
            "minorityGroups": minGroupStrings
        }

        fetch(`${serverURL}/createJob`, {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8",},
            body: JSON.stringify(createJobParams)
        })
        .then(response => response.json())  
        .then(data => {
            setJobID(data);
            console.log(data);
            setShow(true);
        })
        .catch((error) => {
            console.error('My Error:', error);
        });
    }

    function simulate() {
        return new Promise((resolve) => setTimeout(resolve, 2000))
    }

    useEffect(() => {
        if (show) {
            simulate().then(() => {
                setShow(false)
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

        if (isValid && popVar.valid && minGroup.valid && compMeasure.valid) {
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

        if (runs.valid && isValid && minGroup.valid && compMeasure.valid) {
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

        if (runs.valid && popVar.valid && isValid && compMeasure.valid) {
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

        if (runs.valid && popVar.valid && minGroup.valid && isValid) {
            setStart(true);
        }
    }

    return (
        <div>
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold">{props.stateName} - Configuration</Card.Header>
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
                                <Form.Label className="font-weight-bold">Compactness Level</Form.Label>
                                <Form.Control as="select" size="md" custom onChange={handleCompMeas}>
                                    <option defaultValue>Choose...</option>
                                    <option value="VERY">Very Compact</option>
                                    <option value="MODERATE">Moderately Compact</option>
                                    <option value="LITTLE">Not Very Compact</option>
                                    <option value="NONE">Not Compact</option>
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
                                <Form.Check value="0" type="checkbox" label="African American" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox1">
                                <Form.Check value="1" type="checkbox" label="Hispanic" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox2">
                                <Form.Check value="2" type="checkbox" label="Asian" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox3">
                                <Form.Check value="3" type="checkbox" label="Native American" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button className="ml-auto" variant={start?"primary":"secondary"} onClick={submitRequest} disabled={!start}>
                                    Submit Request
                            </Button>
                        </Form.Row>
                        <Form.Row>
                            <Form.Text className="ml-auto text-success font-weight-bold" hidden={!show}>
                                {"Job " + jobID + " requested"}
                            </Form.Text>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}