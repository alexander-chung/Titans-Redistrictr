package com.titans.app.entity;

import com.titans.app.enums.StateEnum;

import javax.persistence.*;

@Entity
public class Summary {
    @Id
    private int jobId;
    private String stateName;
    @Enumerated(EnumType.STRING)
    private StateEnum stateEnum;
    private int averageDistricting;
    private int extremeDistricting;

    public Summary() {

    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public StateEnum getStateEnum() {
        return stateEnum;
    }

    public void setStateEnum(StateEnum stateEnum) {
        this.stateEnum = stateEnum;
    }

    public int getAverageDistricting() {
        return averageDistricting;
    }

    public void setAverageDistricting(int averageDistricting) {
        this.averageDistricting = averageDistricting;
    }

    public int getExtremeDistricting() {
        return extremeDistricting;
    }

    public void setExtremeDistricting(int extremeDistricting) {
        this.extremeDistricting = extremeDistricting;
    }
}
