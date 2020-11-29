import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Button, Card } from 'react-bootstrap';

import StateInformation from './StateInformation';
import RunInformation from './RunInformation';
import ResultsInformation from './ResultsInformation';
import 'react-tabs/style/react-tabs.css';

// currState example
// {
//     "id": "FL",
//     "name": "Florida",
//     "population": 11229934,
//     "minorityVotingAgePopulation": {
//         "HISPANIC": 4444,
//         "NATIVE_AMERICAN": 3333,
//         "AFRICAN_AMERICAN": 1111,
//         "ASIAN": 2222
//     },
//     "numCounties": 33,
//     "numDistricts": 123,
//     "numPrecincts": 1234,
//     "geoCenter": {
//     "latitude": 21.003,
//     "longitude": 40.041
// }

// selectState - the change state function returned from the useState() call in HomeScreen()

export default function Sidebar({ currState, selectState }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [jobs, setJobs] = useState([]);

    const addJob = (job) => {
        const newJobs = jobs.slice();
        newJobs.push(job);
        setJobs(newJobs);
        console.log(jobs)
    }

    const handleStateSelect = (stateN) => {
        selectState(stateN);
    }

    const updateJobs = (newJobs) => {
        var i;
        for(i=0; i<newJobs.length; i++){
            newJobs[i].jobNumber = i + 1
        }
        setJobs(newJobs);
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
                            state={currState.name}
                            population={currState.population}
                            numDistricts={currState.numDistricts}
                            numPrecincts={currState.numPrecincts}
                            demographics={currState.minorityVotingAgePopulation}
                        />
                        :
                        <Card>
                             <Card.Header id="main-header" className="text-center font-weight-bold">Choose a State</Card.Header>
                             <Card.Body className="text-center mt-5">
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(0)}>Florida</Button></Card.Text>
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(1)}>Texas</Button></Card.Text>
                                <Card.Text><Button className="state-select shadow" variant="info" size="lg" onClick={() => handleStateSelect(2)}>North Carolina</Button></Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    
                </TabPanel>
                
                <TabPanel>
                    {currState?
                    <RunInformation
                        stateName={currState.name}
                        jobs={jobs}
                        updateJobs={updateJobs}
                        addJob={addJob}
                    />
                    :null}
                </TabPanel>
                
                <TabPanel>
                    {currState?
                    <ResultsInformation
                        jobs={jobs}
                        updateJobs={updateJobs}
                    />
                    :null}
                </TabPanel>
            </Tabs>
        </div>
    );
}