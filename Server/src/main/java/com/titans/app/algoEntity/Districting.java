package com.titans.app.algoEntity;

import com.titans.app.enums.StateEnum;

import java.util.ArrayList;

public class Districting {
    private int id;
    private StateEnum state;
    private ArrayList<District> districts;
    
    public Districting(){

    }

    public int getId(){
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public StateEnum getState() {
        return state;
    }

    public void setState(StateEnum state) {
        this.state = state;
    }

    public ArrayList<District> getDistricts() {
        return districts;
    }

    public void setDistricts(ArrayList<District> districts) {
        this.districts = districts;
    }

    public float[] calculateBoxPlotValues(){
        float[] boxPlotValues = null;
        return boxPlotValues;
    }
}
