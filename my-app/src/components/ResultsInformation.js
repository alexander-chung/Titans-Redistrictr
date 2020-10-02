import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import BatchCard from './BatchCard';


export default function ResultsInformation() {
    
    return(
        <div id="resultsInformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold">Results</Card.Header>
                <div>
                    <BatchCard 
                        batchStatus={"Completed"}
                        batchNumber={1} 
                        config={{
                            state: "Florida",
                            districtings: "3,000"
                        }}
                    />
                    <BatchCard 
                        batchStatus={"Running"}
                        batchNumber={2} 
                        config={{
                            state: "Florida",
                            districtings: "3,000"
                        }}
                    />
                    <BatchCard 
                        batchStatus={"Pending"}
                        batchNumber={3} 
                        config={{
                            state: "Florida",
                            districtings: "3,000"
                        }}
                    />
                </div>
            </Card>
        </div>
    )
}