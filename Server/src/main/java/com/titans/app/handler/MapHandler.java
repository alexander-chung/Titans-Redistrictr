package com.titans.app.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.titans.app.enums.StateEnum;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Service
public class MapHandler {
    public Object getPrecincts(StateEnum state) {
        String path;
        if (state == StateEnum.FL) {
            path = "/json/FL_Precincts.json";
        } else if (state == StateEnum.NC) {
            path = "/json/NC_Precincts.json";
        } else {
            path = "/json/TX_Precincts.json";
        }
        Resource resource = new ClassPathResource(path);
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(resource.getInputStream(), Object.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object getEnactedDistricting(StateEnum state) {
        String path;
        if (state == StateEnum.FL) {
            path = "/json/FL_Enacted_Districting.json";
        } else if (state == StateEnum.NC) {
            path = "/json/NC_Enacted_Districting.json";
        } else {
            path = "/json/TX_Enacted_Districting.json";
        }
        Resource resource = new ClassPathResource(path);
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(resource.getInputStream(), Object.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object getSummaryData(int jobid) {
        String path = "/jobs/job"+ jobid + "/job" + jobid + "_summary.json";
        Resource resource = new ClassPathResource(path);
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(resource.getInputStream(), Object.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object getBoxData(int jobid) {
        String path = "/jobs/job"+ jobid + "/job" + jobid + "_boxplot.json";
        Resource resource = new ClassPathResource(path);
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(resource.getInputStream(), Object.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
