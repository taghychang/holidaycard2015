var preGame = function(game) {};

preGame.prototype = {
  preload: function() {
  },
  create: function() {
    var text = "- phaser -\n with a sprinkle of \n pixi dust.";
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var t = game.add.text(game.world.centerX-300, 0, text, style);
  }
};
