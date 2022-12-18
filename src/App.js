import React from "react";
import Metronome from "./Metronome";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function App() {
  return (
    <Container fluid="sm">
      <Row>
        <Col className="filler"/>
        <Col  className="app align-self-end" md={4} lg={5}>
          <header>
            <h1>BPM Trainer</h1>
            <h4>by Dylan Jordan</h4>
          </header>
          <Metronome />
        </Col>
        <Col className="filler"/>
      </Row>
    </Container>
  );
}