/*globals console: true, Phaser: true, game*/

var player;
var playerPosition;
var playerPositions;
var playerSpeed;
var cupSpeed;
var cursor;
var cupGeneratorSpeed;
var blackbox;


// Check player win or lose stage
var player_condition = {
  isWin: false,
  isLose: false
};

//Cup group
var CupGroup;

// ENVIRONMENT
var shop;

// SWIPE DETECTIONS VARS
var endX, startX;

// CHARACTER MOVE VARS 
var tweenL, tweenR;

// CUP VARS
var tween_position,
    tween_size,
    cup_speed;

// SCORE VARS
var stageFreeze,
    score;

//POWER_PARTICLES
var powerDown,
    powerUp;

var snowflakes_frames = 7;
//RANDOMLY SELECT FROM AN ARRAY FOR SNOWFLAKE RANDOMIZATION WHEN PARTICLES ARE EMITTED
var snowflakeArray = Array.apply(null, {length: snowflakes_frames}).map(Number.call, Number);

//AUDIO
var powerUpAudio,
    powerDownAudio;

var shopLoop;

var playGame = function(game) {
    if (game) {}
};

function processHandler(player, cupHit) {
    return true;
}


// function fadein() {
//   game.add.tween(blackbox).to( { alpha: 0}, 2000, "Linear", true);
// }

function scoreHandler(cupHit) {

    if (cupHit.frame === 0 || cupHit.frame === 1) {
        score -= 1;
        // cupGeneratorSpeed -= 0.4;
        console.log("--" +score);
    }  else {
        score += 1;
        cupGeneratorSpeed += 0.2;
        console.log("--"+score);
    }


    scoreGauge.frame = score;


    console.log('time on table(speed) ='+ cup_speed);

// Check for win or lose condition

    if (score >= 10)  {
      if (player_condition.isWin == false) {
        player_condition.isWin = true;
        fadeOut("EndGameWin");
        barista.animations.stop(null, true);
        game.cupGenerator.timer.stop();
      }
    } else if (score <= 0) {
      if (player_condition.isLose == false) {
        player_condition.isLose = true;
        game.animateFreeze.play('freeze', 15);
        game.animateFreeze.events.onAnimationComplete.addOnce(function() {
          fadeOut("EndGameLose");
        });
        barista.animations.stop(null, true);
        game.cupGenerator.timer.stop();
      }
    }
}

function collisionHandler(player, cupHit) {
    if (cupHit.frame === 0 || cupHit.frame === 1 ) {
        cupHit.kill();
        powerDownParticles();
        powerDownAudioFX();
        
        console.log('ice');
    } else {
        cupHit.kill();
        powerUpParticles();
        powerUpAudioFX();
        
        console.log('HOT');
    }
    scoreHandler(cupHit);
}


function moveOver() {

    var halfGame = game.width / 2;

    if (game.input.worldX <= halfGame) {
        movePlayer.left();
    } else if (game.input.worldX >= halfGame) {
        movePlayer.right();

    }
}

function beginSwipe() {
    var startX;

    startX = game.input.worldX;
    game.input.onDown.remove(beginSwipe);
    game.input.onUp.add(endSwipe);

    function endSwipe() {

        endX = game.input.worldX;
        var distX = startX - endX;

        if (Math.abs(distX) > 10) {
            if (distX > 0) {
                movePlayer.left();
            } else {
                movePlayer.right();
            }
        }
        game.input.onDown.add(beginSwipe);
        game.input.onUp.remove(endSwipe);
    }
}

