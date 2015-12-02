/* globals Phaser, StageFreeze, console */

StageFreeze = function (game, rotateSpeed) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    //Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'stageFreeze');
    Phaser.Sprite.call(this, game, 0, 0, 'stageFreeze');
    this.anchor.setTo(0.5, 0.5);
    //this.rotateSpeed = rotateSpeed;
    //var randomScale = 0.1 + Math.random();
    this.scale.setTo(1);
    game.add.existing(this);
    this.inputEnabled = true;

    var freeze_up = this.animations.add('freeze_up');
    this.animations.play('freeze_up', 6, true);
    
    this.events.onInputOver.add(function(){ console.log('OVER'); }, this);

    console.log(game);
	
};

StageFreeze.prototype = Object.create(Phaser.Sprite.prototype);

StageFreeze.prototype.constructor = StageFreeze;

StageFreeze.prototype.preload = function(){
	game.load.atlas('stageFreeze', 'Sprite/StageFreeze/stageFreeze.png', 'Sprite/StageFreeze/stageFreeze.json');
};

StageFreeze.prototype.update = function() {
	//console.log("update");
    //  Automatically called by World.update
    this.angle += this.rotateSpeed;
};