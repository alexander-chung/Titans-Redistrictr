import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function StateInformationDetailed({ currState }) {

    return (
        <div id="stateinformation">
            <Card>
                <Card.Header id="main-header" className="text-center font-weight-bold" >{currState.name10}</Card.Header>

                <ListGroup variant="flush">
                    <ListGroup.Item className="general-data pl-1">
                        <Card.Body className="pl-0 pr-0">
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

                    <ListGroup.Item className="general-data pl-1">
                        <Card.Title className="text-center font-weight-bold mt-3">Population</Card.Title>
                        <Card.Body className="pl-0 pr-0">
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Total:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.total_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">White:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.white_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Hispanic:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.hispanic_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">African American:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.african_AMERICAN_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Native American:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.native_AMERICAN_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Asian:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.asian_POP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Other:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.other_POP)}</Col>
                            </Row>
                        </Card.Body>
                    </ListGroup.Item>

                    <ListGroup.Item className="general-data pl-1">
                        <Card.Title className="text-center font-weight-bold mt-3">Voting Age Population</Card.Title>
                        <Card.Body className="pl-0 pr-0">
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Total:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.total_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">White:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.white_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Hispanic:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.hispanic_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">African American:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.african_AMERICAN_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Native American:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.native_AMERICAN_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Asian:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.asian_VAP)}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col sm={5} className="pr-0">Other:</Col> 
                                <Col sm={3} className="text-right p-0">{numberWithCommas(currState.other_VAP)}</Col>
                            </Row>
                        </Card.Body>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}