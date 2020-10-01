import React, { useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import MainMap from "./MainMap";
import 'react-tabs/style/react-tabs.css';
import './style.css';

export default function HomeScreen(props) {
    const [currState, setCurrState] = useState(null);

    const onStateSelect = (e) => {
        
    }

    return (
        <div>
            <Sidebar 
                stateInfo={currState} 
                selectState={setCurrState}
            />


            <div id="map-container">
                <MainMap currState={currState} selectState={setCurrState}/>
            </div>
        </div>
    );
}