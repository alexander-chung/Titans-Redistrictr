import React, { useState } from 'react';
import { Card, Collapse, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import BoxPlot from './BoxPlot';

const StateAbrevToFull = {
    "TX" : "Texas",
    "NC" : "North Carolina",
    "FL" : "Florida"
}

const Compactness = {
    "NONE" : "Not Compact",
    "LITTLE" : "Not Very Compact",
    "MODERATE" : "Moderately Compact",
    "VERY" : "Very Compact"
}

const MinorityGroups = {
    "AFRICAN_AMERICAN" : "African American",
    "HISPANIC" : "Hispanic",
    "ASIAN" : "Asian",
    "NATIVE_AMERICAN" : "Native American",
    "PACIFIC_ISLANDER" : "Pacific Islander"
}

export default function JobCard({ job, cancelJob, deleteJob }) {
    const [open, setOpen] = useState(false);
    const [loadResults, setLoadResults] = useState(false);

    const { status, id, state, numDistrictings, populationDifference, minorityGroups, compactnessMeasure, computeLocation } = job;

    const showBoxPlot = (e) => {
        setLoadResults(true);
    }

    const closePlot = () => {
        setLoadResults(false);
    }

    const minGroupsToString = (groups) => {
        var out = groups.map(name => MinorityGroups[name]);
        return out.join(", ");
    }

    return (

        <Card className="job-card shadow-sm mt-4">
            <Card.Header className="job-card-heading">
                Job {id} ({status})
                {status !== "COMPLETE" ?
                    <div>
                        <Button variant="danger" size="sm" className="job-card-cancelbutton" onClick={() => cancelJob(id)}>x</Button>
                        <Button disabled variant="info" size="sm" className="job-card-loadbutton" onClick={() => showBoxPlot()}>Load Results</Button>
                    </div>
                    :
                    <div>
                        <Button variant="info" size="sm" className="job-card-loadbutton" onClick={() => showBoxPlot()}>Load Results</Button>
                    </div>
                }
            </Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item className="p-0">
                    <Card.Body className="job-card-content">
                        <Card.Text>
                            <b> {StateAbrevToFull[state]} </b> <br/>
                            {numDistrictings} Districtings
                            <Button className="job-card-button" variant="outline-secondary" size="sm" onClick={() => {setOpen(!open)}}>
                                Show {open?"Less":"More"}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>

                <Collapse in={open}>
                    <ListGroup.Item className="p-0">
                        <Card.Body className="job-card-content">
                            <Card.Text>
                                <b>Compactness Threshold: </b> {Compactness[compactnessMeasure]}<br />
                                <b>Population Var. Threshold: </b> {populationDifference} <br />
                                <b>Minorities: </b> {minGroupsToString(minorityGroups)} <br />
                                <b>Compute Location: </b> {computeLocation}
                            </Card.Text>
                        </Card.Body>
                        {status==="COMPLETE" ?
                        <div>
                            <Button variant="danger" size="sm" className="job-card-deletebutton" onClick={() => deleteJob(id)}>Delete</Button>
                        </div> : null
                        }
                    </ListGroup.Item>
                </Collapse>
            </ListGroup>
            {loadResults ? 
                <div>
                    <BoxPlot closePlot={closePlot}/>

                    <div className="job-highlighting">
                        Choose a districting plan to highlight: <br />

                        <ButtonGroup className="job-highlighting-buttons">
                            <Button variant="outline-info">Random</Button>
                        </ButtonGroup> <br />
                    </div>
                </div>
                : 
                null
            }
            
        </Card>
    );
}