var movePlayer = {

    left: function() {
        if (playerPosition > 0) {
           // To test: Marach will remove this
           // score=21;
           // End Marach will remove this
      tweenL = game.add.tween(player).to({
                x: playerPositions[playerPosition - 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            player.animations.play('left', false);
            playerPosition--;
            console.log("lane: "+ playerPosition);
        } else {
            //Play half animation left
            player.animations.play('halfLeft', false);
        }
    },

    right: function() {
             //Marach will remove this
             // score=21;
             // End Marach will remove this
      if (playerPosition < 2) {
            tweenR = game.add.tween(player).to({
                x: playerPositions[playerPosition + 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            player.animations.play('right', false);
            playerPosition++;
            console.log("lane: "+ playerPosition);
        } else {
            // //Play half animation right
            player.animations.play('halfRight', false);

        }
    }
};

playGame.prototype = {
    preload: function() {
        // game.load.image('shopMobile', 'images/shopMobile.jpg');
        // game.load.atlas('barista', 'images/barista/barista.png', 'images/barista/barista.json');
        // // ADD CUPS SPRITESHEET
        // game.load.atlas('cup', 'images/cups/cups.png', 'images/cups/cups.json');
        // // ADD STAGEFREEZE SPRITESHEET
        // game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');
        // game.load.atlas('scoreGauge', 'images/scoreGauge/scoreGauge.png', 'images/scoreGauge/scoreGauge.json');
        // // ADD STEAM SPRITESHEET
        // game.load.atlas('stageSteam', 'images/stageSteam/stageSteam.png', 'images/stageSteam/stageSteam.json'); 
    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        var shopMobile = game.add.image(0, 0, 'shopMobile');

        cupGeneratorSpeed = 0.7;
        playerSpeed = 150;
        cupSpeed = 750;
        
        // DEBUG
        // game.add.plugin(Phaser.Plugin.Debug);

        // shop = game.add.sprite(-430, 0, 'shop');
        // shop.anchor.set(0);

        // PLACE STAGE FREEZE ON STAGE & DECLARE INITIAL SCORE 
        score = 5; // out of 10 

        scoreGauge = game.add.sprite(game.width -70, 0, 'scoreGauge');
        scoreGauge.frame = score;

        stageFreeze = game.add.sprite(0, 0, 'stageFreeze');
        stageFreeze = game.add.sprite(0, 0, 'stageSteam');
        //stageFreeze.frame = score;

        powerDown = game.add.emitter(game.world.centerX, 200, 200);
        powerDown.makeParticles('snowflakes', snowflakeArray);

        powerUp = game.add.emitter(game.world.centerX, 200, 200);
        powerUp.makeParticles('steam', [snowflakeArray]);
        // ADD BARISTA
        barista = game.add.sprite(20, 6, 'barista');
        barista.animations.add('youGotServed', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
        // PLAYER POSITIONS TO SLIDE INTO
        var lane0X = game.width / 2 - 200;
        var lane1X = game.width / 2;
        var lane2X = game.width / 2 + 200;
        var lanesX = [lane0X, lane1X, lane2X];

        playerPosition = 1;
        playerPositions = [lanesX[0], lanesX[1], lanesX[2]];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 110, 'player');
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(powerDown);

        // PLAYER SPRTE ANIMATIONS
        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);


        //CUP SPLASH
        splash = game.add.sprite(playerPositions[playerPosition], game.height - 110, 'splash');
        splash.animations.add('spill' [0,1,2,3]);


        cursor = game.input.keyboard.createCursorKeys();

        // GAME CONTROLS
        // game.input.onDown.add(moveOver);
        game.input.onDown.add(beginSwipe, this);

        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);

        this.cups = this.game.add.group();


        game.physics.enable(player, Phaser.Physics.ARCADE);

        // SET HIT AREA ON PLAYER
        player.body.setSize(10, 10, 0, -20);

        // To position player on the top ================================================
        var player_layer = game.add.group();
        // var freeze_layer = game.add.group();
        // player_layer.create(0,0, 'bg');
        player_layer.add(player);
        // freeze_layer.add(stageFreeze);
        
        game.world.bringToTop(player_layer);

        // PREPARE FREEZE animation when player lose
        game.animateFreeze = game.add.sprite(0,0, 'stageFreeze');
        game.animateFreeze.animations.add('freeze',[0,1,2,3,4,5,6], 5, false);
        game.animateFreeze.frame = 0;

        // PREPARE STEAM animation when player win
        game.animateSteam = game.add.sprite(0,0, 'stageSteam');
        game.animateSteam.animations.add('steam');
        game.animateSteam.frame = 0;


        // reset win and lose condition
        player_condition.isWin = false;
        player_condition.isLose = false;

 
  //============================== Countdown =========================//

        // Draw solid black screen for fading
        var width = game.world.width // example;
        var height = game.world.height // example;
        var bmd = game.add.bitmapData(width, height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#000000';
        bmd.ctx.fill();
        game.blackbox= game.add.sprite(game.world.centerX, game.world.centerY, bmd);
        game.blackbox.anchor.setTo(0.5, 0.5);

        // Count down position and style
        blackbox_out = game.add.tween(game.blackbox).to( { alpha: 0}, 500, "Linear", true);

        game.countDown= game.add.sprite(0,0, 'countDown');
        game.countDown.animations.add('countDown');
        game.countDown.frame = 0;
        game.countDown.play('countDown', 1);

        // After countdown do this:
        game.countDown.animations.currentAnim.onComplete.add(function () {
          console.log('animation complete');
          game.add.tween(game.countDown).to( { alpha: 0}, 0, "Linear", true);
          // SETUP TIMER FOR CUP GENERATOR AND START
          game.cupGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * cupGeneratorSpeed, this.generateCups, this);
          game.cupGenerator.timer.start();
          // Play Barrist Animation
          barista.animations.play('youGotServed', true);
        }, this);

  //============================== END ===============================//
    },
    update: function() {

        this.cups.forEach(function(cupGroup) {
            this.game.physics.arcade.overlap(player, cupGroup,  collisionHandler, processHandler, this);
        }, this);

    }, 

    generateCups: function() { 

        var tableEnd = 782;
        var lanesYstart = 395;

        var leftXend = (game.rnd.between(100, 110));
        var midXend = (game.rnd.between(280, 300));
        var rightXend = (game.rnd.between(472, 500));

        var leftXstart = (game.rnd.between(240, 250));
        var midXstart = (game.rnd.between(290, 300));
        var rightXstart = (game.rnd.between(380, 390));

        var lanesXstart = [leftXstart, midXstart, rightXstart];

        var lanesXend = [leftXend, midXend, rightXend];

        var cupGroup = this.cups.getFirstExists(false);
            if(!cupGroup) {
            cupGroup = new CupGroup(this.game, this.cups);  
        }

        cupGroup.reset(lanesXstart[game.rnd.integerInRange(0,2)], lanesYstart);

        console.log(cupGroup.x);


        tween_size = game.add.tween(cupGroup.scale);
        tween_size.to({ x: 0.7, y: 0.7 }, cupSpeed, 'Linear', true, 0);


        tween_position = game.add.tween(cupGroup);

        if (cupGroup.x === lanesXstart[0]){
            tween_position.to({ x: lanesXend[0], y: tableEnd }, cupSpeed, 'Linear', true, 0);
        } else if (cupGroup.x === lanesXstart[1]) {
            tween_position.to({ x: lanesXend[1], y: tableEnd }, cupSpeed, 'Linear', true, 0);
        } else {
            tween_position.to({ x: lanesXend[2], y: tableEnd }, cupSpeed, 'Linear', true, 0);
        }

        function fallDown() {
            tween_position = game.add.tween(cupGroup);
            tween_position.to({ y: 1250}, 500, 'Linear', true, 0);
            tween_position.start();
        }

        tween_position.onComplete.addOnce(fallDown);
        cupGroup.sort('y', Phaser.Group.SORT_ASCENDING);
        layerSort();
       
    },

    render: function(){
        game.debug.body(player);
        // game.debug.body();
    }

};
