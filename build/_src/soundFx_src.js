function powerUpAudioFX(){
  //Create Audio Sprite
  powerUpAudio = game.add.audio('powerUpFX');
  powerUpAudio.allowMultiple = false;

  // powerUpAudio.addMarker(0.4,1.0);

  powerUpAudio.play();
}

function powerDownAudioFX(){
  //Create Audio Sprite
  powerDownAudio = game.add.audio('powerDownFX');
  powerDownAudio.allowMultiple = false;

  powerDownAudio.play();
}