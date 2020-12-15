import React from 'react';
import { Button } from 'react-bootstrap';
import CanvasJSReact from '../canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BoxPlot({boxData, closePlot}) {
    return (
        <div className="boxplot shadow">
            <CanvasJSChart options={{
                animationEnabled: false,
                theme: "light2",
                title: { text: "Minority Representation Among Districts" },
                axisY: { title: "% Minority Representation" },
                axisX: { title: "Districts", interval: 1},
                height: 400,
                width: 780,
                whiskerThickness: 1,
                data: [
                    {
                        type: "boxAndWhisker",
                        dataPoints: boxData.boxesData
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "green",
                        dataPoints: boxData.averageData
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "red",
                        dataPoints: boxData.extremeData
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "black",
                        dataPoints: boxData.random1Data
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "#17a2b8",
                        dataPoints: boxData.random2Data
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "pink",
                        dataPoints: boxData.enactedData
                    }

                ]
            }} />
            <Button className="boxplot-close" variant="light" onClick={() => closePlot()}>✖️</Button>
        </div>
    )
}