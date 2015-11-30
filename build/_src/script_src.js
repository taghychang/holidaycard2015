 var game;
 var player;
 var playerPosition;
 var playerPositions;
 var playerCanMove;
 var playerSpeed = 400;
 var canMoveLeft = true;
 var canMoveRight = true;
 var cups;

 window.onload = function() {
     game = new Phaser.Game(580, 880, Phaser.AUTO, "game");
     game.state.add("PlayGame", playGame);
     game.state.start("PlayGame");
 }

 var playGame = function(game) {};

 playGame.prototype = {
     preload: function() {
         game.load.image("player", "images/player.png");
     },
     create: function() {
         playerCanMove = true;
         playerPosition = 1;
         playerPositions = [game.width / 4, game.width / 2, game.width / 2 + game.width / 4];
         game.physics.startSystem(Phaser.Physics.ARCADE);
         player = game.add.sprite(playerPositions[playerPosition], game.height - 40, "player");
         player.anchor.set(0.5);
         game.physics.arcade.enable(player);
         game.input.onDown.add(moveplayer);

         cups = game.add.group();

     },
     update: function() {

     }
 }

