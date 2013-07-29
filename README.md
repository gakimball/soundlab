# SoundLab (working title)

A wrapper to simplify the Web Audio API.

## Browser Compatability

Only tested in Chrome 28. Support for the Web Audio API is very limited right now.

## Usage

Create an audio context by creating a new `SoundLab` object.

	var audio = new SoundLab();

Load an audio file using the `.load()` method. SoundLab will go and fetch the file with an AJAX call, and when it's ready it give you an audio source, accessible through a callback you supply:

	audio.load('/path/to/yr/sample.mp3', function() {
		// "this" refers to the audio source
		var sound = this;
	}, true); // When "true", the source will automatically connect to the destination node

You can call `.play()` and `.pause()` on the audio source to play and pause it. (Right now it doesn't pause like it's supposed to, working on that. The Web Audio API doesn't have a concept of pausing.)

	sound.play();
	sound.pause(); // Actually stop

When you stop an audio source, the Web Audio API will destroy the source. However, SoundLab stores the buffer for you, so you can play the source again by simply re-calling `.play()`.

### Manipulation

#### Speed

Change the speed of an audio source by calling `.speed()` and supplying a speec multiplier. 1 is normal speed, 2 is two times faster, and so on.

	sound.speed(1); // Normal speed
	sound.speed(3); // Triple speed
	sound.speed(0.5); // Half speed
	sound.speed(100); // Are you crazy?