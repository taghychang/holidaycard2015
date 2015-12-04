/*globals console: true, Phaser: true, game*/

var player;
var playerPosition;
var playerPositions;
var playerSpeed = 300;
var cursor;

// ENVIRONMENT
var shop;

// SWIPE DETECTIONS VARS
var endX, startX;

// CHARACTER MOVE VARS 
var tweenL, tweenR;

// CUP VARS
var tween_position,
    tween_size,
    cups_on_table,
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

    if (cupHit.frame === 0 || cupHit.frame === 1) {
        score += 1;
        console.log(score);
    } else {
        score -= 1;
        console.log("--"+score);
    }
    stageFreeze.frame = score;
    checkEnd();
    adjustDifficulty();
    console.log('time on table(speed) ='+ cup_speed)

    // if (score === 8 || score === 4) {
    //     //game.state.start('EndGame');
    //     console.log('GAME OVER .. MOVE ON');
    // }
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
            movePlayer.left();
        } else {
            movePlayer.right();
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

function checkPos(cup) {

    if (cup.y > game.height * 3) {
        cup.y = -1000;
    }

}

// make cup come faster if the player is doing good
function adjustDifficulty() {
  cup_speed = 2300-score*250;
}

// make cup come faster if the player is doing good
function checkEnd() {
  if (score==10) {
      console.log("YOU WIN");
      game.state.start("EndGame");
  }
  else if (score==0) {
      console.log("YOU LOSE");
      game.state.start("EndGame");
  }
}

// Marach's move cups ==================================
function ServeCup() {
    // Setting
    var start_position = 395;
    var end_position = 782;
    var cup_move;

    // Position to start the cup
    if (this.lane === 'left') {
        cup_move = cups_on_table.create(game.rnd.between(240, 265), start_position, 'cup_move');
    } else if (this.lane === 'mid') {
        cup_move = cups_on_table.create(game.rnd.between(295, 280), start_position, 'cup_move');
    } else if (this.lane === 'right') {
        cup_move = cups_on_table.create(game.rnd.between(345, 370), start_position, 'cup_move');
    }

    cup_move.frame = game.rnd.between(0, 3);

    // Scale the cup up
    cup_move.scale.setTo(0.17, 0.17);
    cup_move.anchor.set(0.5, 0.9);
    tween_size = game.add.tween(cup_move.scale);
    tween_size.to({ x: 0.5, y: 0.5 }, cup_speed, 'Linear', true, 0);

    // Position to stop the cup
    tween_position = game.add.tween(cup_move);
    if (this.lane === 'left') {
        tween_position.to({ x: game.rnd.between(0, 108),y: end_position }, cup_speed, 'Linear', true, 0);
    } else if (this.lane === 'mid') {
        tween_position.to({ x: game.rnd.between(240, 360),y: end_position }, cup_speed, 'Linear', true, 0);
    } else if (this.lane === 'right') {
        tween_position.to({ x: game.rnd.between(472, 580),y: end_position }, cup_speed, 'Linear', true, 0);
    }

    function fallDown() {
        tween_position = game.add.tween(cup_move);
        tween_position.to({ y: 1200}, 1000, 'Linear', true, 0);
        tween_position.start();
    }

    tween_position.onComplete.addOnce(fallDown);
    tween_position.start();
    cups_on_table.sort('y', Phaser.Group.SORT_ASCENDING);
}

playGame.prototype = {
    preload: function() {
        game.load.image('shop', 'images/shop.jpg');
        game.load.image('table', 'images/table.png');

        // game.load.image('player', 'images/player.png');
        game.load.atlas('cup_move', 'images/cups/cups.png', 'images/cups/cups.json');
        game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);

        // ADD STAGEFREEZE SPRITESHEET
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // DEBUG
        game.add.plugin(Phaser.Plugin.Debug);

        shop = game.add.sprite(0, 0, 'shop');
        shop.anchor.set(0);

        // table = game.add.sprite(game.world.centerX, game.world.height - 50, 'table');
        // table.anchor.set(0.5, 1);

        // PLACE STAGE FREEZE ON STAGE & DECLARE INITIAL SCORE 
        score = 5; // out of 10 
        stageFreeze = game.add.sprite(0, 0, 'stageFreeze');
        stageFreeze.frame = score;

        var lane0X = game.width / 2 - 260;
        var lane1X = game.width / 2;
        var lane2X = game.width / 2 + 260;
        var lanesX = [lane0X, lane1X, lane2X];

        playerPosition = 1;
        playerPositions = [lanesX[0], lanesX[1], lanesX[2]];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 160, 'player');
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);

        cursor = game.input.keyboard.createCursorKeys();

        //Game Controls
        game.input.onDown.add(moveOver);
        game.input.onDown.add(beginSwipe, this);

        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);

        cups_on_table = game.add.physicsGroup();
        player.body.setSize(200, 100, 0, 110);


        game.physics.enable([player,cups_on_table], Phaser.Physics.ARCADE);

    
        // Keyboard control to generate serving cups
        cursor.left.onDown.add(ServeCup, { lane: 'left' });
        cursor.right.onDown.add(ServeCup, { lane: 'right' });
        cursor.down.onDown.add(ServeCup, { lane: 'mid' });

        // End Marach's move cups ================================================
        
        // To position player on the top ================================================
        var player_layer = game.add.group();
        var freeze_layer = game.add.group();
        player_layer.add(player);
        freeze_layer.add(stageFreeze);
        game.world.bringToTop(freeze_layer);
    },
    update: function() {

        if (game.physics.arcade.overlap(player, cups_on_table, collisionHandler, processHandler, this)) {
        }
    }, 
    render: function(){
        game.debug.body(player);
        game.debug.body(cups_on_table);
    }

};
