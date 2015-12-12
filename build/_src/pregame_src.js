/* globals game, console*/
var preGame = function(game) {
  console.log(game);
};

preGame.prototype = {
  preload: function() {
    game.load.image("startButton", "images/start_button.jpg");
    //ADD AUDIO
    game.load.audio('shopLoop', ['sounds/shopLoop.mp3', 'sounds/shopLoop.ogg']);
  },
  create: function() {
    //AUDIO
    var shopLoop = game.add.audio('shopLoop');
        
    shopLoop.onDecoded.add(function(){
      shopLoop.fadeIn(1000);
    });



    // Change to game stage
    function nextState() {
      game.state.start("PlayGame");
    }

    // Title
    var text = "BURRISTA";
    var style = { font: "65px Arial", fill: "#FFFFFF", align: "center" };
    var gameTitle = game.add.text(game.world.centerX, 130, text, style);
    gameTitle.anchor.set(0.5,0.5);

    // Start button

    var startButton= game.add.button(game.world.centerX, game.world.centerY, "startButton",nextState);

    startButton.anchor.set(0.5,0.5);

  }
};
