import React from 'react';
import CanvasJSReact from '../canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {};

export default function BoxPlot() {
    return (
        <CanvasJSChart options={options} />
    )
}