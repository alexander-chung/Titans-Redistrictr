import React, { useEffect} from 'react';
import { Card } from 'react-bootstrap';
import BatchCard from './BatchCard';


export default function ResultsInformation({ batches, updateJobs }) {

    // batch examples
    /**
     * 
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
     */


    useEffect(() => {
        fetch('http://localhost:8080/getJobHistory') // setJobHistory to trigger useEffect
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                updateJobs(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });


    const deleteBatch = (batchNumber) => {
        const newBatches = batches.slice();
        newBatches.splice(batchNumber - 1, 1);
        fetch('http://localhost:8080/deleteJob',  {
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
        updateJobs(newBatches);
    }


    const cancelBatch = (batchNumber) => {
        const newBatches = batches.slice();
        newBatches.splice(batchNumber - 1, 1);
        fetch('http://localhost:8080/cancelJob',  {
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
        updateJobs(newBatches);
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