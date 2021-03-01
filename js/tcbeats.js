const frequencies = {
    delta: [ 402, 400 ],
    theta: [ 406, 400 ],
    alpha: [ 410, 400 ],
    beta:  [ 422, 400 ],
};

class TCBeats {

    constructor() {

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        // channel merger to merge left and right oscillators
        this.merger = this.ctx.createChannelMerger(2);

        // left ear
        this.left = this.ctx.createOscillator();
        this.left.type = 'sine';
        this.left.connect(this.merger, 0, 0);
        this.left.start();

        // right ear
        this.right = this.ctx.createOscillator();
        this.right.type = 'sine';
        this.right.connect(this.merger, 0, 1);
        this.right.start();

        // default frequency pair
        this.alpha();

        // output
        this.merger.connect(this.ctx.destination);

    }

    setFrequency(left_hz, right_hz) {
        this.left.frequency.value = left_hz;
        this.right.frequency.value = right_hz;
    }

    alpha() {
        this.setFrequency.apply(this, frequencies.alpha);
    }

    beta() {
        this.setFrequency.apply(this, frequencies.beta);
    }

    delta() {
        this.setFrequency.apply(this, frequencies.delta);
    }

    theta() {
        this.setFrequency.apply(this, frequencies.theta);
    }

}

let beats;
function go(type) {
    if (!beats) {
        beats = new TCBeats();
    }

    beats[type]();
}

