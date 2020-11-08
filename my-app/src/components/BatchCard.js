import React, { useState } from 'react';
import { Card, Collapse, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import BoxPlot from './BoxPlot';

export default function BatchCard({ batch, cancelBatch, deleteBatch }) {
    const [open, setOpen] = useState(false);
    const [loadResults, setLoadResults] = useState(false);

    const { batchStatus, batchNumber, state, districtings, popVar, minorities, compMeasure, computeLocation } = batch;

    var compMeas = (compMeasure==="VERY") ? "Very" : (compMeasure==="MODERATE") ? "Moderately" : (compMeasure==="LITTLE") ? "Barely" : "Not";
    var compLoc = (computeLocation==="SEAWULF") ? "Seawulf" : "Local"

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
                        <Button variant="danger" size="sm" className="batch-card-cancelbutton" onClick={() => cancelBatch(batchNumber)}>x</Button>
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
                                <b>Compactness Threshold: </b> {compMeas} Compact<br />
                                <b>Population Var. Threshold: </b> {popVar} <br />
                                <b>Minorities: </b> Hispanic, Black <br />
                                <b>Compute Location: </b> {compLoc}
                            </Card.Text>
                        </Card.Body>
                        {batchStatus===2 ?
                        <div>
                            <Button variant="danger" size="sm" className="batch-card-deletebutton" onClick={() => deleteBatch(batchNumber)}>Delete</Button>
                        </div> : null
                        }
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
                        </ButtonGroup> <br />

                        Population Variation <br />
                        <ButtonGroup className="batch-highlighting-buttons">
                            <Button variant="outline-info">Average: 25</Button>
                            <Button variant="outline-info">Best: 20</Button>
                            <Button variant="outline-info">Worst: 30</Button>
                        </ButtonGroup> <br />

                        Compactness <br />
                        <ButtonGroup className="batch-highlighting-buttons">
                            <Button variant="outline-info">Average: 23</Button>
                            <Button variant="outline-info">Best: 10</Button>
                            <Button variant="outline-info">Worst: 80</Button>
                        </ButtonGroup> <br />
                    </div>
                </div>
                : 
                null
            }
            
        </Card>
    );
}