import React, { useState } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import click1 from "./click.mp3";
import silence from "./silence.wav";
import {Howler, Howl} from "howler";
import {useInterval} from 'usehooks-ts'

const click = new Howl({
    src: click1,
    preload: true,
    onplayerror: () => alert('player error'),
    onloaderror: () => alert('load error')
});

const silence = new Howl({
    src: silence,
    html5: true,
    loop: true,
    preload: "metadata"
})

let timer = null;

export default function Metronome() {
    const minBPM = 40;
    const maxBPM = 240;
    const scoreCutoff = 10; // percentage range for win condition
    const [playing, setPlaying] = useState(false);
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

    useInterval(
        () => click.play(),
        playing ? (60/bpm) * 1000 : null,
    )

    const onClick = () => {
        if (playing) {
            silence.pause();
            setPlaying(false);
        } else {
            genNewBPM();
            setPlaying(true);
            silence.play();
            click.play();
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        let percDiff = Math.trunc((guess - bpm) / bpm * 100);
        if (Math.abs(percDiff) < scoreCutoff) {
            setOn(on + 1);
            setPlaying(false);
        }
        else if (percDiff < 0) setLow(low + 1);
        else setHigh(high + 1);
    }

    const handleInputChange = event => setGuess(event.target.value);

    return (
        <Container fluid="sm">
            <div>
                <Button id="playButton" onClick={onClick}>{playing ? "Stop" : "Start"}</Button>
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
