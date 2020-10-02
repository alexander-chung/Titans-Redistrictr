import React, { useState } from 'react';
import { Card, Collapse, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import BoxPlot from './BoxPlot';

export default function BatchCard({ batch, deleteBatch }) {
    const [open, setOpen] = useState(false);
    const [loadResults, setLoadResults] = useState(false);

    const { batchStatus, batchNumber, state, districtings } = batch;

    const showBoxPlot = (e) => {
        setLoadResults(true);
    }

    const closePlot = () => {
        setLoadResults(false);
    }

    return (
        <Card className="batch-card shadow-sm mt-4">
            <Card.Header className="batch-card-heading">
                Batch {batchNumber} ({batchStatus===2?"Complete":(batchStatus===1?"Running":"Pending")})
                {batchStatus !== 2 ?
                    <div>
                        <Button variant="danger" size="sm" className="batch-card-deletebutton" onClick={() => deleteBatch(batchNumber)}>x</Button>
                        <Button disabled variant="info" size="sm" className="batch-card-loadbutton" onClick={() => showBoxPlot()}>Load Results</Button>
                    </div>
                    :
                    <div>
                        <Button variant="info" size="sm" className="batch-card-loadbutton" onClick={() => showBoxPlot()}>Load Results</Button>
                    </div>
                }
            </Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item className="p-0">
                    <Card.Body className="batch-card-content">
                        <Card.Text>
                            <b> {state} </b> <br/>
                            {districtings} Districtings
                            <Button className="batch-card-button" variant="outline-secondary" size="sm" onClick={() => {setOpen(!open)}}>
                                Show {open?"Less":"More"}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>

                <Collapse in={open}>
                    <ListGroup.Item className="p-0">
                        <Card.Body className="batch-card-content">
                            <Card.Text>
                                <b>Compactness Method: </b> Convex Hull <br />
                                <b>Compactness Threshold: </b> 0.85 <br />
                                <b>Population Var. Threshold: </b> 0.35 <br />
                                <b>Minorities: </b> Hispanic, Black
                            </Card.Text>
                        </Card.Body>
                    </ListGroup.Item>
                </Collapse>
            </ListGroup>
            {loadResults ? 
                <div>
                    <BoxPlot closePlot={closePlot}/>

                    <div className="batch-highlighting">
                        Choose a districting plan to highlight: <br />

                        <ButtonGroup className="batch-highlighting-buttons">
                            <Button variant="outline-info">Random</Button>
                            <Button variant="outline-info">Average</Button>
                            <Button variant="outline-info">Best</Button>
                            <Button variant="outline-info">Worst</Button>
                        </ButtonGroup>
                    </div>
                </div>
                : 
                null
            }
            
        </Card>
    );
}