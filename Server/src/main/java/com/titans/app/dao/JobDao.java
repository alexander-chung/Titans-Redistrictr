package com.titans.app.dao;

import com.titans.app.entity.Job;

import java.util.Collection;

public interface JobDao {
    int createJob(Job job);

    void updateJob(Job job);

    Collection<Job> getAllJobs();

    Job getJob(int jobId);

    String deleteJob(int jobId);

    void deleteJob(Job job);
}
