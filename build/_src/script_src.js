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

var playGame = function(game) {
    if (game) {}
};

function processHandler(player, cupHit) {
    return true;
}

function scoreHandler(cupHit) {

    if (cupHit.frame === 0) {
        score += 3;
        cupGeneratorSpeed -= 0.4;
        console.log(score);
        console.log("cupG =" + cupGeneratorSpeed);
    } else if (cupHit.frame === 1)  {
        score += 1;
        // cupGeneratorSpeed -= .4;
    } else if (cupHit.frame === 2) {
        score -= 2;
        cupGeneratorSpeed += 0.2;
        console.log("--"+score);
    } else {
        score -= 1;
        cupGeneratorSpeed += 0.2;
        console.log("--"+score);
    }

    stageFreeze.frame = score;
    // checkEnd();
    // adjustDifficulty();
    console.log('time on table(speed) ='+ cup_speed)

    if (score >= 10 || score === 0) {
        game.state.start('EndGame');
        console.log('GAME OVER .. MOVE ON');
    }
}

function collisionHandler(player, cupHit) {
    if (cupHit.frame === 0 || cupHit.frame === 1) {
        cupHit.kill();
        console.log('hot');
    } else {
        cupHit.kill();
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
}

function endSwipe() {

    endX = game.input.worldX;
    var distX = startX - endX;

    if (Math.abs(distX) > 10) {
        if (distX > 0) {
            movePlayer.right();
        } else {
            movePlayer.left();
        }
    }
    game.input.onDown.add(beginSwipe);
    game.input.onUp.remove(endSwipe);
}

var movePlayer = {

    left: function() {
        if (playerPosition > 0) {
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
        game.load.image('shop', 'images/shop.jpg');
        game.load.image('table', 'images/table.png');

        // game.load.image('player', 'images/player.png');
        game.load.atlasXML('cup', 'images/cups/sprites.png', 'images/cups/sprites.xml');
        game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);

        // ADD STAGEFREEZE SPRITESHEET
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        cupGeneratorSpeed = 0.5;
        playerSpeed = 200;
        cupSpeed = 1000;
        
        // DEBUG
        // game.add.plugin(Phaser.Plugin.Debug);

        shop = game.add.sprite(0, 0, 'shop');
        shop.anchor.set(0);

        // PLACE STAGE FREEZE ON STAGE & DECLARE INITIAL SCORE 
        score = 5; // out of 10 
        stageFreeze = game.add.sprite(0, 0, 'stageFreeze');
        stageFreeze.frame = score;


        // PLAYER POSITIONS TO SLIDE INTO
        var lane0X = game.width / 2 - 260;
        var lane1X = game.width / 2;
        var lane2X = game.width / 2 + 260;
        var lanesX = [lane0X, lane1X, lane2X];

        playerPosition = 1;
        playerPositions = [lanesX[0], lanesX[1], lanesX[2]];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 160, 'player');
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        // PLAYER SPRTE ANIMATIONS
        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);

        cursor = game.input.keyboard.createCursorKeys();

        // GAME CONTROLS
        game.input.onDown.add(moveOver);
        game.input.onDown.add(beginSwipe, this);

        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);

        this.cups = this.game.add.group();

        game.physics.enable(player, Phaser.Physics.ARCADE);

        // SET HIT AREA ON PLAYER
        player.body.setSize(10, 10, 0, 30);

        game.physics.enable(player, Phaser.Physics.ARCADE);

        
        // To position player on the top ================================================
        var player_layer = game.add.group();
        var freeze_layer = game.add.group();
        player_layer.add(player);
        freeze_layer.add(stageFreeze);
        game.world.bringToTop(freeze_layer);

        // SETUP TIMER FOR CUP GENERATOR AND START
        this.cupGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * cupGeneratorSpeed, this.generateCups, this);
        this.cupGenerator.timer.start();
    },
    update: function() {

        this.cups.forEach(function(cupGroup) {
            this.game.physics.arcade.overlap(player, cupGroup,  collisionHandler, processHandler, this);
        }, this);
    }, 

    generateCups: function() { 

        var tableEnd = 782;
        var lanesYstart = 395;

        var leftXend = (game.rnd.between(0, 108));
        var midXend = (game.rnd.between(240, 360));
        var rightXend = (game.rnd.between(472, 580));

        var leftXstart = (game.rnd.between(240, 265));
        var midXstart = (game.rnd.between(290, 285));
        var rightXstart = (game.rnd.between(345, 370));

        var lanesXstart = [leftXstart, midXstart, rightXstart];

        var lanesXend = [leftXend, midXend, rightXend];

        var cupGroup = this.cups.getFirstExists(false);
            if(!cupGroup) {
            cupGroup = new CupGroup(this.game, this.cups);  
        }

        cupGroup.reset(lanesXstart[game.rnd.integerInRange(0,2)], lanesYstart);

        console.log(cupGroup.x);


        tween_size = game.add.tween(cupGroup.scale);
        tween_size.to({ x: 0.5, y: 0.5 }, cupSpeed, 'Linear', true, 0);


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
            tween_position.to({ y: 1200}, 500, 'Linear', true, 0);
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
