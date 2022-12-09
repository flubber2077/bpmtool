import React from "react"


//audio context is the initialization of the webaudio api
let player = new AudioContext();

function setup() {
    //
    let buffer = player.createBuffer(1, player.sampleRate * 2, player.sampleRate);

    //a float32array of audio data
    const channel = buffer.getChannelData(0);
    //generates tone to play, should probably jsut replace with a loaded sample
    let phase = 0;
    let amplitude = 1;
    let durationMs = ac.sampleRate / 50;
    const pitch = 400;
    for (let i = 0; i < durationMs; i++) {
        channel[i] = Math.sin(phase) * amplitude;
        phase += 2 * Math.PI * f / ac.sampleRate;
        if (phase > 2 * Math.PI) {
            phase -= 2 * Math.PI;
        }
        amplitude -= 1 / durationMs;
    }

    source = player.createBufferSource();

    source.buffer = buffer;
    source.loop = true;
    source.loopEnd = 1 / (getTemp() / 60);
    source.connect(player.destination);
    source.start(0);
} 
export default function audioPlayer(){

}
