var SoundLab = function () {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	this.context = new AudioContext();
};

SoundLab.prototype.load = function (url, callback, autoOutput) {
	var context, request, destination;

  context = this.context;
	request = new XMLHttpRequest();
  destination = autoOutput === true ? context.destination : null;

	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			context.decodeAudioData(request.response, function(buffer) {
				callback.apply(new SLSound(buffer, context, destination));
			});
		}
	};

	request.send();
};

var SLSound = function (buffer, context, output) {
	var self = this;
  this.buffer = buffer;
	this.context = context;
	this.output = typeof output === null ? this.context.destination : output;
	this.trackTime = 0;

  // Added paused variable for resume() function
	this.paused = 1;
	this.delayNode = null;

  // Reduced transport into function for DRY-er code
  this.startTransport = function() {
    return this.trackTimer = setInterval(function() {

      // Webaudio API uses whole seconds instead of milliseconds - Dumb
		  self.trackTime += .1;

      // Make sure our trackTime numbers are correct -
      // While doing so, JavaScript likes to add a .0000000001 occasionally -
      // Tried to use the 'Math' object to fix it, but I'll let it slide for now

      // console.log(self.trackTime); // Comment out for console cleanliness
	  }, 100);
  };
};

SLSound.prototype.play = function () {
	this.createBufferSource();

  //  The first argument in the start() function accepts an offset before starting the sound, now where in the buffer to start
  //	this.source.start(this.trackTime);

  this.paused = 0;
  this.startTransport();
};

SLSound.prototype.pause = function () {
	clearInterval(this.trackTimer);
  this.source.stop(0);
  this.paused = 1;
};

SLSound.prototype.resume = function () {
  if (this.paused === 1) {
    this.createBufferSource();

    // Start immediately at specific time in the buffer
    this.source.start(0, this.trackTime);
    this.paused = 0;
    this.startTransport();
  }
};

SLSound.prototype.speed = function (speed) {
	if (typeof speed !== 'number') speed = 1;
	this.source.playbackRate.setValueAtTime(speed, 0);
};

SLSound.prototype.createBufferSource = function() {
	this.source = this.context.createBufferSource();
	this.source.buffer = this.buffer;
	this.source.connect(this.output);
};

SLSound.prototype.delay = function (time) {
	if (this.delayNode === null) {
		this.delayNode = this.context.createDelayNode();

		// Re-wire the source node to go through the Delay node also
		this.delayNode.connect(this.context.destination);
		this.source.connect(this.delayNode);
	}

	this.delayNode.delayTime.setValueAtTime(time, 0);
};
