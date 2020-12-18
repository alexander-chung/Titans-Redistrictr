package com.titans.app.algoEntity;

import java.util.ArrayList;

public class Precinct {
    private int id;
    private ArrayList<Precinct> neighbors;
    private int countyId;
    
    public Precinct(){

    }

    public int getId(){
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<Precinct> getNeighbors(){
        return neighbors;
    }

    public void setNeighbors(ArrayList<Precinct> neighbors){
        this.neighbors = neighbors;
    }

    public int getCountyId(){
        return countyId;
    }

    public void setCountyId(int countyId) {
        this.countyId = countyId;
    }
}
