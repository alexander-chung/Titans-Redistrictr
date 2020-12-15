import React, { useEffect} from 'react';
import { Card } from 'react-bootstrap';
import JobCard from './JobCard';

export default function ResultsInformation({ jobs, updateJobs, setSummaryData, setLoadedResult, enactedDistricting }) {
    useEffect(() => {
        fetch(`http://localhost:8080/getJobHistory`)
            .then(response => response.json())
            .then(data => {
                updateJobs(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    const deleteJob = (jobNumber) => {
        fetch(`http://localhost:8080/deleteJob?id=${jobNumber}`, {
            method: "DELETE"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const cancelJob = (jobNumber) => {
        fetch(`http://localhost:8080/cancelJob?id=${jobNumber}`, {
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
                <div id="job-card-holder">
                    {jobs.map(job => 
                        <JobCard 
                            key={job.id}
                            job={job}
                            cancelJob={cancelJob}
                            deleteJob={deleteJob}
                            setSummaryData={setSummaryData}
                            setLoadedResult={setLoadedResult}
                            enactedDistricting={enactedDistricting}
                        />
                    )}
                </div>
            </Card>
        </div>
    )
}