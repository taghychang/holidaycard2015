/*globals console: true, Phaser: true, game*/

var player;
var playerPosition;
var playerPositions;
var playerSpeed = 300;
var cups;
var cursor;



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
        game.input.onDown.add(moveOver);
        game.input.onDown.add(beginSwipe, this);


        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);
    },
    update: function() {

        cups.forEach(checkPos, this);

        if (game.physics.arcade.overlap(player, cups, collisionHandler, processHandler, this)) {

        }
    }

};

