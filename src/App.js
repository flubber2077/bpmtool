import React from "react";
import Metronome from "./Metronome";
import Container from "react-bootstrap/Container";
// import "./App.css";

export default function App() {
  return (
    <Container fluid="sm">
      <header><h1>BPM Trainer</h1></header>
      <Metronome />
    </Container>
  );
}