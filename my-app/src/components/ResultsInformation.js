import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import BatchCard from './BatchCard';


export default function ResultsInformation() {

    const [batches, setBatches] = useState([
        {
            batchStatus: 2, // 2 - complete, 1 - running, 0 - pending
            batchNumber: 1,
            state: "Florida",
            districtings: "3,000"
        },
        {
            batchStatus: 1,
            batchNumber: 2,
            state: "Texas",
            districtings: "200"
        },
        {
            batchStatus: 0,
            batchNumber: 3,
            state: "North Carolina",
            districtings: "1,000"
        }
    ]);

    const deleteBatch = (batchNumber) => {
        const newBatches = batches;
        newBatches.splice(batchNumber - 1, 1);
        setBatches(newBatches);
    }
    
    return(
        <div id="resultsInformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold">Results</Card.Header>
                <div>
                    {batches.map(batch => 
                        <BatchCard 
                            batch={batch}
                            deleteBatch={deleteBatch}
                        />
                    )}
                </div>
            </Card>
        </div>
    )
}