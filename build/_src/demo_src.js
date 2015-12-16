/* global console, Phaser: true, game*/
var demo = function(game) {
    console.log(game);
};

demo.prototype = {

    preload: function() {
        game.load.image("img_01","images/demoPage/grabThese.png");
        game.load.image("img_02","images/demoPage/grabThese_cups.png");
        game.load.image("img_03","images/demoPage/avoidThese.png");
        game.load.image("img_04","images/demoPage/avoidThese_cups.png");        
        game.load.image("img_05","images/demoPage/withThis.png");
        game.load.image("img_06","images/demoPage/mitten.png");
        game.load.image("img_swipe","images/demoPage/swipe.png");

        game.load.image("img_07","images/demoPage/thermoWarmText.png");
        game.load.image("img_08","images/demoPage/thermoWarm.png");
        game.load.image("img_09","images/demoPage/thermoColdText.png");
        game.load.image("img_10","images/demoPage/thermoCold.png");
    },
    create: function() {
        var demoAsset_01 = game.add.sprite(225,350,'img_01');
        var demoAsset_02 = game.add.sprite(425,350,'img_02');
        var demoAsset_03 = game.add.sprite(420,540,'img_03');
        var demoAsset_04 = game.add.sprite(220,540,'img_04');
        var demoAsset_05 = game.add.sprite(185,690,'img_05');
        var demoAsset_06 = game.add.sprite(360,830,'img_06');
        var demoAsset_swipe = game.add.sprite(180,780,'img_swipe');

        // var demoAsset_07 = game.add.sprite(380,240,'img_07');
        // var demoAsset_08 = game.add.sprite(190,270,'img_08');
        // var demoAsset_09 = game.add.sprite(320,540,'img_09');
        // var demoAsset_10 = game.add.sprite(460,460,'img_10');

        demoAsset_01.anchor.setTo(0.5,0.5);
        demoAsset_02.anchor.setTo(0.5,0.5);
        demoAsset_03.anchor.setTo(0.5,0.5);
        demoAsset_04.anchor.setTo(0.5,0.5);
        demoAsset_05.anchor.setTo(0.5,0.5); 
        demoAsset_06.anchor.setTo(0.5,0.5);
        demoAsset_swipe.anchor.setTo(0.5,0.5);

        // demoAsset_07.anchor.setTo(0.5,0.5);
        // demoAsset_08.anchor.setTo(0.5,0.5);
        // demoAsset_09.anchor.setTo(0.5,0.5);
        // demoAsset_10.anchor.setTo(0.5,0.5);

        demoAsset_01.alpha = 0;
        demoAsset_02.alpha = 0;
        demoAsset_03.alpha = 0;
        demoAsset_04.alpha = 0;
        demoAsset_05.alpha = 0;
        demoAsset_06.alpha = 0;
        demoAsset_swipe.alpha = 0;

        // demoAsset_07.alpha = 0;
        // demoAsset_08.alpha = 0;
        // demoAsset_09.alpha = 0;
        // demoAsset_10.alpha = 0;

        // //---- ANIMATE DUMMY OBJECTS WITH CHAINED TWEENS ----//
        var tween1 = game.add.tween(demoAsset_01).to({alpha: 1}, 600, "Quart.easeOut", true, 2000);
        var tween2 = game.add.tween(demoAsset_02).to({alpha: 1}, 600);
        var tween3 = game.add.tween(demoAsset_03).to({alpha: 1}, 600);
        var tween4 = game.add.tween(demoAsset_04).to({alpha: 1}, 600);
        var tween5 = game.add.tween(demoAsset_05).to({alpha: 1}, 600);
        var tween6 = game.add.tween(demoAsset_06).to({alpha: 1}, 600);
        var tweenSwipe = game.add.tween(demoAsset_swipe).to({alpha: 1}, 600);

        // var tween7 = game.add.tween(demoAsset_07).to({alpha: 1}, 1000, "Quart.easeOut", true, 2000);
        // var tween8 = game.add.tween(demoAsset_08).to({alpha: 1}, 500, "Quart.easeOut");
        // var tween9 = game.add.tween(demoAsset_09).to({alpha: 1}, 1000, "Quart.easeOut");
        // var tween10 = game.add.tween(demoAsset_10).to({alpha: 1}, 500, "Quart.easeOut");

        tween1.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween4);
        tween4.chain(tween5);
        tween5.chain(tween6);
        tween6.chain(tweenSwipe);

        
        // tween6.chain(tween7);
        // tween7.chain(tween8);
        // tween8.chain(tween9);
        // tween9.chain(tween10);

        tween1.start();
        // tween7.start();

        // Create button //
        shopLoop = game.add.audio('shopLoop');
        shopLoop.loop = true;
        // shopLoop.play();
        shopLoop.onDecoded.add(fadeTunesIn, this);

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
    
