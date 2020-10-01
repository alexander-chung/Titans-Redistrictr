import React, {useState, useEffect, Component} from 'react';
import {Map, GeoJSON, TileLayer} from 'react-leaflet';
import statesData from '../data/states.json';
import floridaDistrictData from '../data/floridaDistrictData.json';
import floridaPrecinctData from '../data/floridaPrecinctData.json';
import texasDistrictData from '../data/texasDistrictData.json';
import northCarolinaDistrictData from '../data/northCarolinaDistrictData.json';
import Control from 'react-leaflet-control';
import { DropdownButton, Dropdown } from 'react-bootstrap'; 
import 'leaflet/dist/leaflet.css';


export default class MainMap extends Component {

    state = {
        center: [37.090240, -95.712891],
        zoom: 5,
        currentState: this.props.currState,
        // filter mode: state=0, district=1, precinct=2
        filterMode: 0,
    }

    highlightState = (e) => {
        var layer = e.target;
        const stateName = layer.feature.properties.NAME
        layer.setStyle({weight: 5, color: '#3388ff', dashArray: '', fillOpacity: 0.2});

    }

    resetHighlightState = (e) => {
        var layer = e.target;

        layer.setStyle({fillColor: "#3388ff", weight: 3, color: "#3388ff", fillOpacity: 0.2});
    }

    enlargeState = (e) => {
        var layer = e.target;
        if (layer.feature.properties.NAME == "Texas") {
            
            this.setState(state => ({
                center: [31.968599, -99.901810],
                currentState: "Texas",
                zoom: 6
            }));
            console.log(this.state.currentState)

        } else if (layer.feature.properties.NAME == "Florida") {
            this.setState(state => ({
                center: [27.664827, -81.515755],
                currentState: "Florida",
                zoom: 6
            }));
            console.log(this.state.currentState)


        } else if (layer.feature.properties.NAME == "North Carolina") {
            this.setState(state => ({
                center: [35.759575, -79.019302],
                currentState: "North Carolina",
                zoom: 6
            }));
            console.log(this.state.currentState)

        }
    }


    onEachState = (state, layer) => {
        const stateName = state.properties.NAME;

        layer.on({
            mouseover: this.highlightState, 
            mouseout: this.resetHighlightState, 
            click: this.enlargeState
        })
    }

    onEachDistrict = (district, layer) => {
        layer.on({
            mouseover: this.highlightDistrict, 
            mouseout: this.resetHighlightDistrict
        })
    }

    highlightDistrict = (e) => {
        var layer = e.target;
        layer.setStyle({weight: 1.5, color: '#3388ff', dashArray: '', fillOpacity: 0.2});
    }

    resetHighlightDistrict = (e) => {
        var layer = e.target;

        layer.setStyle({fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.1});
    }

    handleDrag = (e) => {
        var layer = e.target;
        this.setState({
            center: layer.getCenter(),
            zoom: layer.getZoom()
        })
    }

    handleFilterState = (e) => {
        this.setState({
            filterMode: 0
        });
    }

    handleFilterDistrict = (e) => {
        this.setState({
            filterMode: 1
        });
        console.log(this.state.filterMode)
    }
    
    handleFilterPrecinct = (e) => {
        this.setState({
            filterMode: 2
        });
    }

    componentDidMount(){
        this.setState(this.state);  
    }

    render() {

        const countriesMapStyle = {
            fillColor: "#808080",
            weight: 1,
            color: "black",
            fillOpacity: 1,
        }
    
    
        const stateMapStyle = {
            fillColor: "#3388ff",
            weight: 2,
            color: "#3388ff",
            fillOpacity: 0.2,
        };

        const districtMapStyle = {
            fillColor: "#3388ff",
            weight: 1,
            color: "#3388ff",
            fillOpacity: 0.1,
        };
    
        return (
            <div>
                <Map className="main-map" style={{height: "100vh", width: "76.5vw"}} zoom={this.state.zoom} center={this.state.center} onDragend={this.handleDrag}>
                    <Control position="topleft">
                            <DropdownButton
                                key={"right"}
                                id={`dropdown-button-drop-right`}
                                drop={"right"}
                                variant="secondary"
                                title={" Filter "}
                            >
                                <Dropdown.Item eventKey="1" onClick={this.handleFilterState}>State</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={this.handleFilterDistrict}>District</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={this.handleFilterPrecinct}>Precinct</Dropdown.Item>
                            </DropdownButton>
                        </Control>

                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/acmapbox123/ckfow3j0u0j7q1atmfihmajzt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNtYXBib3gxMjMiLCJhIjoiY2tmb3c1ZWRxMDFwdzJwcGd1ODRod2QyMiJ9.TDi16CHQdzWmR2_KryLzvQ"
                        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                        />
                    {this.state.filterMode == 0 ?
                    <GeoJSON style={stateMapStyle}
                        data={statesData.features}
                        onEachFeature={this.onEachState}
                        />
                    : null}
                    {this.state.filterMode == 1 ?
                    <div>
                        <GeoJSON 
                            style={stateMapStyle} 
                            data={texasDistrictData.features}    
                            onEachFeature={this.onEachDistrict}  
                            />             
                        <GeoJSON 
                            style={districtMapStyle} 
                            data={floridaDistrictData.features}
                            onEachFeature={this.onEachDistrict}               
                            />
                        <GeoJSON 
                            style={stateMapStyle} 
                            data={northCarolinaDistrictData.features}    
                            onEachFeature={this.onEachDistrict}               
                            />
                    </div>
                    : null}
                    {this.state.filterMode == 2 ? 
                    <GeoJSON 
                        style={districtMapStyle} 
                        data={floridaPrecinctData.features}
                        onEachFeature={this.onEachDistrict}               
                        />
                    : null}
                 </Map>
            </div>
        );

    }
}
