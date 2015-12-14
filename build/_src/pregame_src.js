/* global console, Phaser: true, game*/
var preGame = function(game) {
    console.log(game);
};

preGame.prototype = {

    preload: function() {
      
        // game.load.image('shop', 'images/shop.jpg');
        // game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);
        // game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

        // game.load.image("startButton", "images/start_button.png");
        // game.load.image('logo', 'images/logo.png');


    },
    create: function() {
        var shopLoop = game.add.audio('shopLoop');

        shopLoop.onDecoded.add(function() {
            shopLoop.fadeIn(1000);
        });


        // Change to game stage
        function nextState() {
            game.state.start('Demo');
        }

        // Title
        var text = "test";
        var style = {
            font: "65px Arial",
            fill: "#FFFFFF",
            align: "center"
        };
        var gameTitle = game.add.text(game.world.centerX, 130, text, style);
        gameTitle.anchor.set(0.5, 0.5);

        // Start button

        var startButtonMobile = game.add.button(game.world.centerX, game.world.centerY, "startButtonMobile", nextState);


        startButtonMobile.anchor.set(0.5, 0.5);



    }

};
