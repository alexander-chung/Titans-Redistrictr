package com.titans.app.algoEntity;

import java.util.ArrayList;

public class District{
    private int id;
    private ArrayList<Precinct> precincts;
    private ArrayList<Edge> spanningTree;
    private int numCounties;
    private int votingAgePopulation;
    private Boundary borders;

    public District(){

    }

    public int getId(){
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(ArrayList<Precinct> precincts) {
        this.precincts = precincts;
    }

    public ArrayList<Edge> getSpanningTree() {
        return spanningTree;
    }

    public void setSpanningTre(ArrayList<Edge> spanningTree) {
        this.spanningTree = spanningTree;
    }

    public int getNumCounties(){
        return numCounties;
    }

    public void setNumCounties(int numCounties) {
        this.numCounties = numCounties;
    }

    public int getVotingAgePopulation(){
        return votingAgePopulation;
    }

    public void setVotingAgePopulation(int votingAgePopulation) {
        this.votingAgePopulation = votingAgePopulation;
    }

    public Boundary getBorders(){
        return borders;
    }

    public void setBorders(Boundary borders){
        this.borders = borders;
    }

    public void calculateCounties(){

    }

    public void calculateGeometry(){
        
    }

}