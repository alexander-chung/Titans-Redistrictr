import React, { useEffect} from 'react';
import { Card } from 'react-bootstrap';
import BatchCard from './BatchCard';

const serverURL = "http://localhost:8080";

export default function ResultsInformation({ batches, updateJobs }) {

    useEffect(() => {
        fetch(`${serverURL}/getJobHistory`) // setJobHistory to trigger useEffect
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
        fetch(`${serverURL}/deleteJob?id=${batchNumber}`,  {
            method: "DELETE"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    const cancelBatch = (batchNumber) => {
        fetch(`${serverURL}/cancelJob?id=${batchNumber}`,  {
            method: "DELETE"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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