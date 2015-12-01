/*globals console: true, Phaser: true, game*/

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
        console.log("hot coffee");
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

        }
    }
};


playGame.prototype = {
    preload: function() {
        game.load.image("player", "images/player.png");
        game.load.spritesheet('coffee', 'images/fruitnveg32wh37.png', 32, 32);

    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        playerPosition = 1;
        playerPositions = [game.width / 4, game.width / 2, game.width / 2 + game.width / 4];
        player = game.add.sprite(playerPositions[playerPosition], game.height - 40, "player");
        player.anchor.set(0.5);
        game.physics.arcade.enable(player);

        cups = game.add.physicsGroup();

        //Group of coffee
        for (var i = 0; i < 50; i++) {
            var c = cups.create(game.rnd.between(0, 600), game.rnd.between(500, 870), 'coffee', game.rnd.between(0, 35));
            c.body.mass = -100;
        }

        for (var i = 0; i < 20; i++) {
            var c = cups.create(game.rnd.between(0, 600), game.rnd.between(500, 870), 'coffee', 17);
        }

        cursor = game.input.keyboard.createCursorKeys();

        //Game Controls
        game.input.onDown.add(moveOver);
        cursor.left.onDown.add(movePlayer.left);
        cursor.right.onDown.add(movePlayer.right);
    },
    update: function() {

        if (game.physics.arcade.overlap(player, cups, collisionHandler, processHandler, this)) {
            console.log('overlapped');
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
