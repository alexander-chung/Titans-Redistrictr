import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';


/**
 * TODO
 * add props - districtNumber, population, precincts
 */
export default function PrecinctInformation(props) {

    return (
        <div id="districtinformation">
            <Card className="shadow">
                <Card.Header className="card-district text-center">Precinct ##</Card.Header>
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
                            <Card.Title className="text-center"> Ethnic Demographics</Card.Title>

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
                            
                            <br/>
                            <Card.Title className="text-center"> Voting Demographics</Card.Title>
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

                        </Card.Body>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}