import React, { useState } from 'react';

import Sidebar from './Sidebar';
import MainMap from "./MainMap";
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

export default function HomeScreen(props) {
    const [currState, setCurrState] = useState(null);

    const selectState = (n) => {
        if(n < 0) {
            setCurrState(null);
        } else {
            setCurrState(States[n]);
        }
    }

    return (
        <div>
            <Sidebar 
                currState={currState} 
                selectState={selectState}
                />


            <div id="map-container">
                <MainMap 
                    currStateName={currState ? currState.state : ""} 
                    selectState={selectState}
                    />
            </div>
        </div>
    );
}