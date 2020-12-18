package com.titans.app.controller;

import com.titans.app.dao.MapDao;
import com.titans.app.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import com.titans.app.handler.JobHandler;
import com.titans.app.entity.Job;
import com.titans.app.enums.StateEnum;
import com.titans.app.enums.Status;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:3000")
@RestController("/job")
public class JobController {
    private StateEnum selectedState;
    @Autowired
    private JobHandler jobHandler;
    @Autowired
    private MapDao mapDao;

    @GetMapping("/selectState")
    public @ResponseBody State selectState(@RequestParam StateEnum state) {
        selectedState = state;
        return mapDao.getState(state);
    }

    @GetMapping("/getJob")
    public ResponseEntity<Job> getJob(@RequestParam int id) {
        Job j = jobHandler.getJob(id);
        if(j != null) {
            return new ResponseEntity<>(j, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(j, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getJobStatus")
    public ResponseEntity<Status> getJobStatus(@RequestParam int id) {
        Status s = jobHandler.getJobStatus(id);
        if(s != null) {
            return new ResponseEntity<>(s, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(s, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getJobHistory")
    public Collection<Job> getJobHistory() {
        return jobHandler.getJobHistory();
    }

    @PostMapping("/createJob")
    public ResponseEntity<Integer> createJob(@RequestBody Job job) {
        int jobId = jobHandler.createJob(job, selectedState);
        return ResponseEntity.ok(jobId);
    }

    @DeleteMapping("/cancelJob")
    public ResponseEntity<String> cancelJob(@RequestParam int id) {
        boolean success = jobHandler.cancelJob(id);
        if(success) {
            return ResponseEntity.ok("job canceled");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteJob")
    public ResponseEntity<String> deleteJob(@RequestParam int id) {
        boolean success = jobHandler.deleteJob(id);
        if(success) {
            return ResponseEntity.ok("job deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
