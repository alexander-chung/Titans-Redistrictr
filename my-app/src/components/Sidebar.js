import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Button, Card } from 'react-bootstrap';
import StateInformation from './StateInformation';
import RunInformation from './RunInformation';
import ResultsInformation from './ResultsInformation';
import 'react-tabs/style/react-tabs.css';
import StateInformationDetailed from './StateInformationDetailed';

export default function Sidebar({ currState, selectState, setSummaryData, setLoadedResult, enactedDistricting, setCurrJobId, setBoxData }) {
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
                        <StateInformationDetailed
                            currState={currState}
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
                        stateName={currState.name10}
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
                        setSummaryData={setSummaryData}
                        setLoadedResult={setLoadedResult}
                        enactedDistricting={enactedDistricting}
                        setCurrJobId={setCurrJobId}
                        setBoxData={setBoxData}
                    />
                    :null}
                </TabPanel>
            </Tabs>
        </div>
    );
}