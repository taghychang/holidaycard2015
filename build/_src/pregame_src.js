/* global console, Phaser: true, game*/
var preGame = function(game) {
    console.log(game);
};

preGame.prototype = {

    preload: function() {

    },
    create: function() {
        var shopLoop = game.add.audio('shopLoop');

        shopLoop.onDecoded.add(function() {
            shopLoop.fadeIn(1000);
        });

        // Change to game stage
        game.state.start('Demo');

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


    }

};
