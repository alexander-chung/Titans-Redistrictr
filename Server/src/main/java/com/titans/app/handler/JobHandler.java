package com.titans.app.handler;

import com.titans.app.dao.JobDao;
import com.titans.app.entity.Job;
import com.titans.app.enums.ComputeLocation;
import com.titans.app.enums.StateEnum;
import com.titans.app.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Queue;

@Service
public class JobHandler {
    private Queue<Integer> jobQueue;
    private int currentJobId;
    private Process currentJobProcess;
    @Autowired
    private JobDao jobDao;
    @Autowired
    private DispatchHandler dispatchHandler;

    public JobHandler() {
        jobQueue = new LinkedList<>();
        currentJobId = -1;
    }

    public int createJob(Job job, StateEnum state) {
        job.setState(state);
        job.setStatus(Status.PENDING);
        job.setComputeLocation(dispatchHandler.determineComputeLocation(job.getNumDistrictings()));
        jobDao.createJob(job);
        System.out.println("Created Job #" + job.getId() + "\n" + job.toString());
        queueJob(job.getId());
        return job.getId();
    }

    public Job getJob(int id) {
        return jobDao.getJob(id);
    }

    public Collection<Job> getJobHistory() {
        return jobDao.getAllJobs();
    }

    public boolean cancelJob(int id) {
        Job job = jobDao.getJob(id);
        if (job == null) return false;
        jobQueue.remove(id);
        jobDao.deleteJob(job);
        if (currentJobId == id && job.getComputeLocation() == ComputeLocation.LOCAL) {
            cancelLocalJob();
        } else if (currentJobId == id && job.getComputeLocation() == ComputeLocation.SEAWULF) {
            cancelSeawulfJob();
        }
        System.out.println("Canceled Job #" + id + "\n");
        startNextJob();
        return true;
    }

    public void cancelLocalJob() {
        currentJobProcess.destroy();
        currentJobId = -1;
        currentJobProcess = null;
    }

    public void cancelSeawulfJob() {
        currentJobProcess.destroy();
        currentJobId = -1;
        currentJobProcess = null;
        try {
            dispatchHandler.cancelSeawulfJob();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean deleteJob(int id) {
        return jobDao.deleteJob(id).equals("success");
    }

    public Status getJobStatus(int id) {
        Job job = getJob(id);
        return job.getStatus();
    }

    public Status getSeaWulfJobStatus() {
        return Status.RUNNING;
    }

    public void queueJob(int id) {
        jobQueue.add(id);
        if (currentJobId == -1) {
            startNextJob();
        }
    }

    public void startNextJob() {
        if (jobQueue.size() == 0) return;
        int jobId = jobQueue.poll();
        Job job = getJob(jobId);
        job.setStatus(Status.RUNNING);
        jobDao.updateJob(job);
        currentJobId = job.getId();
        if(job.getComputeLocation() == ComputeLocation.LOCAL) {
            startLocalJob(job);
        } else {
            startSeaWulfJob(job);
        }
    }

    public void startLocalJob(Job job) {
        new Thread(() -> {
            try {
                System.out.println("[LOCAL] RUNNING JOB #" + job.getId() + "\n");
                currentJobProcess = dispatchHandler.startLocalJob(job);
                currentJobProcess.waitFor();
                processLocalJob();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void startSeaWulfJob(Job job) {
        new Thread(() -> {
            try {
                System.out.println("[SEAWULF] RUNNING JOB #" + job.getId() + "\n");
                currentJobProcess = dispatchHandler.startSeaWulfJob(job);
                dispatchHandler.printProcessOutput(currentJobProcess);
                currentJobProcess = dispatchHandler.monitorSeawulfJob(job);
                dispatchHandler.printProcessOutput(currentJobProcess);
                currentJobProcess.waitFor();
                processSeawulfJob();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void processLocalJob() {
        if (currentJobId > -1) {
            Job job = getJob(currentJobId);
            System.out.println("[LOCAL] Job #" + job.getId() + " finished\n");

            // generate summary file here

            job.setStatus(Status.COMPLETE);
            jobDao.updateJob(job);
            currentJobProcess = null;
            currentJobId = -1;
            startNextJob();
        }
    }

    public void processSeawulfJob() throws IOException, InterruptedException {
        if (currentJobId > -1) {
            Job job = getJob(currentJobId);
            System.out.println("[SEAWULF] Job #" + job.getId() + " finished\n");

            Process p = dispatchHandler.extractSeawulfDistrictings(job.getId(), job.getNumDistrictings());
            p.waitFor();

            // all districting.jsons are in jobs/job#/...
            String command = "python src/main/resources/algorithm/analyze.py "
                    + job.getId() + " "
                    + job.getState().toString() + " "
                    + job.getNumDistrictings();

            Process a = Runtime.getRuntime().exec(command);
            a.waitFor();

            job.setStatus(Status.COMPLETE);
            jobDao.updateJob(job);
            currentJobProcess = null;
            currentJobId = -1;

            startNextJob();
        }
    }
}
