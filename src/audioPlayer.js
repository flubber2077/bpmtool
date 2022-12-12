import React from "react";
import Button from "react-bootstrap/Button";



export default function AudioPlayer(props) {
    //audio context is the initialization of the webaudio api
    let player = new AudioContext();
    player.suspend();

    //
    let buffer = player.createBuffer(1, player.sampleRate * 2, player.sampleRate);

    //a float32array of audio data
    const channel = buffer.getChannelData(0);
    //generates tone to play, should probably jsut replace with a loaded sample
    let phase = - Math.PI;
    let amplitude = 1;
    let durationMs = player.sampleRate / 20;
    const pitch = 800;
    for (let i = 0; i < durationMs; i++) {
        channel[i] = Math.sin(phase) * amplitude;
        phase += 2 * Math.PI * pitch / player.sampleRate;
        if (phase > Math.PI) {
            phase -= 2 * Math.PI;
        }
        amplitude -= 1 / durationMs;
    }

    let source = player.createBufferSource();

    source.buffer = buffer;
    source.loop = true;
    source.loopEnd = 1 / (props.tempo / 60);
    source.connect(player.destination);
    source.start(0);


    let button = document.getElementById('playButton');
    const startStop = () => {
        source.loopEnd = 1 / (props.tempo / 60);
        if (player.state === "suspended") {
            // stop the audioPlayer
            player.resume();
            button.innerText = "Stop";
        } else {
            // start the audioPlayer, tempo setting goes here
            player.suspend();
            button.innerText = "Start";
        }
        console.log(player.state)
    };
    console.log(props.isPlaying, "props")
    return (
        <Button id="playButton" onClick={startStop}>{props.isPlaying ? "stop" : "start"}</Button>
    )
}
