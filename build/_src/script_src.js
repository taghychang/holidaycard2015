/*globals console: true, Phaser: true, game*/

var player;
var playerPosition;
var playerPositions;
var playerSpeed;
var cupSpeed;
var cursor;
var cupGeneratorSpeed;

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

var shopLoop;

//AUDIO
var powerUpAudio,
    powerDownAudio;

var playGame = function(game) {
    if (game) {}
};

function processHandler(player, cupHit) {
    return true;
}

function scoreHandler(cupHit) {

    if (cupHit.frame === 0 || 1) {
        score -= 2;
        cupGeneratorSpeed -= 0.4;
        console.log(score);
        console.log("cupG =" + cupGeneratorSpeed);
    } else if (cupHit.frame === 2 || 3)  {
        score -= 1;
        // cupGeneratorSpeed -= .4;
    } else if (cupHit.frame === 4 || 5) {
        score += 2;
        cupGeneratorSpeed += 0.2;
        console.log("--"+score);
    } else {
        score += 1;
        cupGeneratorSpeed += 0.2;
        console.log("--"+score);
    }


    scoreGauge.frame = score;


    console.log('time on table(speed) ='+ cup_speed);

// Check for win or lose condition
    if (score >= 10)  {
        game.state.start('EndGameWin');
        console.log('Win!');
    } else if (score <= 0) {
        console.log('Lose!');
        game.animateFreeze.play('freeze', 5);
        game.animateFreeze.events.onAnimationComplete.addOnce(function() {
            game.state.start("EndGame");
        });    

    }
}

function collisionHandler(player, cupHit) {
    if (cupHit.frame === 0 || cupHit.frame === 1) {
        cupHit.kill();

        powerUpAudioFX();
        console.log('hot');
    } else {
        cupHit.kill();

        powerDownAudioFX();
        console.log('ice');
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
          score=-21;
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
            score=+21;
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


// function startTunes() {
//     console.log('shopTUNESSSS');

//     shopLoop.fadeIn(1000);
// }


playGame.prototype = {
    preload: function() {
        // game.load.image('shop', 'images/shop.jpg');
        // game.load.image('table', 'images/table.png');

        game.load.atlas('cup', 'images/cups/cups.png', 'images/cups/cups.json');
        game.load.spritesheet('player', 'images/playerSprite.png', 130, 238);

        // ADD STAGEFREEZE SPRITESHEET
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');
        game.load.atlas('scoreGauge', 'images/scoreGauge/scoreGauge.png', 'images/scoreGauge/scoreGauge.json');

        // Audio Files for PowerUp/PowerDown
        game.load.audio('powerUpFX', ['sounds/powerUpAudio.mp3', 'sound/powerUpAudio.ogg']);
        game.load.audio('powerDownFX', ['sounds/powerDownAudio.mp3', 'sound/powerDownAudio.ogg']);

    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);



        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.minWidth = 320;
        // game.scale.minHeight = 480;
        // game.scale.maxWidth = 1080;
        // game.scale.maxHeight = 1639;
        // // game.scale.forcePortait(true);

        // game.scale.refresh();

       


        cupGeneratorSpeed = 0.5;
        playerSpeed = 200;
        cupSpeed = 1000;
        
        // DEBUG
        // game.add.plugin(Phaser.Plugin.Debug);

        // shop = game.add.sprite(-430, 0, 'shop');
        // shop.anchor.set(0);

        // PLACE STAGE FREEZE ON STAGE & DECLARE INITIAL SCORE 
        score = 5; // out of 10 

        scoreGauge = game.add.sprite(game.width -180, 0, 'scoreGauge');
        scoreGauge.frame = score;

        stageFreeze = game.add.sprite(0, 0, 'stageFreeze');
        //stageFreeze.frame = score;



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

        // PLAYER SPRTE ANIMATIONS
        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);

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

        game.physics.enable(player, Phaser.Physics.ARCADE);

        
        // To position player on the top ================================================
        var player_layer = game.add.group();
        // var freeze_layer = game.add.group();
        player_layer.add(player);
        // freeze_layer.add(stageFreeze);
        // game.world.bringToTop(freeze_layer);

        // SETUP TIMER FOR CUP GENERATOR AND START
        this.cupGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * cupGeneratorSpeed, this.generateCups, this);
        this.cupGenerator.timer.start();

        // PREPARE FREEZE animation when player lose
        game.animateFreeze = game.add.sprite(0,0, 'stageFreeze');
        game.animateFreeze.animations.add('freeze');
        game.animateFreeze.frame = 0;
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
       
    },

    render: function(){
        game.debug.body(player);
        // game.debug.body();
    }

};
