const frequencies = {
    alpha: [ 410, 400 ],
};

class TCBeats {

    constructor() {

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.right = this.ctx.createOscillator();
        this.right.type = 'sine';
        this.rsplit = this.ctx.createChannelSplitter(2);
        this.right.connect(this.rsplit);
        
        this.left = this.ctx.createOscillator();
        this.left.type = 'sine';
        this.lsplit = this.ctx.createChannelSplitter(2);
        this.left.connect(this.lsplit);

        this.merger = this.ctx.createChannelMerger(2);
        this.lsplit.connect(this.merger, 0, 0);
        this.rsplit.connect(this.merger, 0, 1);
        this.merger.connect(this.ctx.destination);

        this.start();
    }

    setFrequency(left_hz, right_hz) {
        this.left.frequency.value = left_hz;
        this.right.frequency.value = right_hz;
    }

    alpha() {
        this.setFrequency.apply(this, frequencies.alpha);
    }

    start() {
        this.right.start();
        this.left.start();
    }

    stop() {
        this.right.stop();
        this.left.stop();
    }
}

let beats;

function tcbeats() {

    beats = new TCBeats();
    beats.alpha();
}


window.onload = tcbeats;
