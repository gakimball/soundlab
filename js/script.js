$(window).on('load', function () {
  var audio, song;
  audio = new SoundLab();
  audio.load('/public/music/daftpunk.mp3', function() {
    song = this;
    song.play('#song-time');
  }, true);

  // Pause click handler
  $('#pause').on('click', function () {
    song.pause();
  });

  // Play click handler
  $('#play').on('click', function () {
    song.resume('#song-time');
  });
});
