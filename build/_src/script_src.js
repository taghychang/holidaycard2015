/*globals console: true, Phaser: true, game*/
<<<<<<< HEAD

var player;
var playerPosition;
var playerPositions;
var playerSpeed = 300;
var cups;
var cursor;
var lane0X;
var lane1X;
var lane2X;
var lanesX;
var startX;
var endX;


var playGame = function(game) {};

function processHandler(player, coffee) {
    return true;
}

function collisionHandler(player, coffee) {
    if (coffee.frame === 2) {
        coffee.kill();
        console.log("hot");
    } else {
        coffee.kill();
        console.log("ice");
    }
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
    // cups.scale.setTo(.35);
    var y = 0;
    // var cupHome = 

    for (var i = 0; i < 10; i++) {
        var hotPlus1 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 2);
        // var hotPlus3 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 3);
        // var hotPlus5 = cups.create(game.world.randomX, game.world.randomY, 'coffee', 4);
        var cup = cups.create(game.world.randomX, game.world.randomY, 'coffee', game.rnd.between(3, 6));
        cup.body.velocity.y = game.rnd.between(100, 300);
        hotPlus1.body.velocity.y = game.rnd.between(400, 800);

        game.add.tween(hotPlus1).to( { y : game.height }, 2000, Phaser.Easing.Linear.None, true);
        //        game.add.tween(hotcCoffee.scale).to( { x: 10, y: 10 }, 2000, Phaser.Easing.Linear.None, true);
        cup.anchor.set(0.5);
    }


}

playGame.prototype = {
    preload: function() {
        game.load.image("shop", "images/shop.jpg");
        game.load.image("table", "images/table.png");
        // game.load.image("player", "images/player.png");
        // game.load.spritesheet('coffee', 'images/fruitnveg32wh37.png', 32, 32);
        game.load.spritesheet('coffee', 'images/cups.png', 334, 342);
        game.load.spritesheet('player', 'images/playerSprite.png', 252, 269);

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        shop = game.add.sprite(0, 0, 'shop');
        shop.anchor.set(0);

        // table = game.add.sprite(game.world.centerX, game.world.height - 50, 'table');
        // table.anchor.set(0.5, 1);

        generateCup();

        var lane0X = game.width / 2 - 220;
        var lane1X = game.width / 2;
        var lane2X = game.width / 2 + 220;
        lanesX = [lane0X, lane1X, lane2X];

        playerPosition = 1;
        playerPositions = [lanesX[0], lanesX[1], lanesX[2]];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 130, "player");
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        player.animations.add('left', [0, 1, 2, 3, 4], 10, false);
        player.animations.add('right', [5, 6, 7, 8, 4], 10, false);
        player.animations.add('halfLeft', [0, 4], 10, false);
        player.animations.add('halfRight', [5, 4], 10, false);

        cursor = game.input.keyboard.createCursorKeys();

        // // //Game Controls
        // game.input.onDown.add(moveOver);
        // game.input.onDown.add(beginSwipe, this);
=======

var player;
var playerPosition;
var playerPositions;
var playerSpeed = 400;
var cups;
var cursor;
var startX;
var endX;

var playGame = function(game) {};

function processHandler(player, coffee) {
    return true;
}

function collisionHandler(player, coffee) {
    if (coffee.frame === 17) {
        coffee.kill();
        console.log("hot");
    } else {
        coffee.kill();
        console.log("ice");
    }
}

var movePlayer = {
    left: function() {
        if (playerPosition > 0) {
            var tweenL = game.add.tween(player).to({
                x: playerPositions[playerPosition - 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            playerPosition--;
            console.log(playerPosition);
        } else {
            //Play half animation left

        }
    },

    right: function() {
        if (playerPosition < 2) {
            var tweenR = game.add.tween(player).to({
                x: playerPositions[playerPosition + 1]
            }, playerSpeed, Phaser.Easing.Linear.None, true);
            playerPosition++;
            console.log(playerPosition);
        } else {
            //Play half animation right
>>>>>>> c0e4736794997bf295d9657ca59b399006a3007e

        }
    }
};

<<<<<<< HEAD
        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);
    },
    update: function() {

        cups.forEach(checkPos, this);

        if (game.physics.arcade.overlap(player, cups, collisionHandler, processHandler, this)) {

        }
    }

};

=======
function checkPos(cup) {

    if (cup.y > 880) {
        cup.y = -100;
    }

}

function generateCup() {
    cups = game.add.physicsGroup();

    var y = 0;

    for (var i = 0; i < 10; i++) {
        var hotcCoffee = cups.create(game.world.randomX, game.world.randomY, 'coffee', 17);
        var cup = cups.create(game.world.randomX, game.world.randomY, 'coffee', game.rnd.between(0, 3));
        cup.body.velocity.y = game.rnd.between(100, 300);
        hotcCoffee.body.velocity.y = game.rnd.between(100, 300);
        
//        game.add.tween(hotcCoffee).to( { angle: 45 }, 2000, Phaser.Easing.Linear.None, true);
//        game.add.tween(hotcCoffee.scale).to( { x: 10, y: 10 }, 2000, Phaser.Easing.Linear.None, true);
    }


}


playGame.prototype = {
    preload: function() {

        game.load.image("player", "images/player.png");
        game.load.spritesheet('coffee', 'images/fruitnveg32wh37.png', 32, 32);
        game.load.image("table", "images/table.png");

    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);


        table = game.add.sprite(game.world.centerX, game.world.height - 150, 'table');
        table.anchor.set(0.5, 1);

        generateCup();

        playerPosition = 1;
        playerPositions = [game.width / 4, game.width / 2, game.width / 2 + game.width / 4];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 40, "player");
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        cursor = game.input.keyboard.createCursorKeys();

        //Game Controls
        game.input.onDown.add(moveOver);
        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);
    },
    update: function() {

        cups.forEach(checkPos, this);

        if (game.physics.arcade.overlap(player, cups, collisionHandler, processHandler, this)) {
            
        }
    }

};





function moveOver() {

    var halfGame = game.width / 2;

    if (game.input.worldX <= halfGame) {
        movePlayer.left();
    } else if (game.input.worldX >= halfGame) {
        movePlayer.right();

    }
}


function beginSwipe() {
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
>>>>>>> c0e4736794997bf295d9657ca59b399006a3007e
