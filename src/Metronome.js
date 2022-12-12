import React, { Component, useState } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import { TaskTimer } from 'tasktimer';
let baseInterval = 200 // 30 ms is smallest interval
const timer = new TaskTimer(baseInterval);

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const click1 = "//daveceddia.com/freebies/react-metronome/click1.wav";
const click2 = "//daveceddia.com/freebies/react-metronome/click2.wav";
const click = new Audio(click1);
timer.on('tick', () => {
    click.play();
    // stop timer (and all tasks) after 1 hour
    if (timer.tickCount >= 360) timer.stop();
});

export default function Metronome() {
    const minBPM = 40;
    const maxBPM = 240;
    const scoreCutoff = 10; // percentage range for win condition
    const [low, setLow] = useState(0);
    const [on, setOn] = useState(0);
    const [high, setHigh] = useState(0);
    const [bpm, setBPM] = useState(120);
    const [guess, setGuess] = useState(80);

    const genNewBPM = () =>{
        let currBPM = Math.floor(Math.random() * (maxBPM - minBPM) + minBPM);
        console.log(currBPM);
        setBPM(currBPM);
        return currBPM;
    }

    const onClick = () => {
        console.log("onClick")
        console.log(timer)
        if (timer.state == "running") {
            timer.stop();
        } else {
            timer.interval = (60/genNewBPM())*1000;
            timer.start();
        }
    };

    const handleSubmit = event => {
        console.log("handleSubmit")
        event.preventDefault();
        let percDiff = Math.trunc((guess - bpm) / bpm * 100);
        if (Math.abs(percDiff) < scoreCutoff) {
            setOn(on + 1);
            timer.stop();
        }
        else if (percDiff < 0) setLow(low + 1);
        else setHigh(high + 1);
    }

    const handleInputChange = event => setGuess(event.target.value);

    return (
        <Container fluid="sm">
            <div>
                <Button id="playButton" onClick={onClick}>{timer.state == "running" ? "stop" : "start"}</Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Label>BPM Guess {guess}</Form.Label>
                <Form.Range min={minBPM} max={maxBPM} onChange={handleInputChange} />
                <Button type="submit">Submit</Button>
            </Form>

            <Scorecard high={high} low={low} on={on} />
        </Container>
    );
}
