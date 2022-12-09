//audio context is the initialization of the webaudio api
let player = new AudioContext();

function setup() {
    //
    let buffer = player.createBuffer(1, player.sampleRate * 2, player.sampleRate);

    //a float32array of audio data
    const channel = buffer.getChannelData(0);

    let phase = 0;
    let amplitude = 1;
}   