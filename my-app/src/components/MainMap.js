import React, {Component} from 'react';
import {Map, GeoJSON, TileLayer, LayersControl, } from 'react-leaflet';
import statesData from '../data/states.json';

import floridaDistrictData from '../data/floridaDistrictData.json';
import texasDistrictData from '../data/texasDistrictData.json';
import northCarolinaDistrictData from '../data/northCarolinaDistrictData.json';

import NorthCarolinaPrecinctData from '../data/NorthCarolinaPrecinctData.json';
import FloridaPrecinctData from '../data/FloridaPrecinctData.json';
import TexasPrecinctData from '../data/TexasPrecinctData.json';


import Control from 'react-leaflet-control';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap'; 
import PrecinctInformation from './PrecinctInformation';

import 'leaflet/dist/leaflet.css';


export default class MainMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [37.090240, -95.712891],
            zoom: 5,
            currentState: "",
            currentDistrict: "",
            currentPrecinct: "",
            stateFilter: true,
            districtFilter: false,
            precinctFilter: false,
            hoveringDistrict: false,
            hoveringPrecinct: false
        }
    }

    highlightState = (e) => {
        let layer = e.target;
        // const stateName = layer.feature.properties.NAME
        layer.setStyle({weight: 5, color: '#3388ff', dashArray: '', fillOpacity: 0.2});
    }

    resetHighlightState = (e) => {
        let layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 3, color: "#3388ff", fillOpacity: 0.2});
    }

    enlargeState = (e, name) => {
        let layer = e?.target;
        if ((layer && layer.feature.properties.NAME === "Texas") || name === "TX") {
            this.props.selectState(-1);
            this.props.selectState(1);
            this.setState(state => ({
                center: [31.968599, -99.901810],
                zoom: 6,
                currentState: "TX"
            }));
            
        } else if ((layer && layer.feature.properties.NAME === "Florida") || name === "FL") {
            this.props.selectState(-1);
            this.props.selectState(0);
            this.setState(state => ({
                center: [27.664827, -81.515755],
                zoom: 7,
                currentState: "FL"
            }));
        } else if ((layer && layer.feature.properties.NAME === "North Carolina") || name === "NC") {
            this.props.selectState(-1);
            this.props.selectState(2);
            this.setState(state => ({
                center: [35.759575, -79.019302],
                zoom: 7,
                currentState:"NC"
            }));
        }
    }


    onEachState = (state, layer) => {
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

    onEachPrecinct = (precinct, layer) => {
        layer.on({
            mouseover: this.highlightPrecinct, 
            mouseout: this.resetHighlightPrecinct
        })
    }

    highlightDistrict = (e) => {
        let layer = e.target;
        layer.setStyle({weight: 1.5, color: '#3388ff', dashArray: '', fillOpacity: 0.3});
        this.setState({
            hoveringDistrict: true,
        })
    }

    resetHighlightDistrict = (e) => {
        let layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.2});
        this.setState({
            hoveringDistrict: false,
        })
    }

    highlightPrecinct = (e) => {
        let layer = e.target;
        layer.setStyle({weight: 1.5, color: '#3388ff', dashArray: '', fillOpacity: 0.3});
        this.setState({
            hoveringPrecinct: true,
            currentPrecinct: layer.feature.properties
        })
    }

    resetHighlightPrecinct = (e) => {
        let layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.2});
        this.setState({
            hoveringPrecinct: false,
        })
    }
    

    handleDrag = (e) => {
        let layer = e.target;
        this.setState({
            center: layer.getCenter(),
            zoom: layer.getZoom()
        })
    }

    handleFilterState = (e) => {
        this.setState({
            stateFilter: !this.state.stateFilter
        })
    }

    handleFilterDistrict = (e) => {
        this.setState({
            districtFilter: !this.state.districtFilter
        })
    }
    
    handleFilterPrecinct = (e) => {
        this.setState({
            precinctFilter: !this.state.precinctFilter
        })
    }

    componentDidMount(){
        // this.setState(this.state);   
    }

    componentDidUpdate(prevProps) {
        // console.table(this.props);
        if((prevProps.currState && this.props.currState && prevProps.currState.state !== this.props.currState.state) 
            || (!prevProps.currState && this.props.currState && this.props.currState.state !== "")) {
            this.enlargeState(null, this.props.currState.state);
        }
    }

    getColor = (percent) => {

    }

    render() {

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
            fillOpacity: 0.2,
        };

        const precinctMapStyle = {
            fillColor: "#3388ff",
            weight: 0.5,
            color: "#3388ff",
            fillOpacity: 0.2,
        };

        function heatMapStyle(feature) {
            fillColor: this.getColor(feature)
        }
    
        return (
            <div>
                <Map className="main-map" style={{height: "100vh", width: "76.5vw"}} zoom={this.state.zoom} center={this.state.center} onDragend={this.handleDrag}>
                    <Control position="topleft">
                        <ButtonGroup style={{border: "1px gray solid", borderRadius: "5px"}} vertical className="shadow-sm">
                            <Button variant={this.state.stateFilter?"secondary":"light"} onClick={this.handleFilterState}>State</Button>
                            <Button variant={this.state.districtFilter?"secondary":"light"} onClick={this.handleFilterDistrict}>District</Button>
                            <Button variant={this.state.precinctFilter?"secondary":"light"} onClick={this.handleFilterPrecinct} disabled={this.props.currState===null ? true : false}>Precinct</Button>
                        </ButtonGroup>
                    </Control>
                    <Control position="topleft">
                        <DropdownButton className="heatmap-button" variant="outline-dark" title="Heatmaps" disabled={this.props.currState===null ? true : false}>
                            <Dropdown.Item eventKey="1">African American</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Hispanic</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Native American</Dropdown.Item>
                            <Dropdown.Item eventKey="4">Asain</Dropdown.Item>
                        </DropdownButton>
                    </Control>
                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/acmapbox123/ckfow3j0u0j7q1atmfihmajzt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNtYXBib3gxMjMiLCJhIjoiY2tmb3c1ZWRxMDFwdzJwcGd1ODRod2QyMiJ9.TDi16CHQdzWmR2_KryLzvQ"
                        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                        />
                    {this.state.stateFilter ?
                        <GeoJSON style={stateMapStyle}
                            data={statesData.features}
                            onEachFeature={this.onEachState}
                            /> : null}
                    {this.state.districtFilter ?
                        <div>
                            <GeoJSON 
                                style={districtMapStyle} 
                                data={texasDistrictData.features}    
                                onEachFeature={this.onEachDistrict}  
                                />             
                            <GeoJSON 
                                style={districtMapStyle} 
                                data={floridaDistrictData.features}
                                onEachFeature={this.onEachDistrict}               
                                />
                            <GeoJSON 
                                style={districtMapStyle} 
                                data={northCarolinaDistrictData.features}    
                                onEachFeature={this.onEachDistrict}               
                                />
                        </div> : null}
                    {this.state.precinctFilter && this.state.currentState === "TX" ? 
                        <GeoJSON 
                            style={precinctMapStyle} 
                            data={TexasPrecinctData.features}
                            onEachFeature={this.onEachPrecinct}               
                            />
                    : this.state.precinctFilter && this.state.currentState === "FL" ? 
                        <GeoJSON 
                            style={precinctMapStyle} 
                            data={FloridaPrecinctData.features}
                            onEachFeature={this.onEachPrecinct}               
                            />
                    : this.state.precinctFilter && this.state.currentState === "NC" ?
                        <GeoJSON 
                            style={precinctMapStyle} 
                            data={NorthCarolinaPrecinctData.features}
                            onEachFeature={this.onEachPrecinct}               
                            />
                    : null}
                    {this.state.hoveringPrecinct === true ?
                        <Control>
                            <PrecinctInformation 
                                currPrecinct={this.state.currentPrecinct}
                            />
                        </Control>
                    : null}
                 </Map>
            </div>
        );

    }
}
