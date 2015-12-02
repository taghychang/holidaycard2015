/* globals game, console*/
var endGame = function(game) {
  console.log(game);
};

endGame.prototype = {
  preload: function() {
    game.load.image("replayButton", "images/replay.png");
  },
  create: function() {

    // Change to game stage
    function nextState() {
      game.state.start("PreGame");
    }

    // Title
    var text = "THE END";
    var style = { font: "65px Arial", fill: "#FFFFFF", align: "center" };
    var endTitle = game.add.text(game.world.centerX, 130, text, style);
    endTitle.anchor.set(0.5,0.5);

    // Start button
    var replayButton= game.add.button(game.world.centerX, game.world.centerY, "replayButton",nextState);
    replayButton.anchor.set(0.5,0.5);

  }
};
