import React, { useEffect} from 'react';
import { Card } from 'react-bootstrap';
import JobCard from './JobCard';

const serverURL = "http://localhost:8080";

export default function ResultsInformation({ jobs, updateJobs }) {

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

    const deleteJob = (jobNumber) => {
        fetch(`${serverURL}/deleteJob?id=${jobNumber}`,  {
            method: "DELETE"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const cancelJob = (jobNumber) => {
        fetch(`${serverURL}/cancelJob?id=${jobNumber}`,  {
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
                    {jobs.map(job => 
                        <JobCard 
                            key={job.id}
                            job={job}
                            cancelJob={cancelJob}
                            deleteJob={deleteJob}
                        />
                    )}
                </div>
            </Card>
        </div>
    )
}