import React, { useState } from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Legend, Cell } from 'recharts';

const colors = [
    "#f77976",
    "#33a8c7",
    "#a0e426",
    "#52e3e1",
    "#ffab00",
    "#f77976",
    "#f050ae",
    "#d883ff",
    "#9336fd"
]

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function DemoSection(props) {
    return (
        <Card.Body className="pt-0 pl-2">
            <PieChart width={400} height={450}>
                <Pie data={props.data} dataKey="value" nameKey="name" labelLine={false} label={renderCustomizedLabel} animationBegin={0} animationDuration={350}>
                    {props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]}/>)}
                </Pie>
                <Legend layout="horizontal" align="center" verticalAlign="bottom"/>
            </PieChart>
        </Card.Body>
    );
}

/**
 * props:
 * state - name of state
 * numDistricts
 * numPrecincts
 * demographics - [{"name": "White", "value": "321321"}, ..]
 */

export default function StateInformation({ state, numDistricts, numPrecincts, demographics }) {

    // const [mystate] = useState(props.state);
    // const [numDistricts] = useState(props.numDistricts);
    // const [numPrecincts] = useState(props.numPrecincts);
    // const [demographics] = useState(props.demographics);

    // const [stateRV, setStateRV] = useState(true);

    // change demographic data into data that can be displayed
    const data = [];
    for (const [key, prop] of Object.entries(demographics)) {
        var dataPair = {"name" : key, "value" : prop};
        data.push(dataPair);
    }

    return (
        <div id="stateinformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold" >{state}</Card.Header>

                <ListGroup variant="flush">
                    <ListGroup.Item className="general-data pl-1">
                        <Card.Body className="pl-0 pr-0">
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Population:</Col> 
                                <Col sm={3} className="text-right p-0">21.48 mil</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Districts:</Col> 
                                <Col sm={3} className="text-right p-0">{numDistricts}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Precincts:</Col> 
                                <Col sm={3} className="text-right p-0">{numPrecincts}</Col>
                            </Row>
                        </Card.Body>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Card.Title className="text-center font-weight-bold mt-3">Demographics</Card.Title>
                        {/* <Card.Text className="text-center mt-4 mb-0">
                            <Button variant={(!stateRV ? "outline-" : "") + "info"} onClick={() => setStateRV(true)}>Ethnic</Button>{' '}
                            <Button variant={(stateRV ? "outline-" : "") + "info"} onClick={() => setStateRV(false)}>Voting</Button>
                        </Card.Text> */}

                        <DemoSection data={data} />

                        {/* {stateRV ? 
                            <DemoSection
                                data={demographics.racial}
                            />
                            :
                            <DemoSection
                                data={demographics.voting}
                            />
                        }    */}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}