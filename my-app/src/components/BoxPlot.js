import React from 'react';
import { Button } from 'react-bootstrap';
import CanvasJSReact from '../canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
    animationEnabled: false,
    theme: "light2",
    title: { text: "Minority Representation Among Districts" },
    axisY: { title: "% Minority Representation" },
    height: 400,
    width: 780,
    whiskerThickness: 1,
    data: [
        {
            type: "boxAndWhisker",
            dataPoints: [
                // y: [min, Q1, Q3, Max, Median]
                { label: "District 1", y: [0.05, 0.10, 0.25, 0.30, 0.15] },
                { label: "District 2", y: [0.10, 0.15, 0.30, 0.35, 0.20] },
                { label: "District 3", y: [0.15, 0.20, 0.35, 0.40, 0.25] },
                { label: "District 4", y: [0.20, 0.25, 0.40, 0.45, 0.30] },
                { label: "District 5", y: [0.25, 0.30, 0.45, 0.50, 0.35] },
                { label: "District 6", y: [0.30, 0.35, 0.50, 0.55, 0.40] },
                { label: "District 7", y: [0.40, 0.45, 0.60, 0.65, 0.50] },
                { label: "District 8", y: [0.50, 0.55, 0.70, 0.75, 0.60] },
                { label: "District 9", y: [0.76, 0.80, 0.90, 0.95, 0.87] },
            ]
        },
        {
            type: "scatter",
            toolTipContent: "{y}",
            color: "green",
            dataPoints: [
                { x: 0, y: 0.18 },
                { x: 1, y: 0.23 },
                { x: 2, y: 0.28 },
                { x: 3, y: 0.33 },
                { x: 4, y: 0.38 },
                { x: 5, y: 0.43 },
                { x: 6, y: 0.53 },
                { x: 7, y: 0.63 },
                { x: 8, y: 0.84 },
            ]
        },
        {
            type: "scatter",
            toolTipContent: "{y}",
            color: "red",
            dataPoints: [
                { x: 0, y: 0.13 },
                { x: 1, y: 0.18 },
                { x: 2, y: 0.23 },
                { x: 3, y: 0.28 },
                { x: 4, y: 0.33 },
                { x: 5, y: 0.47 },
                { x: 6, y: 0.57 },
                { x: 7, y: 0.67 },
                { x: 8, y: 0.88 },
            ]
        }

    ]
};

export default function BoxPlot({closePlot}) {
    return (
        <div className="boxplot shadow">
            <CanvasJSChart options={options} />
            <Button className="boxplot-close" variant="light" onClick={() => closePlot()}>✖️</Button>
        </div>
    )
}