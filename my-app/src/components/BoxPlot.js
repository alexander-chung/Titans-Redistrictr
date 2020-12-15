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
                title: { text: "% Minority Voting Age Population per District" },
                axisY: { title: "% Minority Voting Age Population" },
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
            <div id="boxLegend">
                        <table id="boxTable" cellSpacing={0} style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                <td className="colour" id="box5" />
                                <td className="boxLabel" id="box5text">Enacted</td>  
                                </tr>
                                <tr>
                                <td className="colour" id="box4" />
                                <td className="boxLabel" id="box4text">Average</td> 
                                </tr>
                                <tr>
                                <td className="colour" id="box3" />
                                <td className="boxLabel" id="box3text">Extreme</td> 
                                </tr>
                                <tr>
                                <td className="colour" id="box2" />
                                <td className="boxLabel" id="box2text">Random1</td> 
                                </tr>
                                <tr>
                                <td className="colour" id="box1" />
                                <td className="boxLabel" id="box1text">Random2</td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
            <Button className="boxplot-close" variant="light" onClick={() => closePlot()}>✖️</Button>
        </div>
    )
}