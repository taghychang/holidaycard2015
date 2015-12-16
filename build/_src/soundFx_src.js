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

function winAudioFX(){
  winSceneAudio = game.add.audio('winScene');
  winSceneAudio.volume = 1.8;
  winSceneAudio.play();
}

function loseAudioFX(){
  loseSceneAudio = game.add.audio('loseScene');
  loseSceneAudio.allowMultiple = false;
  loseSceneAudio.volume = 1.8;
  loseSceneAudio.play();
}

function cupMoveAudioFX(){
  cupOnMoveAudio = game.add.audio('cupOnMove');
  cupOnMoveAudio.allowMultiple = false;
  cupOnMoveAudio.play();
}
