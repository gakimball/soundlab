$(window).on('load', function () {
  var audio, song;
  audio = new SoundLab();
  audio.load('/public/music/kanye.mp3', function() {
    song = this;
    song.play('#song-time');
//    $('#song-time').html(song.trackTime.toFixed(1));
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
