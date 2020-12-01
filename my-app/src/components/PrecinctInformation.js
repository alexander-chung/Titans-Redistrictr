import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function precinctNameFix(precinctName) {
    return precinctName.split('-')[0]
}

export default function PrecinctInformation(props) {
    return (
        <div id="districtinformation">
            <Card className="shadow">
                <Card.Header className="card-district text-center" >Precinct {props.currPrecinct.ID}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className="pl-0">
                        <Row className="justify-content-md-center">
                            <Col sm={5} className="pr-0">Precinct Name:</Col> 
                            <Col sm={3} className="text-right p-0">{precinctNameFix(props.currPrecinct.NAME10)}</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col sm={5} className="pr-0">County:</Col> 
                            <Col sm={3} className="text-right p-0">{props.currPrecinct.COUNTY}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Card.Body className="p-1">
                            <Card.Title className="text-center"> Population</Card.Title>

                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Total</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.TOTAL_POP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">White</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.WHITE_POP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">African American</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.AFRICAN_AMERICAN_POP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Hispanic</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.HISPANIC_POP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Asian</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.ASIAN_POP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Other</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.OTHER_POP)}</Col>
                                </Row>
                            
                            <br/>
                            <Card.Title className="text-center"> Voting Age Population</Card.Title>

                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Total</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.TOTAL_VAP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">White</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.WHITE_VAP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">African American</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.AFRICAN_AMERICAN_VAP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Hispanic</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.HISPANIC_VAP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Asian</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.ASIAN_VAP)}</Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col sm={5} className="p-0">Other</Col> 
                                    <Col sm={3} className="text-right p-0">{numberWithCommas(props.currPrecinct.OTHER_VAP)}</Col>
                                </Row>

                        </Card.Body>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}