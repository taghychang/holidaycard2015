/*globals console: true, Phaser: true, game*/

var player;
var playerPosition;
var playerPositions;
var playerSpeed = 300;
var cups;
var cursor;

// SCORE VARS
var score;

var playGame = function(game) {};

function processHandler(player, coffee) {
    return true;
}

function scoreHandler(coffee){

    if (coffee.frame === 2) {
        score += 1;
    } else {
        score -= 1;
    } 
    stageFreeze.frame = score;
    
    if(score == 8 || score == 4 ) {
        //game.state.start("EndGame");
        console.log("GAME OVER .. MOVE ON");
    }
}

function collisionHandler(player, coffee) {
    if (coffee.frame === 2) {
        coffee.kill();
        console.log("hot");
    } else {
        coffee.kill();
        console.log("ice");
    }

    scoreHandler(coffee);
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
            var tweenL = game.add.tween(player).to({
                x: playerPositions[playerPosition - 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            player.animations.play('left', false);
            playerPosition--;
            console.log(playerPosition);
        } else {
            //Play half animation left
            player.animations.play('halfLeft', false);

        }
    },

    right: function() {
        if (playerPosition < 2) {
            var tweenR = game.add.tween(player).to({
                x: playerPositions[playerPosition + 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            player.animations.play('right', false);
            playerPosition++;
            console.log(playerPosition);
        } else {
            // //Play half animation right
            player.animations.play('halfRight', false);

        }
    }
};

function checkPos(cup) {

    if (cup.y > game.height*3) {
        cup.y = -1000;
    }

}

function generateCup() {
    cups = game.add.physicsGroup();
    cups.scale.setTo(.35);
    var y = 0;
    // game.rnd.between(lanesX[0], lanesX[1]

    for (var i = 0; i < 10; i++) {
        var hotPlus1 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 2);
        // var hotPlus3 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 3);
        // var hotPlus5 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 4);
        var cup = cups.create(game.world.randomX, game.world.randomY, 'coffee', game.rnd.between(3, 6));
        cup.body.velocity.y = game.rnd.between(100, 300);
        hotPlus1.body.velocity.y = game.rnd.between(400, 800);

        game.add.tween(hotPlus1).to( { y : game.height}, 2000, Phaser.Easing.Linear.None, true);
        //        game.add.tween(hotcCoffee.scale).to( { x: 10, y: 10 }, 2000, Phaser.Easing.Linear.None, true);
        cup.anchor.set(0.5);
    }


}

playGame.prototype = {
    preload: function() {
        game.load.image("shop", "images/shop.jpg");
        game.load.image("table", "images/table.png");
        game.load.image("cup_move", "images/cup.png");
        // game.load.image("player", "images/player.png");
        // game.load.spritesheet('coffee', 'images/fruitnveg32wh37.png', 32, 32);
        game.load.spritesheet('coffee', 'images/cups.png', 334, 342);
        game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);

        // ADD STAGEFREEZE SPRITESHEET
        game.load.atlas("stageFreeze", "images/stageFreeze/stageFreeze.png", "images/stageFreeze/stageFreeze.json");

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        shop = game.add.sprite(0, 0, 'shop');
        shop.anchor.set(0);

        // table = game.add.sprite(game.world.centerX, game.world.height - 50, 'table');
        // table.anchor.set(0.5, 1);

        // PLACE STAGE FREEZE ON STAGE & DECLARE INITIAL SCORE 
        score = 5;  // out of 10 
        stageFreeze = game.add.sprite(0, 0, "stageFreeze");
        stageFreeze.frame = score;

        generateCup();

        var lane0X = game.width / 2 - 260;
        var lane1X = game.width / 2;
        var lane2X = game.width / 2 + 260;
        lanesX = [lane0X, lane1X, lane2X];

        playerPosition = 1;
        playerPositions = [lanesX[0], lanesX[1], lanesX[2]];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 160, "player");
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);

        cursor = game.input.keyboard.createCursorKeys();

        // // //Game Controls
        game.input.onDown.add(moveOver);
        game.input.onDown.add(beginSwipe, this);


        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);
            // Marach's move cups ==================================

    var cups_on_table = game.add.group();

    function ServeCup() {

      // Setting
      var start_position = 395;
      var cup_speed = 3000;
      var end_position = 782;
      // Position to start the cup
      if (this.lane=='left'){
        var cup_move = cups_on_table.create(game.rnd.between(240, 265), start_position, 'cup_move');
      }
      else if (this.lane=='mid'){
        var cup_move = cups_on_table.create(game.rnd.between(290, 285), start_position, 'cup_move');
      }
      else if (this.lane=='right'){
        var cup_move = cups_on_table.create(game.rnd.between(345, 370), start_position, 'cup_move');
      }

      // Scale the cup up
      cup_move.scale.setTo(0.17,0.17);
      cup_move.anchor.set(0.5,0.9);
      tween_size = game.add.tween(cup_move.scale);
      tween_size.to({x:0.5, y:0.5}, cup_speed, 'Linear', true, 0);

      // Position to stop the cup
      tween_position = game.add.tween(cup_move);
      if (this.lane=='left'){
        tween_position.to({x:game.rnd.between(0, 108), y:end_position}, cup_speed, 'Linear', true, 0);
      }
      else if (this.lane=='mid'){
        tween_position.to({x:game.rnd.between(240, 360), y:end_position}, cup_speed, 'Linear', true, 0);
      }
      else if (this.lane=='right'){
        tween_position.to({x:game.rnd.between(472, 580), y:end_position}, cup_speed, 'Linear', true, 0);
      }
      tween_position.onComplete.addOnce(fallDown);
      tween_position.start();
      function fallDown() {
        tween_position = game.add.tween(cup_move);
        tween_position.to({y:1200}, 1000, 'Linear', true, 0);
        tween_position.start();
      }
    cups_on_table.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    // Using Serve Cup
    cursor.left.onDown.add(ServeCup, {lane: 'left'});
    cursor.right.onDown.add(ServeCup, {lane: 'right'});
    cursor.down.onDown.add(ServeCup, {lane: 'mid'});

    // End Marach's move cups ================================================
    },
    update: function() {

        cups.forEach(checkPos, this);

        if (game.physics.arcade.overlap(player, cups, collisionHandler, processHandler, this)) {

        }
    }

};

