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

        // Create button //
        demoPlaceholder = game.add.button(game.world.centerX, game.world.centerY, "demoPlaceholder");
        demoPlaceholder.variable = "PlayGame"; // next state
        demoPlaceholder.inputEnabled = true;
        demoPlaceholder.events.onInputDown.add(toNextState, this);
        demoPlaceholder.anchor.set(0.5, 0.5);
        function nextState() {
            game.state.start('PlayGame');
        }

        fadeIn();
    }
};

// Change to game stage
