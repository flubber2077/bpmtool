import React from "react";
import Metronome from "./Metronome";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function App() {
  return (
    <Container fluid="sm" >
      <Row>
        <Col className="app mx-auto" md={5}>
          <header>
            <Row className="justify-content-between">
              <Col xs={10} sm="auto"><h1>BPM Trainer</h1></Col>
              <Col xs="auto"><h1>by Dylan Jordan</h1></Col>
            </Row>
          </header>
          <Metronome />
        </Col>
      </Row>
    </Container>
  );
}