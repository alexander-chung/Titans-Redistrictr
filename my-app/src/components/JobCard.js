import { point } from 'leaflet';
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
    "NATIVE_AMERICAN" : "Native American"
}

export default function JobCard({ job, cancelJob, deleteJob, setSummaryData, setLoadedResult, enactedDistricting, setCurrJobId }) {
    const [open, setOpen] = useState(false);
    const [loadResults, setLoadResults] = useState(false);
    const [boxData, setBoxData] = useState(null)
    const [showPlot, setShowPlot] = useState(false)
    const { status, id, state, numDistrictings, populationDifference, minorityGroups, compactnessMeasure, computeLocation } = job;

    const showBoxPlot = (e) => {
        fetch(`http://localhost:8080/getSummaryData?jobid=${job.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrJobId(job.id)
                setSummaryData(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        fetch(`http://localhost:8080/getBoxData?jobid=${job.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setBoxData(calculateEnacted(data))
                setLoadResults(true);
                setLoadedResult(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const calculateEnacted = (data) => {
        let listOfMVAP = []
        let enactedData = []
        for(let i=0; i<enactedDistricting.features.length; i++){
            let totalMVAP = 0
            let totalVAP = enactedDistricting.features[i].properties.TOTAL_VAP
            if(minorityGroups.includes("AFRICAN_AMERICAN")){
                totalMVAP += enactedDistricting.features[i].properties.AFRICAN_AMERICAN_VAP;
            }
            if(minorityGroups.includes("HISPANIC")){
                totalMVAP += enactedDistricting.features[i].properties.HISPANIC_VAP;
            }
            if(minorityGroups.includes("ASIAN")){
                totalMVAP += enactedDistricting.features[i].properties.ASIAN_VAP;
            }
            if(minorityGroups.includes("NATIVE_AMERICAN")){
                totalMVAP += enactedDistricting.features[i].properties.NATIVE_AMERICAN_VAP;
            }
            listOfMVAP.push(parseFloat((totalMVAP / totalVAP).toFixed(2)))
        }
        listOfMVAP.sort(function(a,b) { return a - b;});
        for(let j=0; j<listOfMVAP.length; j++) {
            let point = {"x": j, "y": listOfMVAP[j]}
            enactedData.push(point)
        }
        console.log(enactedData)
        data.enactedData = enactedData
        return data;
    }

    const closePlot = () => {
        setLoadResults(false);
        setLoadedResult(false);
        setCurrJobId(-1);
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
                    <BoxPlot closePlot={closePlot} boxData={boxData}/>

                </div>
                : 
                null
            }    
        </Card>
    );
}