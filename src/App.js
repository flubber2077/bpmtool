import React from "react";
import Metronome from "./Metronome";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header><h1>BPM Trainer</h1></header>
      <Metronome />
    </div>
  );
}