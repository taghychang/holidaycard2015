/* global console, Phaser: true, game*/
var demo = function(game) {
    console.log(game);
};

demo.prototype = {

    preload: function() {


    },
    create: function() {

        // Create button //
        shopLoop = game.add.audio('shopLoop');
        shopLoop.loop = true;
        shopLoop.volume = 0.7;
        shopLoop.play();
//        shopLoop.onDecoded.add(fadeTunesIn, this);


        demoPlaceholder = game.add.button(game.world.centerX, game.world.centerY, "demoPlaceholder");
        demoPlaceholder.variable = "PlayGame"; // next state
        demoPlaceholder.inputEnabled = true;
        demoPlaceholder.events.onInputDown.add(toNextState, this);
        demoPlaceholder.anchor.set(0.5, 0.5);

        fadeIn();
    }
};

function nextState() {
    shopLoop.loop = false;
    shopLoop.fadeOut();
    shopLoop.onStop.add(startGame);

}


function fadeTunesIn() {
  shopLoop.fadeIn(5000, true);
}


function startGame() {
    game.state.start('PlayGame')
}




// Change to game stage
    
