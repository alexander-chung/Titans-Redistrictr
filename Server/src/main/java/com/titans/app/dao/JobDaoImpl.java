package com.titans.app.dao;

import com.titans.app.entity.Job;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Collection;

@Repository
@Transactional
public class JobDaoImpl implements JobDao {

    private EntityManager entityManager;
    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.entityManager = em;
    }

    @Override
    public int createJob(Job job) {
        entityManager.persist(job);
        return job.getId();
    }

    @Override
    public void updateJob(Job job) {
        entityManager.merge(job);
    }

    @Override
    public Collection<Job> getAllJobs(){
        Query query = entityManager.createQuery("SELECT u FROM Job u", Job.class);
        return query.getResultList();
    }

    @Override
    public Job getJob(int jobId){
        return entityManager.find(Job.class, jobId);
    }

    @Override
    public String deleteJob(int JobId) {
        Job job = entityManager.find(Job.class, JobId);
        if (job == null) {
            return "not found";
        } else {
            entityManager.remove(job);
            return "success";
        }
    }

    @Override
    public void deleteJob(Job job) {
        entityManager.remove(job);
    }
}
