var SoundLab = function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	this.context = new AudioContext();
}

SoundLab.prototype.load = function(url, callback, autoOutput) {
	var context = this.context;
	var request = new XMLHttpRequest();

	var destination = autoOutput === true ? context.destination : null;

	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			context.decodeAudioData(request.response, function(buffer) {
				callback.apply(new SLSound(buffer, context, destination));
			});
		}
	}

	request.send();
}

var SLSound = function(buffer, context, output) {
	this.buffer = buffer;
	this.context = context;
	this.output = typeof output === null ? this.context.destination : output;
	this.trackTime = 0;
	this.trackTimer = null;

	// Effect nodes
	this.delayNode = null;
}
SLSound.prototype.play = function() {
	var self = this;

	this.createBufferSource();
	this.source.start(this.trackTime);
	this.trackTimer = window.setInterval(function() {
		self.trackTime += 100;
	}, 100);
}
SLSound.prototype.pause = function() {
	this.source.stop(0);
	window.clearInterval(this.trackTimer);
}
SLSound.prototype.speed = function(speed) {
	if (typeof speed !== 'number') speed = 1;
	this.source.playbackRate.setValueAtTime(speed, 0);
}
SLSound.prototype.createBufferSource = function() {
	this.source = this.context.createBufferSource();
	this.source.buffer = this.buffer;
	this.source.connect(this.output);
}

SLSound.prototype.delay = function(time) {
	if (this.delayNode === null) {
		this.delayNode = this.context.createDelayNode();

		// Re-wire the source node to go through the Delay node also
		this.delayNode.connect(this.context.destination);
		this.source.connect(this.delayNode);
	}

	this.delayNode.delayTime.setValueAtTime(time, 0);
}