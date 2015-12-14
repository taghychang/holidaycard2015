function layerSort() {
  // To position player on the top ================================================
  var player_layer = game.add.group();
  var effect_layer = game.add.group();
  player_layer.add(player);
  effect_layer.add(game.animateFreeze);
  effect_layer.add(game.animateSteam);
  game.world.bringToTop(player_layer);
  game.world.bringToTop(effect_layer);
}
