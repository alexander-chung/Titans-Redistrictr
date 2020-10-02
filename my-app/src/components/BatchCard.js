import React, { useState } from 'react';
import { Card, Collapse, ListGroup, Button } from 'react-bootstrap';

export default function BatchCard({ batchNumber, config }) {
    const [open, setOpen] = useState(false);

    return (
        <Card className="batch-card shadow-sm mt-4">
            <Card.Header className="batch-card-heading">
                Batch {batchNumber}
                <Button variant="info" size="sm" className="batch-card-loadbutton">Load Results</Button>
            </Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item className="p-0">
                    <Card.Body className="batch-card-content">
                        <Card.Text>
                            <b> {config.state} </b> <br/>
                            {config.districtings} Districtings
                            <Button className="batch-card-button" variant="outline-secondary" size="sm" onClick={() => {setOpen(!open)}}>
                                Show {open?"Less":"More"}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>

                <Collapse in={open}>
                    <ListGroup.Item className="p-0">
                        <Card.Body className="batch-card-content">
                            <Card.Text>
                                Average
                            </Card.Text>
                        </Card.Body>
                    </ListGroup.Item>
                </Collapse>
            </ListGroup>
        </Card>
    );
}