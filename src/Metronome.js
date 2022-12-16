import React, { useState } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import click1 from "./click.mp3";
import silence1 from "./silence.wav";
import { Howler, Howl } from "howler";
import { useInterval } from 'usehooks-ts'

const click = new Howl({
    src: click1,
    preload: true,
    onplayerror: () => alert('player error'),
    onloaderror: () => alert('load error')
});

const silence = new Howl({
    src: silence1,
    html5: true,
    loop: true,
    preload: true
});

export default function Metronome() {
    const minBPM = 40;
    const maxBPM = 240;
    const scoreCutoff = 10; // percentage range for win condition
    const [playing, setPlaying] = useState(false);
    const [low, setLow] = useState(0);
    const [on, setOn] = useState(0);
    const [high, setHigh] = useState(0);
    const [bpm, setBPM] = useState();
    const [guess, setGuess] = useState(102);

    const rangeConversion = num => Math.round(num * (maxBPM - minBPM) + minBPM);

    const genNewBPM = () => setBPM(rangeConversion(Math.random()));

    useInterval(() => click.play(), playing ? (60 / bpm) * 1000 : null);

    const onClick = () => {
        if (playing) {
            silence.pause();
        }
        else {
            silence.play();
            click.play();
        }
        setPlaying(!playing);
    };

    const handleSubmit = event => {
        event.preventDefault();
        let percDiff = (guess - bpm) / bpm * 100;
        if (Math.abs(percDiff) < scoreCutoff) {
            genNewBPM();
            setOn(on + 1);
            setPlaying(false);
        }
        else if (percDiff < 0) setLow(low + 1);
        else setHigh(high + 1);
    }

    const handleInputChange = event => {
        let input = parseFloat(event.target.value);
        setGuess(rangeConversion((input + (input * input * input)) / 2)); // quasi exponential response
    };

    return (
        <Container fluid="sm">
            <div>
                <Button id="playButton" onClick={onClick}>{playing ? "Stop" : "Start"}</Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Label>BPM Guess {guess}</Form.Label>
                <Form.Range min="0" max="1" step=".002" onChange={handleInputChange} />
                <Button type="submit">Submit</Button>
            </Form>

            <Scorecard high={high} low={low} on={on} />
        </Container>
    );
};