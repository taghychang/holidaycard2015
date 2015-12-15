var fadeIn = function() {
  // Draw solid black screen for fading
  var width = game.world.width // example;
  var height = game.world.height // example;
  var bmd = game.add.bitmapData(width, height);

  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width, height);
  bmd.ctx.fillStyle = '#000000';
  bmd.ctx.fill();
  game.blackbox= game.add.sprite(game.world.centerX, game.world.centerY, bmd);
  game.blackbox.anchor.setTo(0.5, 0.5);
  game.add.tween(game.blackbox).to( { alpha: 0}, 800, "Linear", true);
}

var fadeOut = function(nextScene) {
  fadeout = game.add.tween(game.blackbox).to( {alpha: 1}, 800, "Linear", true);
  fadeout.onComplete.add(function(){game.state.start(nextScene)}, this);
}

var toNextState = function(item) {
  fadeOut(item.variable);
}
