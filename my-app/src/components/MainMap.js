import React, {Component} from 'react';
import {Map, GeoJSON, TileLayer, LayersControl, } from 'react-leaflet';
import statesData from '../data/states.json';

// import FloridaDistrictData from '../data/FloridaDistrictData.json';
// import TexasDistrictData from '../data/TexasDistrictData.json';
// import NorthCarolinaDistrictData from '../data/NorthCarolinaDistrictData.json';

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
            heatmapFilter: 0, // 0 for none, 1 for black, 2 for hispanic, 3 for native, 4 for asian
            hoveringDistrict: false,
            hoveringPrecinct: false
        }
    }

    highlightState = (e) => {
        let layer = e.target;
        layer.setStyle({weight: 5, color: '#3388ff', dashArray: '', fillOpacity: 0.2});
    }

    resetHighlightState = (e) => {
        let layer = e.target;
        layer.setStyle({fillColor: "#3388ff", weight: 3, color: "#3388ff", fillOpacity: 0.2});
    }

    enlargeState = (e, name) => {
        let layer = e?.target;
        this.setState({
            precinctFilter: false,
            heatmapFilter: 0
        });
        if ((layer && layer.feature.properties.NAME10 === "Texas") || name === "TX") {
            this.props.selectState(-1);
            this.props.selectState(1);
            this.setState(state => ({
                center: [31.968599, -99.901810],
                zoom: 6,
                currentState: "TX"
            }));
        } else if ((layer && layer.feature.properties.NAME10 === "Florida") || name === "FL") {
            this.props.selectState(-1);
            this.props.selectState(0);
            this.setState(state => ({
                center: [27.664827, -81.515755],
                zoom: 7,
                currentState: "FL"
            }));
        } else if ((layer && layer.feature.properties.NAME10 === "North Carolina") || name === "NC") {
            this.props.selectState(-1);
            this.props.selectState(2);
            this.setState(state => ({
                center: [35.759575, -79.019302],
                zoom: 7,
                currentState: "NC"
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
        });
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
            heatmapFilter: 0,
            precinctFilter: !this.state.precinctFilter
        })
    }

    handleFilterHeatmap = (e, race) => {
        if(this.state.heatmapFilter !== 0 || this.state.precinctFilter === true) {
            this.setState({
                heatmapFilter: 0,
                precinctFilter: false
            });
        }
        switch(race){
            case "black":
                this.setState({ heatmapFilter: 1 });
                break;
            case "hispanic":
                this.setState({ heatmapFilter: 2 });
                break;
            case "native":
                this.setState({ heatmapFilter: 3 });
                break;
            case "asian":
                this.setState({ heatmapFilter: 4 });
                break;
            default:
                this.setState({ heatmapFilter: 0 });   
        }
    }

    getColorByState = (feature) => {
        if(this.props.currState){
            if(this.state.heatmapFilter === 1) {
                let p = feature.properties.PERCENT_AFRICAN_AMERICAN
                return p > 50 ? '#800026': p > 30 ? '#BD0026': p > 25 ? '#E31A1C': p > 20 ? '#FC4E2A': p > 15 ? '#FD8D3C': p > 10 ? '#FEB24C': p > 5  ? '#FED976': '#FFEDA0'
            }else if(this.state.heatmapFilter === 2) {
                let p = feature.properties.PERCENT_HISPANIC
                return p > 50 ? '#800026': p > 30 ? '#BD0026': p > 25 ? '#E31A1C': p > 20 ? '#FC4E2A': p > 15 ? '#FD8D3C': p > 10 ? '#FEB24C': p > 5  ? '#FED976': '#FFEDA0'
            }else if(this.state.heatmapFilter === 3){
                let p = feature.properties.PERCENT_NATIVE_AMERICAN
                return p > 50 ? '#800026': p > 30 ? '#BD0026': p > 25 ? '#E31A1C': p > 20 ? '#FC4E2A': p > 15 ? '#FD8D3C': p > 10 ? '#FEB24C': p > 5  ? '#FED976': '#FFEDA0'
            }else{
                let p = feature.properties.PERCENT_ASIAN
                return p > 50 ? '#800026': p > 30 ? '#BD0026': p > 25 ? '#E31A1C': p > 20 ? '#FC4E2A': p > 15 ? '#FD8D3C': p > 10 ? '#FEB24C': p > 5  ? '#FED976': '#FFEDA0'
            }

        }
    }

    heatmapStyle = (feature) => {
        return {
            fillColor: this.getColorByState(feature),
            weight: 0.25,
            opacity: 1,
            color: 'black',
            dashArray: '',
            fillOpacity: 0.9
        }
    }


    componentDidMount(){
        // this.setState(this.state);   
    }

    componentDidUpdate(prevProps) {
        if((prevProps.currState && this.props.currState && prevProps.currState.state !== this.props.currState.state) 
            || (!prevProps.currState && this.props.currState && this.props.currState.state !== "")) {
            this.enlargeState(null, this.props.currState.state);
        }
    }


    render() {

        const stateMapStyle = { fillColor: "#3388ff", weight: 2, color: "#3388ff", fillOpacity: 0.2 };
        const districtMapStyle = { fillColor: "#3388ff", weight: 1, color: "#3388ff", fillOpacity: 0.2 };
        const precinctMapStyle = { fillColor: "#3388ff", weight: 0.5, color: "#3388ff", fillOpacity: 0.2 };
        
        return (
            <div>
                <Map className="main-map" style={{height: "100vh", width: "76.5vw"}} zoom={this.state.zoom} center={this.state.center} onDragend={this.handleDrag}>
                    <Control position="topleft">
                        <ButtonGroup style={{border: "1px gray solid", borderRadius: "5px"}} vertical className="shadow-sm">
                            <Button variant={this.state.stateFilter?"secondary":"light"} onClick={this.handleFilterState}>State</Button>
                            <Button variant={this.state.districtFilter?"secondary":"light"} onClick={this.handleFilterDistrict} disabled={this.props.currState===null ? true : false}>District</Button>
                            <Button variant={this.state.precinctFilter?"secondary":"light"} onClick={this.handleFilterPrecinct} disabled={this.props.currState===null ? true : false}>Precinct</Button>
                        </ButtonGroup>
                    </Control>
                    <Control position="topleft">
                        <DropdownButton className="heatmap-button" variant="outline-dark" title="Heatmaps" disabled={this.props.currState===null ? true : false}>
                            <Dropdown.Item eventKey="1" onClick={(e) => this.handleFilterHeatmap(e, "black")}>African American</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={(e) => this.handleFilterHeatmap(e, "hispanic")}>Hispanic</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={(e) => this.handleFilterHeatmap(e, "native")}>Native American</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={(e) => this.handleFilterHeatmap(e, "asian")}>Asain</Dropdown.Item>
                        </DropdownButton>
                    </Control>
                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/acmapbox123/ckfow3j0u0j7q1atmfihmajzt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNtYXBib3gxMjMiLCJhIjoiY2tmb3c1ZWRxMDFwdzJwcGd1ODRod2QyMiJ9.TDi16CHQdzWmR2_KryLzvQ"
                        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                        />
                    {this.state.stateFilter ?
                        <GeoJSON style={stateMapStyle} data={statesData.features} onEachFeature={this.onEachState}/> : null}
                    {this.state.districtFilter ? <GeoJSON style={districtMapStyle} data={this.props.enactedDistricting} onEachFeature={this.onEachDistrict} /> : null}
                    {this.state.precinctFilter ? <GeoJSON style={precinctMapStyle} data={this.props.precinctData.features} onEachFeature={this.onEachPrecinct}/>: null}
                    {this.state.hoveringPrecinct === true ?
                        <Control>
                            <PrecinctInformation currPrecinct={this.state.currentPrecinct}/>
                        </Control>
                    : null}
                    {this.state.heatmapFilter !== 0 ?
                        <GeoJSON style={this.heatmapStyle} data={this.props.precinctData.features}/>
                    : null}
                 </Map>
            </div>
        );

    }
}
