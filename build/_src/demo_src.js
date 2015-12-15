/* global console, Phaser: true, game*/
var demo = function(game) {
    console.log(game);
};

demo.prototype = {

    preload: function() {
      
        // game.load.image('shop', 'images/shop.jpg');
        // game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);
        // game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

        // game.load.image("startButton", "images/start_button.png");
        // game.load.image('logo', 'images/logo.png');


    },
    create: function() {

        shopLoop.fadeIn(10000, true);


        // Start button
        var demoPlaceholder = game.add.button(game.world.centerX, game.world.centerY, "demoPlaceholder", nextState);


        demoPlaceholder.anchor.set(0.5, 0.5);
        function nextState() {
            game.state.start('PlayGame');
        }



    }

};

// Change to game stage