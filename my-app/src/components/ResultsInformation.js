import React, { useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import BatchCard from './BatchCard';


export default function ResultsInformation(props) {

    const batches = props.batches;


    useEffect(() => {
        fetch('http://localhost:3000/getJobHistory') // setJobHistory to trigger useEffect
            .then(response => response.json())  
            .then(data => console.log(data)) // setBatches to recieved jobHistory
            .catch((error) => {
                console.error('Error:', error);
              });
    }, []);


    const deleteBatch = (batchNumber) => {
        const newBatches = batches.slice();
        newBatches.splice(batchNumber - 1, 1);
        fetch('http://localhost:3000/deleteJob',  {
            method: "DELETE",
            dataType: "JSON",
            headers: {"Content-Type": "application/json; charset=utf-8",},
            body: JSON.stringify({"id": batchNumber})
        })
            .then(response => response.json())  
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
              });
        props.updateJobs(newBatches);
    }


    const cancelBatch = (batchNumber) => {
        const newBatches = batches.slice();
        newBatches.splice(batchNumber - 1, 1);
        fetch('http://localhost:3000/cancelJob',  {
            method: "DELETE",
            dataType: "JSON",
            headers: {"Content-Type": "application/json; charset=utf-8",},
            body: JSON.stringify({"id": batchNumber})
        })
            .then(response => response.json())  
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
              });
        props.updateJobs(newBatches);
    }

    
    return(
        <div id="resultsInformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold">Results</Card.Header>
                <div>
                    {batches.map(batch => 
                        <BatchCard 
                            batch={batch}
                            cancelBatch={cancelBatch}
                            deleteBatch={deleteBatch}
                        />
                    )}
                </div>
            </Card>
        </div>
    )
}