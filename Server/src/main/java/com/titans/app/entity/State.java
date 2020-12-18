package com.titans.app.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.titans.app.enums.StateEnum;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class State {
    @Id
    @Enumerated(EnumType.STRING)
    private StateEnum STATEENUM;
    private String GEOID10;
    private String NAME10;
    private int TOTAL_POP;
    private int WHITE_POP;
    private int HISPANIC_POP;
    private int AFRICAN_AMERICAN_POP;
    private int NATIVE_AMERICAN_POP;
    private int ASIAN_POP;
    private int OTHER_POP;
    private int TOTAL_VAP;
    private int WHITE_VAP;
    private int HISPANIC_VAP;
    private int AFRICAN_AMERICAN_VAP;
    private int NATIVE_AMERICAN_VAP;
    private int ASIAN_VAP;
    private int OTHER_VAP;
    private int NUM_DISTRICTS;
    private int NUM_PRECINCTS;
    private float CENTER_LAT;
    private float CENTER_LON;
    private float ZOOM;

    public State() {

    }

    public StateEnum getSTATEENUM() {
        return STATEENUM;
    }

    public void setSTATEENUM(StateEnum STATEENUM) {
        this.STATEENUM = STATEENUM;
    }

    public String getGEOID10() {
        return GEOID10;
    }

    public void setGEOID10(String GEOID10) {
        this.GEOID10 = GEOID10;
    }

    public String getNAME10() {
        return NAME10;
    }

    public void setNAME10(String NAME10) {
        this.NAME10 = NAME10;
    }

    public int getTOTAL_POP() {
        return TOTAL_POP;
    }

    public void setTOTAL_POP(int TOTAL_POP) {
        this.TOTAL_POP = TOTAL_POP;
    }

    public int getWHITE_POP() {
        return WHITE_POP;
    }

    public void setWHITE_POP(int WHITE_POP) {
        this.WHITE_POP = WHITE_POP;
    }

    public int getHISPANIC_POP() {
        return HISPANIC_POP;
    }

    public void setHISPANIC_POP(int HISPANIC_POP) {
        this.HISPANIC_POP = HISPANIC_POP;
    }

    public int getAFRICAN_AMERICAN_POP() {
        return AFRICAN_AMERICAN_POP;
    }

    public void setAFRICAN_AMERICAN_POP(int AFRICAN_AMERICAN_POP) {
        this.AFRICAN_AMERICAN_POP = AFRICAN_AMERICAN_POP;
    }

    public int getNATIVE_AMERICAN_POP() {
        return NATIVE_AMERICAN_POP;
    }

    public void setNATIVE_AMERICAN_POP(int NATIVE_AMERICAN_POP) {
        this.NATIVE_AMERICAN_POP = NATIVE_AMERICAN_POP;
    }

    public int getASIAN_POP() {
        return ASIAN_POP;
    }

    public void setASIAN_POP(int ASIAN_POP) {
        this.ASIAN_POP = ASIAN_POP;
    }

    public int getOTHER_POP() {
        return OTHER_POP;
    }

    public void setOTHER_POP(int OTHER_POP) {
        this.OTHER_POP = OTHER_POP;
    }

    public int getTOTAL_VAP() {
        return TOTAL_VAP;
    }

    public void setTOTAL_VAP(int TOTAL_VAP) {
        this.TOTAL_VAP = TOTAL_VAP;
    }

    public int getWHITE_VAP() {
        return WHITE_VAP;
    }

    public void setWHITE_VAP(int WHITE_VAP) {
        this.WHITE_VAP = WHITE_VAP;
    }

    public int getHISPANIC_VAP() {
        return HISPANIC_VAP;
    }

    public void setHISPANIC_VAP(int HISPANIC_VAP) {
        this.HISPANIC_VAP = HISPANIC_VAP;
    }

    public int getAFRICAN_AMERICAN_VAP() {
        return AFRICAN_AMERICAN_VAP;
    }

    public void setAFRICAN_AMERICAN_VAP(int AFRICAN_AMERICAN_VAP) {
        this.AFRICAN_AMERICAN_VAP = AFRICAN_AMERICAN_VAP;
    }

    public int getNATIVE_AMERICAN_VAP() {
        return NATIVE_AMERICAN_VAP;
    }

    public void setNATIVE_AMERICAN_VAP(int NATIVE_AMERICAN_VAP) {
        this.NATIVE_AMERICAN_VAP = NATIVE_AMERICAN_VAP;
    }

    public int getASIAN_VAP() {
        return ASIAN_VAP;
    }

    public void setASIAN_VAP(int ASIAN_VAP) {
        this.ASIAN_VAP = ASIAN_VAP;
    }

    public int getOTHER_VAP() {
        return OTHER_VAP;
    }

    public void setOTHER_VAP(int OTHER_VAP) {
        this.OTHER_VAP = OTHER_VAP;
    }

    public int getNUM_DISTRICTS() {
        return NUM_DISTRICTS;
    }

    public void setNUM_DISTRICTS(int NUM_DISTRICTS) {
        this.NUM_DISTRICTS = NUM_DISTRICTS;
    }

    public int getNUM_PRECINCTS() {
        return NUM_PRECINCTS;
    }

    public void setNUM_PRECINCTS(int NUM_PRECINCTS) {
        this.NUM_PRECINCTS = NUM_PRECINCTS;
    }

    public float getCENTER_LAT() {
        return CENTER_LAT;
    }

    public void setCENTER_LAT(float CENTER_LAT) {
        this.CENTER_LAT = CENTER_LAT;
    }

    public float getCENTER_LON() {
        return CENTER_LON;
    }

    public void setCENTER_LON(float CENTER_LON) {
        this.CENTER_LON = CENTER_LON;
    }

    public float getZOOM() {
        return ZOOM;
    }

    public void setZOOM(float ZOOM) {
        this.ZOOM = ZOOM;
    }
}
