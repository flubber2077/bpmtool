import React, { Component } from "react";
import Scorecard from "./Scorecard.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils/index.js";


const click1 = "//daveceddia.com/freebies/react-metronome/click1.wav";
const click2 = "//daveceddia.com/freebies/react-metronome/click2.wav";
const minBPM = 40;
const maxBPM = 240;
const scoreCutoff = 10;

export default class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            count: 0,
            bpm: 100,
            bpmGuess: 150,
            beatsPerMeasure: 4,
            high: 0,
            low: 0,
            on: 0
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    xhandleInputChange = event => {
        const bpm = event.target.value;

        if (this.state.isPlaying) {
            // stop old timer and start a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // set the new bpm
            // and reset the beat counter
            this.setState({
                count: 0,
                bpm
            });
        } else {
            // otherwise, just update the bpm
            this.setState({ bpm });
        }
    };

    handleInputChange = event => {
        const bpmGuess = event.target.value;
        this.setState({ bpmGuess });
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // alternate click sounds
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        // keep track of which beat we're on
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const bpmGuess = event.target[0].value;
        let percDiff = Math.trunc((bpmGuess - this.state.bpm) / this.state.bpm * 100);
        if(Math.abs(percDiff) < scoreCutoff){
            this.setState({on: this.state.on + 1});
            this.startStop();
        }
        else if (percDiff < 0) this.setState({low: this.state.low + 1});
        else this.setState({high: this.state.high + 1});
    }

    startStop = () => {
        if (this.state.isPlaying) {
            // stop the timer
            clearInterval(this.timer);
            this.setState({
                isPlaying: false
            });
        } else {
            // start a timer with a random bpm
            let currBPM = Math.floor(Math.random() * (maxBPM - minBPM) + minBPM);
            this.setState(
                {
                    count: 0,
                    isPlaying: true,
                    bpm: currBPM
                    // play a click immediately (after setState finishes)
                },
                this.playClick
            );
            this.timer = setInterval(this.playClick, (60 / currBPM) * 1000);
        }
    };

    render() {
        const { isPlaying, bpm, bpmGuess, high, low, on} = this.state;
        return (
            <Container fluid="sm">
                <Button onClick={this.startStop}>{isPlaying ? "Stop" : "Start"}</Button>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>BPM Guess {bpmGuess}</Form.Label>
                    <Form.Range min={minBPM} max={maxBPM} onChange={this.handleInputChange} />
                    <Button type="submit">Submit</Button>
                </Form>

                <Scorecard high={high} low={low} on={on} />
            </Container>
        );
    }
}
