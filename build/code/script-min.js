function processHandler(e,a){return!0}function collisionHandler(e,a){17===a.frame&&(a.kill(),console.log("hot coffee"))}function moveOver(){var e=game.width/2;game.input.worldX<=e?movePlayer.left():game.input.worldX>=e&&movePlayer.right()}function beginSwipe(){startX=game.input.worldX,game.input.onDown.remove(beginSwipe),game.input.onUp.add(endSwipe)}function endSwipe(){endX=game.input.worldX;var e=startX-endX;Math.abs(e)>10&&(e>0?movePlayer.right():movePlayer.left()),game.input.onDown.add(beginSwipe),game.input.onUp.remove(endSwipe)}var player,playerPosition,playerPositions,playerSpeed=400,cups,cursor,startX,endX,playGame=function(e){},movePlayer={left:function(){if(playerPosition>0){var e=game.add.tween(player).to({x:playerPositions[playerPosition-1]},playerSpeed,Phaser.Easing.Linear.None,!0);playerPosition--,console.log(playerPosition)}},right:function(){if(2>playerPosition){var e=game.add.tween(player).to({x:playerPositions[playerPosition+1]},playerSpeed,Phaser.Easing.Linear.None,!0);playerPosition++,console.log(playerPosition)}}};playGame.prototype={preload:function(){game.load.image("player","images/player.png"),game.load.spritesheet("coffee","images/fruitnveg32wh37.png",32,32)},create:function(){game.physics.startSystem(Phaser.Physics.ARCADE),playerPosition=1,playerPositions=[game.width/4,game.width/2,game.width/2+game.width/4],player=game.add.sprite(playerPositions[playerPosition],game.height-40,"player"),player.anchor.set(.5),game.physics.arcade.enable(player),cups=game.add.physicsGroup();for(var e=0;50>e;e++){var a=cups.create(game.rnd.between(0,600),game.rnd.between(500,870),"coffee",game.rnd.between(0,35));a.body.mass=-100}for(var e=0;20>e;e++)var a=cups.create(game.rnd.between(0,600),game.rnd.between(500,870),"coffee",17);cursor=game.input.keyboard.createCursorKeys(),game.input.onDown.add(moveOver),cursor.left.onDown.add(movePlayer.left),cursor.right.onDown.add(movePlayer.right)},update:function(){game.physics.arcade.overlap(player,cups,collisionHandler,processHandler,this)&&console.log("overlapped")}};