import React, { Component, useState } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
let timer = null;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const click1 = "//daveceddia.com/freebies/react-metronome/click1.wav";
const click2 = "//daveceddia.com/freebies/react-metronome/click2.wav";
const click = new Audio(click1);

export default function Metronome() {
    const minBPM = 40;
    const maxBPM = 240;
    const scoreCutoff = 10; // percentage range for win condition
    const [playing, setPlaying] = useState(false);
    const [low, setLow] = useState(0);
    const [on, setOn] = useState(0);
    const [high, setHigh] = useState(0);
    const [bpm, setBPM] = useState(80);
    const [guess, setGuess] = useState(80);

    const genNewBPM = () =>{
        let currBPM = Math.floor(Math.random() * (maxBPM - minBPM) + minBPM);
        console.log(currBPM);
        setBPM(currBPM);
    }

    const onClick = () => {
        console.log("onClick")
        const playClick = () => click.play();
        if (playing) {
            genNewBPM();
            clearInterval(timer);
            setPlaying(false);
        } else {
            timer = setInterval(playClick, (60/bpm)*1000);
            setPlaying(true);
            playClick();
        }
    };

    const handleSubmit = event => {
        console.log("handleSubmit")
        event.preventDefault();
        let percDiff = Math.trunc((guess - bpm) / bpm * 100);
        if (Math.abs(percDiff) < scoreCutoff) {
            setOn(on + 1);
            setPlaying(false);
            clearInterval(timer);
        }
        else if (percDiff < 0) setLow(low + 1);
        else setHigh(high + 1);
    }

    const handleInputChange = event => setGuess(event.target.value);

    return (
        <Container fluid="sm">
            <div>
                <Button id="playButton" onClick={onClick}>{playing ? "start" : "stop"}</Button>
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
