function processHandler(e,a){return!0}function collisionHandler(e,a){2===a.frame?(a.kill(),console.log("hot")):(a.kill(),console.log("ice"))}function moveOver(){var e=game.width/2;game.input.worldX<=e?movePlayer.left():game.input.worldX>=e&&movePlayer.right()}function beginSwipe(){var e;e=game.input.worldX,game.input.onDown.remove(beginSwipe),game.input.onUp.add(endSwipe)}function endSwipe(){endX=game.input.worldX;var e=startX-endX;Math.abs(e)>10&&(e>0?movePlayer.left():movePlayer.right()),game.input.onDown.add(beginSwipe),game.input.onUp.remove(endSwipe)}function checkPos(e){e.y>3*game.height&&(e.y=-1e3)}function generateCup(){cups=game.add.physicsGroup(),cups.scale.setTo(.35);for(var e=0,a=0;10>a;a++){var o=cups.create(game.world.randomX,game.world.randomY,"coffee",2),n=cups.create(game.world.randomX,game.world.randomY,"coffee",game.rnd.between(3,6));n.body.velocity.y=game.rnd.between(100,300),o.body.velocity.y=game.rnd.between(400,800),game.add.tween(o).to({y:game.height},2e3,Phaser.Easing.Linear.None,!0),n.anchor.set(.5)}}var player,playerPosition,playerPositions,playerSpeed=300,cups,cursor,lane0X,lane1X,lane2X,lanesXl,playGame=function(e){},movePlayer={left:function(){if(playerPosition>0){var e=game.add.tween(player).to({x:playerPositions[playerPosition-1]},playerSpeed,Phaser.Easing.Linear.None,!0);player.animations.play("left",!1),playerPosition--,console.log(playerPosition)}else player.animations.play("halfLeft",!1)},right:function(){if(2>playerPosition){var e=game.add.tween(player).to({x:playerPositions[playerPosition+1]},playerSpeed,Phaser.Easing.Linear.None,!0);player.animations.play("right",!1),playerPosition++,console.log(playerPosition)}else player.animations.play("halfRight",!1)}};playGame.prototype={preload:function(){game.load.image("shop","images/shop.jpg"),game.load.image("table","images/table.png"),game.load.spritesheet("coffee","images/cups.png",334,342),game.load.spritesheet("player","images/playerSprite.png",252,269)},create:function(){game.physics.startSystem(Phaser.Physics.ARCADE),shop=game.add.sprite(0,0,"shop"),shop.anchor.set(0),generateCup();var e=game.width/4-70,a=game.width/2,o=game.width/4+70;lanesX=[e,a,o],playerPosition=1,playerPositions=[lanesX[0],lanesX[1],lanesX[2]],player=game.add.sprite(playerPositions[playerPosition],game.height-130,"player"),player.anchor.set(.5),game.physics.arcade.enable(player),player.animations.add("left",[0,1,2,3,4],10,!1),player.animations.add("right",[5,6,7,8,4],10,!1),player.animations.add("halfLeft",[0,4],10,!1),player.animations.add("halfRight",[5,4],10,!1),cursor=game.input.keyboard.createCursorKeys(),game.input.onDown.add(moveOver),game.input.onDown.add(beginSwipe,this),cursor.left.onDown.add(movePlayer.left),cursor.right.onDown.add(movePlayer.right)},update:function(){cups.forEach(checkPos,this),game.physics.arcade.overlap(player,cups,collisionHandler,processHandler,this)}};