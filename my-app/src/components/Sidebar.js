import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Button, Card } from 'react-bootstrap';

import StateInformation from './StateInformation';
import RunInformation from './RunInformation';
import 'react-tabs/style/react-tabs.css';

const States = [
    {
        state: "Florida",
        numDistricts: 50,
        numPrecincts: 689,
        demographics: {
            racial: [
                {"name": "White", "value": 99344},
                {"name": "Hispanic", "value": 65895},
                {"name": "Black", "value": 48928},
                {"name": "Asian", "value": 7178}
            ], 
            voting: [
                {"name": "Republican", "value": 35},
                {"name": "Democratic", "value": 38},
                {"name": "Other", "value": 27}
            ]
        }
    },
    {
        state: "Texas",
        numDistricts: 60,
        numPrecincts: 575,
        demographics: {
            racial: [
                {"name": "White", "value": 99344},
                {"name": "Hispanic", "value": 45895},
                {"name": "Black", "value": 28928},
                {"name": "Asian", "value": 7178}
            ], 
            voting: [
                {"name": "Republican", "value": 53},
                {"name": "Democratic", "value": 28},
                {"name": "Other", "value": 19}
            ]
        }
    },
    {
        state: "North Carolina",
        numDistricts: 60,
        numPrecincts: 575,
        demographics: {
            racial: [
                {"name": "White", "value": 99344},
                {"name": "Hispanic", "value": 45895},
                {"name": "Black", "value": 28928},
                {"name": "Asian", "value": 7178}
            ], 
            voting: [
                {"name": "Republican", "value": 53},
                {"name": "Democratic", "value": 28},
                {"name": "Other", "value": 19}
            ]
        }
    }
]

/**
 * stateInfo - One of the 3 States from the States constant above
 * selectState - the change state function returned from the useState() call in HomeScreen()
 */
export default function Sidebar({ stateInfo, selectState }) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleStateSelect = (stateN) => {
        selectState(States[stateN]);
    }

    return (
        <div id="sidebar" className="shadow">

            {stateInfo? 
                <Button 
                    id="return-state-select" 
                    variant="secondary"
                    className="shadow"
                    onClick={() => {selectState(null); setTabIndex(0)}}
                    >
                        ⬅ Return</Button>
                :
                <div></div>            
            }


            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    {stateInfo ?
                        <div>
                        <Tab>State Information</Tab>
                        <Tab>Generate Districtings</Tab>
                        </div>
                    :
                        <div>
                        <Tab disabled>State Information</Tab>
                        <Tab disabled>Generate Districtings</Tab>
                        </div>
                    }
                </TabList>

                <TabPanel>
                    {stateInfo? 
                        <StateInformation 
                            state={stateInfo.state}
                            numDistricts={stateInfo.numDistricts}
                            numPrecincts={stateInfo.numPrecincts}
                            demographics={stateInfo.demographics}
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
                    <RunInformation/>
                </TabPanel>
            </Tabs>
        </div>
    );
}