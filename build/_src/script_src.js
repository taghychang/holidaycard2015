/*globals console: true, Phaser: true */

 var game;
 var player;
 var playerPosition;
 var playerPositions;
 var playerSpeed = 400;
 var cups;
 var cursor;
 var startX;
 var endX;


 window.onload = function() {
     game = new Phaser.Game(580, 880, Phaser.AUTO, "game");
     game.state.add("PlayGame", playGame);
     game.state.start("PlayGame");
 };

 var playGame = function(game) {};

 playGame.prototype = {
     preload: function() {
         game.load.image("player", "images/player.png");
     },
     create: function() {
         playerPosition = 1;
         playerPositions = [game.width / 4, game.width / 2, game.width / 2 + game.width / 4];
         game.physics.startSystem(Phaser.Physics.ARCADE);
         player = game.add.sprite(playerPositions[playerPosition], game.height - 40, "player");
         player.anchor.set(0.5);
         game.physics.arcade.enable(player);

         cups = game.add.group();

         cursor = game.input.keyboard.createCursorKeys();

         //Game Controls
         game.input.onDown.add(moveOver);
         cursor.left.onDown.add(movePlayer.left);
         cursor.right.onDown.add(movePlayer.right);



     },
     update: function() {

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
