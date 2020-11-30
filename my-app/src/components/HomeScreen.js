import React, { useState } from 'react';

import Sidebar from './Sidebar';
import MainMap from "./MainMap";
import 'react-tabs/style/react-tabs.css';

const States = [
    "FL", "TX", "NC"
]

const serverURL = "http://localhost:8080/";

export default function HomeScreen(props) {
    const [currState, setCurrState] = useState(null);
    const [precinctData, setPrecinctData] = useState(null);
    const [enactedDistricting, setEnactedDistricting] = useState(null);

    const selectState = (n) => {
        if(n < 0) {
            setCurrState(null);
        } else {
            var state = States[n];
            fetch(`${serverURL}selectState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCurrState(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            fetch(`${serverURL}getPrecincts?state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPrecinctData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            fetch(`${serverURL}getEnactedDistricting?state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEnactedDistricting(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    currState={currState} 
                    selectState={selectState}
                    precinctData={precinctData}
                    enactedDistricting={enactedDistricting}
                    />
            </div>
        </div>
    );
}