/* global console, Phaser: true, game*/



var preGame = function(game) {
    console.log(game);
};

preGame.prototype = {

    preload: function() {


    },
    create: function() {

        // Create button //
        startButtonMobile = game.add.button(game.world.centerX, game.world.centerY, "startButtonMobile");
        startButtonMobile.variable = "IntroVideo"; // next state
        startButtonMobile.inputEnabled = true;
        startButtonMobile.events.onInputDown.add(toNextState, this);
        startButtonMobile.anchor.set(0.5, 0.5);

             // Title
        playBtn = game.add.text(300, 850, 'PLAY', { fill: '#ffffff' });


        playBtn.alpha = 0;
        game.add.tween(playBtn).to( { alpha: 1 }, 4000, "Linear", true, 0, 0);


        fadeIn();
    }
};

