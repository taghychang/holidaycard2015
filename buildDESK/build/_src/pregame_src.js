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

     
             startButtonMobile.variable = "IntroVideo";
     
    
        // startButtonMobile.variable = "IntroVideo"; // next state
        startButtonMobile.inputEnabled = true;
        startButtonMobile.events.onInputDown.add(toNextState, this);
        startButtonMobile.anchor.set(0.5, 0.5);

             // Title
        playBtn = game.add.image(game.world.centerX - 95, 810, 'playBtn');


        playBtn.alpha = 0;
        game.add.tween(playBtn).to( { alpha: 1 }, 2000, "Linear", true, 0, 0);


        fadeIn();
    }
};

