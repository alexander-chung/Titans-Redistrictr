import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Modal, Spinner } from 'react-bootstrap';

export default function RunInformation() {

    const [runs, setRuns] = useState({valid: false, value: ''})
    const [compactWeight, setCompactWeight] = useState({valid: false, value: ''})
    const [popVar, setPopVar] = useState({valid: false, value: ''})
    const [minGroup, setMinGroup] = useState({valid: false, values: [false, false, false, false]})
    const [start, setStart] = useState(false)
    // const [show, setShow] = useState(false)
    const [isRunning, setRunning] = useState(false)

    const reNum = /^[1-9]\d*$/
    const reFloat = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/

    const startRun = () => {
        setRunning(true)
        // setShow(true)
        console.log('Run started')
    }

    // const handleCloseModal = () => {
    //     setShow(false)
    // }

    function simulate() {
        return new Promise((resolve) => setTimeout(resolve, 5000))
    }

    useEffect(() => {
        if (isRunning) {
            simulate().then(() => {
                setRunning(false)
            })
        }
    }, [isRunning])

    const handleRunChange = (e) => {
        const value = e.target.value;
        const isValid = reNum.test(value);
        setRuns({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (isValid && compactWeight.valid && popVar.valid && minGroup.valid) {
            setStart(true);
        }
    }

    const handleCompChange = (e) => {
        const value = e.target.value;
        const isValid = reFloat.test(value);
        setCompactWeight({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (runs.valid && isValid && popVar.valid && minGroup.valid) {
            setStart(true);
        }
    }

    const handlePopChange = (e) => {
        const value = e.target.value;
        const isValid = reFloat.test(value);
        setPopVar({
            value,
            valid: isValid 
        })

        if (start && !isValid) {
            setStart(false)
        }

        if (runs.valid && compactWeight.valid && isValid && minGroup.valid) {
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

        if (runs.valid && compactWeight.valid && popVar.valid && isValid) {
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
                                <Form.Control type='text' placeholder="Enter number from 1-5000" onChange={handleRunChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Compactness Weight</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-100" onChange={handleCompChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label className="font-weight-bold">Population Variation</Form.Label>
                                <Form.Control type='text' placeholder="Enter number from 0-100" onChange={handlePopChange}/>
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
                                <Form.Check value="2" type="checkbox" label="Asian American" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicCheckbox3">
                                <Form.Check value="3" type="checkbox" label="Native American" onClick={handleMinGroup}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button className="ml-auto" variant={!isRunning ? "primary" : "danger"} onClick={!isRunning ? startRun : null} disabled={!start}>
                                {isRunning ? "Generating... " : "Start Generation"}
                                {isRunning ? <Spinner 
                                    as="span" size="sm" animation="border" role ="status" aria-hidden="true"/> : null}
                            </Button>
                            {/* <Modal show={show}>
                                <Modal.Body>Currently generating...</Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}