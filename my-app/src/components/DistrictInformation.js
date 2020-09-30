import React, { useState } from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';


/**
 * TODO
 * add props - districtNumber, population, precincts
 */
export default function DistrictInformation({ districtNumber, population, precincts }) {
    
    const [districtRV, setDistrictRV] = useState(true);

    return (
        <div id="districtinformation">
            <Card className="shadow">
                <Card.Header className="card-district text-center">District 14</Card.Header>
                <ListGroup variant="flush">

                    <ListGroup.Item className="pl-0">
                        <Row className="justify-content-md-center">
                            <Col sm={5} className="pr-0">Population:</Col> 
                            <Col sm={3} className="text-right p-0">762,506</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col sm={5} className="pr-0">Precincts:</Col> 
                            <Col sm={3} className="text-right p-0">50</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Card.Body className="p-1">
                            <Card.Title className="text-center">Demographics</Card.Title>

                            <Card.Text className="text-center mt-2">
                                <Button size="sm" variant={(!districtRV ? "outline-" : "") + "secondary"} onClick={() => setDistrictRV(true)}>Racial</Button>{' '}
                                <Button size="sm" variant={(districtRV ? "outline-" : "") + "secondary"} onClick={() => setDistrictRV(false)}>Voting</Button>
                            </Card.Text>

                            {districtRV ?
                                <div>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">White</Col> 
                                        <Col sm={3} className="text-right p-0">76.78%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Black</Col> 
                                        <Col sm={3} className="text-right p-0">13.81%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Black</Col> 
                                        <Col sm={3} className="text-right p-0">13.81%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Hispanic</Col> 
                                        <Col sm={3} className="text-right p-0">6.36%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Asian</Col> 
                                        <Col sm={3} className="text-right p-0">2.56%</Col>
                                    </Row>
                                </div>
                                :
                                <div>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Republican</Col> 
                                        <Col sm={3} className="text-right p-0">52.8%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Democratic</Col> 
                                        <Col sm={3} className="text-right p-0">25.7%</Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={5} className="p-0">Independent</Col> 
                                        <Col sm={3} className="text-right p-0">21.2%</Col>
                                    </Row>
                                </div>
                            }

                        </Card.Body>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}