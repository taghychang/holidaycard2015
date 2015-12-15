/* global console, Phaser: true, game*/



var preGame = function(game) {
    console.log(game);
};

preGame.prototype = {

    preload: function() {

    },
    create: function() {
        // Change to game stage

        // Title
        // var text = "test";
        // var style = {
        //     font: "65px Arial",
        //     fill: "#FFFFFF",
        //     align: "center"
        // };
        // var gameTitle = game.add.text(game.world.centerX, 130, text, style);
        // gameTitle.anchor.set(0.5, 0.5);

        // Create button //
        startButtonMobile = game.add.button(game.world.centerX, game.world.centerY, "startButtonMobile");
        startButtonMobile.variable = "Demo"; // next state
        startButtonMobile.inputEnabled = true;
        startButtonMobile.events.onInputDown.add(toNextState, this);
        startButtonMobile.anchor.set(0.5, 0.5);

        fadeIn();
    }
};

