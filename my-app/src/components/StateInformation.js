import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Legend, Cell } from 'recharts';

const colors = [
    "#f77976",
    "#33a8c7",
    "#a0e426",
    "#52e3e1",
    "#ffab00",
    "#ff05ff",
    "#f050ae",
    "#d883ff",
    "#9336fd"
]

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const RADIAN = Math.PI / 180;

function DemoSection(props) {
    return (
        <Card.Body className="pt-0 pl-2">
            <PieChart width={400} height={450}>
                <Pie data={props.data} dataKey="value" nameKey="name" labelLine={false} animationBegin={0} animationDuration={350}>
                    {props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]}/>)}
                </Pie>
                <Legend layout="horizontal" align="center" verticalAlign="bottom"/>
            </PieChart>
        </Card.Body>
    );
}

function demographicPercent(minorityPop, totalPop){
    return Math.floor((minorityPop/totalPop) * 100) 
}

export default function StateInformation({ currState }) {

    const data = [];
    // for (const [key, prop] of Object.entries(demographics)) {
    //     var dataPair = {"name" : key, "value" : prop};
    //     data.push(dataPair);
    // }
    data.push({"name" : "White", "value" : demographicPercent(currState.white_POP, currState.total_POP)})
    data.push({"name" : "African American", "value" : demographicPercent(currState.african_AMERICAN_POP, currState.total_POP)})
    data.push({"name" : "Hispanic", "value" : demographicPercent(currState.hispanic_POP, currState.total_POP)})
    data.push({"name" : "Asian", "value" : demographicPercent(currState.asian_POP, currState.total_POP)})
    data.push({"name" : "Native American", "value" : demographicPercent(currState.native_AMERICAN_POP, currState.total_POP)})
    data.push({"name" : "Other", "value" : demographicPercent(currState.other_POP, currState.total_POP)})



    return (
        <div id="stateinformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold" >{currState.name10}</Card.Header>

                <ListGroup variant="flush">
                    <ListGroup.Item className="general-data pl-1">
                        <Card.Body className="pl-0 pr-0">
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Population:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.total_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Districts:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.num_DISTRICTS)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Precincts:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.num_PRECINCTS)}</Col>
                            </Row>
                        </Card.Body>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Card.Title className="text-center font-weight-bold mt-3">Demographics</Card.Title>
                        <DemoSection data={data} />
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}