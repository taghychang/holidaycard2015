/* global console, Phaser: true, game*/
var demo = function(game) {
    console.log(game);
};

demo.prototype = {

    preload: function() {
        game.load.image("dummy_01","images/demoPage/dummy_01.png");
        game.load.image("dummy_02","images/demoPage/dummy_02.png");
        game.load.image("dummy_03","images/demoPage/dummy_03.png");
        game.load.image("dummy_04","images/demoPage/dummy_04.png");
        game.load.image("dummy_05","images/demoPage/dummy_05.png");
        game.load.image("dummy_06","images/demoPage/dummy_06.png");
        game.load.image("dummy_05","images/demoPage/dummy_07.png");
        game.load.image("dummy_06","images/demoPage/dummy_08.png");
    },
    create: function() {
        var dummy_01 = game.add.sprite(0,0,'dummy_01');
        var dummy_02 = game.add.sprite(200,0,'dummy_02');
        var dummy_03 = game.add.sprite(0,200,'dummy_03');
        var dummy_04 = game.add.sprite(200,200,'dummy_04');
        var dummy_05 = game.add.sprite(0,400,'dummy_05');
        var dummy_06 = game.add.sprite(200,400,'dummy_06');
        var dummy_07 = game.add.sprite(0,600,'dummy_05');
        var dummy_08 = game.add.sprite(200,600,'dummy_06');

        dummy_01.alpha = 0;
        dummy_02.alpha = 0;
        dummy_03.alpha = 0;
        dummy_04.alpha = 0;
        dummy_05.alpha = 0;
        dummy_06.alpha = 0;
        dummy_07.alpha = 0;
        dummy_08.alpha = 0;


        //---- ANIMATE DUMMY OBJECTS WITH CHAINED TWEENS ----//
        var tween1 = game.add.tween(dummy_01).to({alpha: 1}, 1000, "Quart.easeOut", true, 2000);
        var tween2 = game.add.tween(dummy_02).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween3 = game.add.tween(dummy_03).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween4 = game.add.tween(dummy_04).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween5 = game.add.tween(dummy_05).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween6 = game.add.tween(dummy_06).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween7 = game.add.tween(dummy_07).to({alpha: 1}, 1000, "Quart.easeOut");
        var tween8 = game.add.tween(dummy_08).to({alpha: 1}, 1000, "Quart.easeOut");


        tween1.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween4);
        tween4.chain(tween5);
        tween5.chain(tween6);
        tween6.chain(tween7);
        tween7.chain(tween8);

        tween1.start();

        // Create button //
        shopLoop = game.add.audio('shopLoop');
        shopLoop.loop = true;
        // shopLoop.play();
        shopLoop.onDecoded.add(fadeTunesIn, this);

        // demoPlaceholder = game.add.button(game.world.centerX, game.world.centerY, "demoPlaceholder");
        // demoPlaceholder.variable = "PlayGame"; // next state
        // demoPlaceholder.inputEnabled = true;
        // demoPlaceholder.events.onInputDown.add(toNextState, this);
        // demoPlaceholder.anchor.set(0.5, 0.5);

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
    
