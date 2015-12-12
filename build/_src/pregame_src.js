/* global console, Phaser: true, game*/
var preGame = function(game) {
    console.log(game);
};

preGame.prototype = {

    preload: function() {
        game.load.image("startButton", "images/start_button.jpg");
        game.load.image('logo','images/logo.png');
           //ADD AUDIO
    game.load.audio('shopLoop', ['sounds/shopLoop.mp3', 'sounds/shopLoop.ogg']);

    },
    create: function() {
      var shopLoop = game.add.audio('shopLoop');
        
    shopLoop.onDecoded.add(function(){
      shopLoop.fadeIn(1000);
    });


        // Change to game stage
        function nextState() {
          game.state.start('Preloader');
        }

        // Title
        var text = "BURRISTA";
        var style = {font: "65px Arial",fill: "#FFFFFF",align: "center"};
        var gameTitle = game.add.text(game.world.centerX, 130, text, style);
        gameTitle.anchor.set(0.5, 0.5);

        // Start button

        var startButton = game.add.button(game.world.centerX, game.world.centerY, "startButton", nextState);


        startButton.anchor.set(0.5, 0.5);


        // DESKTOP SETTING
        if (game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;

            game.scale.minWidth = 320;
            game.scale.minHeight = 480;
            game.scale.maxWidth = 640;
            game.scale.maxHeight = 960;
            

        } else {
        // MOBILE SETTING
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.minWidth = 320;
            game.scale.minHeight = 480;
            game.scale.maxWidth = 1080;
            game.scale.maxHeight = 1639;

        }

        game.scale.setScreenSize(true); 

    }

};
