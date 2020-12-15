import React from 'react';
import { Button } from 'react-bootstrap';
import CanvasJSReact from '../canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const minorityMapping = {
    "AFRICAN_AMERICAN" : "African American",
    "HISPANIC" : "Hispanic",
    "ASIAN" : "Asian",
    "NATIVE_AMERICAN" : "Native American"
}

export default function BoxPlot({boxData, closePlot, minorityGroups}) {
    return (
        <div className="boxplot shadow">
            <CanvasJSChart options={{
                animationEnabled: false,
                theme: "light2",
                defaultFontSize: 18,
                title: { text: "% Minority Voting Age Population per District", fontSize: 24 },
                axisY: { title: "% Minority Voting Age Population", labelFontSize: 18, titleFontSize: 18 },
                axisX: { title: "Districts", interval: 1, labelFontSize: 18, titleFontSize: 18 },
                height: 750,
                width: 1050,
                whiskerThickness: 1,
                data: [
                    {
                        type: "boxAndWhisker",
                        dataPoints: boxData.boxesData
                    },
                    {
                        type: "scatter",
                        toolTipContent: "{y}",
                        color: "#9acd32",
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
                        color: "#FF00FF",
                        dataPoints: boxData.enactedData
                    }

                ]
            }} />
            <div id="boxLegend">
                <table id="boxTable" cellSpacing={0} style={{width: '100%'}}>
                    <tbody>
                        <tr className="legend">
                        <td className="colour" id="box5" />
                        <td className="boxLabel" id="box5text">Enacted</td>  
                        </tr>
                        <tr className="legend">
                        <td className="colour" id="box4" />
                        <td className="boxLabel" id="box4text">Average</td> 
                        </tr>
                        <tr className="legend">
                        <td className="colour" id="box3" />
                        <td className="boxLabel" id="box3text">Extreme</td> 
                        </tr>
                        <tr className="legend">
                        <td className="colour" id="box2" />
                        <td className="boxLabel" id="box2text">Random1</td> 
                        </tr>
                        <tr className="legend">
                        <td className="colour" id="box1" />
                        <td className="boxLabel" id="box1text">Random2</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="legend-minority-groups">
                Minority Groups:
                {minorityGroups.map(group => 
                    <div>
                        {minorityMapping[group]}
                    </div>
                )}
            </div>
            <Button className="boxplot-close" variant="light" onClick={() => closePlot()}>✖️</Button>
        </div>
    )
}