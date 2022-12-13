import React, { Component, useState } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import click1 from "./click.mp3"
import {Howler, Howl} from "howler";
import { TaskTimer } from 'tasktimer';
const timer = new TaskTimer();

const click = new Howl({
    src: click1
});
timer.on('tick', () => {
    click.play();
    // stop timer (and all tasks) after 1 hour
    if (timer.tickCount >= 360) timer.stop();
});

export default function Metronome() {
    const minBPM = 50;
    const maxBPM = 240;
    const scoreCutoff = 10; // percentage range for win condition
    const [low, setLow] = useState(0);
    const [on, setOn] = useState(0);
    const [high, setHigh] = useState(0);
    const [bpm, setBPM] = useState();
    const [guess, setGuess] = useState((minBPM+maxBPM)/2);
    
    const genNewBPM = () =>{
        let currBPM = Math.floor(Math.random() * (maxBPM - minBPM) + minBPM);
        setBPM(currBPM);
        return currBPM;
    }
    const onClick = () => {
        if (timer.state === "running") {
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
                <Button id="playButton" onClick={onClick}>{timer.state === "running" ? "stop" : "start"}</Button>
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
