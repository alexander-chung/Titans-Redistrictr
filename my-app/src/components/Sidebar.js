import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Button, Card } from 'react-bootstrap';

import StateInformation from './StateInformation';
import RunInformation from './RunInformation';
import ResultsInformation from './ResultsInformation';
import 'react-tabs/style/react-tabs.css';


/**
 * currState - One of the 3 States from the States constant above
 * selectState - the change state function returned from the useState() call in HomeScreen()
 */

export default function Sidebar({ currState, selectState }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [batches, setBatches] = useState([
        {
            batchStatus: 2, // 2 - complete, 1 - running, 0 - pending
            batchNumber: 1,
            state: "Florida",
            districtings: "3,000",
            popVar: 52,
            minorities: ["HISPANIC"],
            compMeasure: "VERY",
            computeLocation: "SEAWULF"
        },
        {
            batchStatus: 1,
            batchNumber: 2,
            state: "Texas",
            districtings: "200",
            popVar: 45,
            minorities: ["AFRICAN_AMERICAN"],
            compMeasure: "NONE",
            computeLocation: "LOCAL"
        },
        {
            batchStatus: 0,
            batchNumber: 3,
            state: "North Carolina",
            districtings: "1,000",
            popVar: 65,
            minorities: ["ASAIN"],
            compMeasure: "MODERATE",
            computeLocation: "SEAWULF"
        }
    ])

    const handleStateSelect = (stateN) => {
        selectState(stateN);
    }

    const updateJobs = (newJobs) => {
        var i;
        for(i=0; i<newJobs.length; i++){
            newJobs[i].batchNumber = i + 1
        }
        setBatches(newJobs);
    }


    return (
        <div id="sidebar" className="shadow">

            {currState? 
                <Button 
                    id="return-state-select" 
                    variant="secondary"
                    className="shadow"
                    onClick={() => {selectState(-1); setTabIndex(0)}}
                    >
                        ⬅ Return</Button>
                :
                <div></div>            
            }


            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    {currState ?
                        <div>
                        <Tab>State Information</Tab>
                        <Tab>Generate Districtings</Tab>
                        <Tab>Results</Tab>
                        </div>
                    :
                        <div>
                        <Tab disabled>State Information</Tab>
                        <Tab disabled>Generate Districtings</Tab>
                        <Tab disabled>Results</Tab>
                        </div>
                    }
                </TabList>

                <TabPanel>
                    {currState? 
                        <StateInformation 
                            state={currState.state}
                            numDistricts={currState.numDistricts}
                            numPrecincts={currState.numPrecincts}
                            demographics={currState.demographics}
                        />
                        :
                        <Card>
                             <Card.Header id="main-header" className="text-center font-weight-bold">Choose a State</Card.Header>
                             <Card.Body className="text-center mt-5">
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(0)}>Florida</Button></Card.Text>
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(1)}>Texas</Button></Card.Text>
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(2)}>North Carolina</Button></Card.Text>

                                <div id="logo"></div>
                            </Card.Body>
                        </Card>
                    }
                    
                </TabPanel>
                
                <TabPanel>
                    <RunInformation
                        batches={batches}
                        updateJobs={updateJobs}
                    />
                </TabPanel>
                
                <TabPanel>
                    <ResultsInformation
                        batches={batches}
                        updateJobs={updateJobs}
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
}