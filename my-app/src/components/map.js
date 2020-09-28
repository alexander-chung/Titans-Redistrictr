import React, { useState, useEffect } from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import { L, geojson } from 'leaflet';
import statesData from './../data/states.json';
import precinctData from './../data/precinctData.json';
import floridaData from './../data/floridaData.json';
import texasData from './../data/texasData.json';
import northCarolinaData from './../data/northCarolinaData.json';
import countriesData from './../data/countriesData.json';
import 'leaflet/dist/leaflet.css';
import './map.css';


export default function MainMap(props) {
    const [center, setCenter] = useState([37.090240, -95.712891])
    const [zoom, setZoom] = useState(5)
    const [currentState, setCurrentState] = useState("none")
    const [layerStyle, setLayerStyle] = useState( {fillColor: "#c0c0c0",weight: 1.25,color: "black",fillOpacity: 1,})


    useEffect(() => {
        setZoom(5);
    }, [currentState]);

    const countriesMapStyle = {
        fillColor: "#808080",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    }

    const unitedStatesMapStyle = {
        fillColor: "#c0c0c0",
        weight: 1.25,
        color: "black",
        fillOpacity: 1,
    };

    const stateMapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    };

    function highlightFeature(e) {
        var layer = e.target;
        const stateName = layer.feature.properties.NAME
        if(stateName === "Texas" || stateName === "Florida" || stateName === "North Carolina"){
            layer.setStyle({
                weight: 5,
                color: '#154fe8',
                dashArray: '',
                fillOpacity: 0.7
            });
        }else{
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
        }

    }

    function resetHighlight(e) {
        var layer = e.target;
    
        layer.setStyle(layerStyle);
    }

    const enlargeState = (e) =>  {
        var layer = e.target;
        if(layer.feature.properties.NAME == "Texas"){
            setCurrentState("Texas");
            console.log(currentState);
            setCenter([31.968599, -99.901810]);
        
        }else if(layer.feature.properties.NAME == "Florida"){
            setCurrentState("Florida");
            console.log(currentState);
            setCenter([27.664827, -81.515755]);

        }else if(layer.feature.properties.NAME == "North Carolina"){
            setCurrentState("North Carolina");
            console.log(currentState);
            setCenter([35.759575, -79.019302])
        }
    }


    const onEachState = (state, layer) => {
        const stateName = state.properties.NAME;
        
        if(stateName == "Texas" || stateName == "Florida" || stateName == "North Carolina"){
            layer.bindPopup(`${stateName}`); 
        }
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: enlargeState
        })
    }


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>TEEN TITANS</h1>
            <Map style={{ height: "90vh" }} zoom={zoom} center={center}>
                <GeoJSON
                    style={countriesMapStyle}
                    data={countriesData.features}
                />
                <GeoJSON
                    style={unitedStatesMapStyle}
                    data={statesData.features}
                    onEachFeature={onEachState}
                />
                {currentState == "Texas" ?
                <GeoJSON 
                    style={stateMapStyle} 
                    data={texasData.features}                   
                /> : currentState == "Florida" ? 
                <GeoJSON 
                    style={stateMapStyle} 
                    data={floridaData.features}    
                /> : currentState == "North Carolina" ? 
                <GeoJSON 
                    style={stateMapStyle} 
                    data={northCarolinaData.features}    
                /> : null
                }
                
            </Map>
        </div>
    );
}