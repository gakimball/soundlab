$(window).on('load', function () {
  var audio,
      song;
  audio = new SoundLab();
  audio.load('/public/music/kanye.mp3', function() {
    song = this;
    song.play();
  }, true);

  // Pause click handler
  $('#pause').on('click', function () {
    song.pause();
  });

  // Play click handler
  $('#play').on('click', function () {
    song.resume();
  });
});
