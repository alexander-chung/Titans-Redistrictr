import React, {Component} from 'react';
import {Map, GeoJSON, TileLayer} from 'react-leaflet';
import statesData from '../data/states.json';
import floridaDistrictData from '../data/floridaDistrictData.json';
import floridaPrecinctData from '../data/floridaPrecinctData.json';
import texasDistrictData from '../data/texasDistrictData.json';
import northCarolinaDistrictData from '../data/northCarolinaDistrictData.json';
import Control from 'react-leaflet-control';
import { ButtonGroup, Button } from 'react-bootstrap'; 
import DistrictInformation from './DistrictInformation';
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
            stateFilter: true,
            districtFilter: false,
            precinctFilter: false,
            hoveringDistrict: false,
            hoveringPrecinct: false
        }
    }

    highlightState = (e) => {
        var layer = e.target;
        // const stateName = layer.feature.properties.NAME
        layer.setStyle({weight: 5, color: '#3388ff', dashArray: '', fillOpacity: 0.2});
        
    }

    resetHighlightState = (e) => {
        var layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 3, color: "#3388ff", fillOpacity: 0.2});
    }

    enlargeState = (e, name) => {
        var layer = e?.target;
        if ((layer && layer.feature.properties.NAME === "Texas") || name === "Texas") {
            this.props.selectState(-1);
            this.props.selectState(1);
            this.setState(state => ({
                center: [31.968599, -99.901810],
                zoom: 6,
                currentState: "Texas"
            }));
        } else if ((layer && layer.feature.properties.NAME === "Florida") || name === "Florida") {
            this.props.selectState(-1);
            this.props.selectState(0);
            this.setState(state => ({
                center: [27.664827, -81.515755],
                zoom: 7,
                currentState: "Florida"
            }));
        } else if ((layer && layer.feature.properties.NAME === "North Carolina") || name === "North Carolina") {
            this.props.selectState(-1);
            this.props.selectState(2);
            this.setState(state => ({
                center: [35.759575, -79.019302],
                zoom: 7,
                currentState: "North Carolina"
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
        var layer = e.target;
        layer.setStyle({weight: 1.5, color: '#3388ff', dashArray: '', fillOpacity: 0.3});
        this.setState({
            hoveringDistrict: true,
            currentDistrict: parseInt(layer.feature.properties.CD, 10)
        })
    }

    resetHighlightDistrict = (e) => {
        var layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.2});
        this.setState({
            hoveringDistrict: false,
        })
    }

    highlightPrecinct = (e) => {
        var layer = e.target;
        layer.setStyle({weight: 1.5, color: '#3388ff', dashArray: '', fillOpacity: 0.3});
        this.setState({
            hoveringPrecinct: true,
        })
    }

    resetHighlightPrecinct = (e) => {
        var layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.2});
        this.setState({
            hoveringPrecinct: false,
        })
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
    
        return (
            <div>
                <Map className="main-map" style={{height: "100vh", width: "76.5vw"}} zoom={this.state.zoom} center={this.state.center} onDragend={this.handleDrag}>
                    <Control position="topleft">
                        <ButtonGroup style={{border: "1px gray solid", borderRadius: "5px"}} vertical className="shadow-sm">
                            <Button variant={this.state.stateFilter?"secondary":"light"} onClick={this.handleFilterState}>State</Button>
                            <Button variant={this.state.districtFilter?"secondary":"light"} onClick={this.handleFilterDistrict}>District</Button>
                            <Button variant={this.state.precinctFilter?"secondary":"light"} onClick={this.handleFilterPrecinct}>Precinct</Button>
                        </ButtonGroup>
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
                    {this.state.precinctFilter ? 
                        <GeoJSON 
                            style={precinctMapStyle} 
                            data={floridaPrecinctData.features}
                            onEachFeature={this.onEachPrecinct}               
                            />
                    : null}
                    {this.state.hoveringDistrict === true ? 
                        <Control>
                            <DistrictInformation currDistrict={this.state.currentDistrict}/>
                        </Control>
                    : null}
                    {this.state.hoveringPrecinct === true ?
                        <Control>
                            <PrecinctInformation />
                        </Control>
                    : null}
                 </Map>
            </div>
        );

    }
}
