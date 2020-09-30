import React, { useState } from 'react';

import Sidebar from './Sidebar';
import DistrictInformation from './DistrictInformation';
import 'react-tabs/style/react-tabs.css';
import './style.css';

export default function HomeScreen(props) {
    const [currState, setCurrState] = useState(null);

    return (
        <div>
            <Sidebar 
                stateInfo={currState} 
                selectState={setCurrState}
            />


            <div id="map-container">
                <DistrictInformation />
            </div>
        </div>
    );
}