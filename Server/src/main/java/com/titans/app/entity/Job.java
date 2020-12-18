package com.titans.app.entity;

import com.titans.app.enums.*;

import javax.persistence.*;

import java.util.Collection;

@Entity
public class Job {
    @Id
    @GeneratedValue
    private int id;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private StateEnum state;
    private int numDistrictings;
    private float populationDifference;
    @Enumerated(EnumType.STRING)
    private Compactness compactnessMeasure;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Collection<MinorityGroup> minorityGroups;
    @Enumerated(EnumType.STRING)
    private ComputeLocation computeLocation;

    public Job() {
    }

    @Override
    public String toString() {
        return "Job #" + id + "\n"
                + "State: " + state.toString() + "\n"
                + "Number of Districtings: " + numDistrictings + "\n"
                + "Compute Location: " + computeLocation.toString() + "\n";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public StateEnum getState() {
        return state;
    }

    public void setState(StateEnum state) {
        this.state = state;
    }

    public int getNumDistrictings() {
        return numDistrictings;
    }

    public void setNumDistrictings(int numDistrictings) {
        this.numDistrictings = numDistrictings;
    }

    public float getPopulationDifference() {
        return populationDifference;
    }

    public void setPopulationDifference(float populationDifference) {
        this.populationDifference = populationDifference;
    }

    public Compactness getCompactnessMeasure() {
        return compactnessMeasure;
    }

    public void setCompactnessMeasure(Compactness compactnessMeasure) {
        this.compactnessMeasure = compactnessMeasure;
    }

    public Collection<MinorityGroup> getMinorityGroups() {
        return minorityGroups;
    }

    public void setMinorityGroups(Collection<MinorityGroup> minorityGroups) {
        this.minorityGroups = minorityGroups;
    }

    public ComputeLocation getComputeLocation() {
        return computeLocation;
    }

    public void setComputeLocation(ComputeLocation computeLocation) {
        this.computeLocation = computeLocation;
    }
}