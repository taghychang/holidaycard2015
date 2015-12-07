

var Cup = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cup', frame);
  this.anchor.setTo(0.5, 0.9);
  this.game.physics.arcade.enableBody(this);
};

Cup.prototype = Object.create(Phaser.Sprite.prototype);
Cup.prototype.constructor = Cup;

Cup.prototype.update = function() {
};


var CupGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);
  // Scale cups down to initial size
  this.scale.setTo(0.20, 0.20);

  // Setup cups to add to array
  this.cupPlus1 = new Cup(this.game, 0, 0, 0);
  this.cupPlus3 = new Cup(this.game, 0, 0, 1);
  this.cupMinus1 = new Cup(this.game, 0, 0, 2);
  this.cupMinus2 = new Cup(this.game, 0,0, 3);

  this.cupsPlus = [this.cupPlus1, this.cupPlus3, this.cupMinus1, this.cupMinus2];

  // Adjust Difficulty
  // Choose the cups to generate based on the score
  if (score < 3) {
    this.add(this.cupsPlus[game.rnd.integerInRange(0,1)]);
  } else if (score > 7) {
    this.add(this.cupsPlus[game.rnd.integerInRange(1,3)]);
  } else {
    this.add(this.cupsPlus[game.rnd.integerInRange(0,3)]);
  }

  this.hasScored = false;
 
};

CupGroup.prototype = Object.create(Phaser.Group.prototype);
CupGroup.prototype.constructor = CupGroup;

CupGroup.prototype.update = function() {

};

CupGroup.prototype.reset = function(x, y) {
  //Reset cup positions and scale after Recycle
  this.cupPlus1.reset(0,0);
  this.cupPlus3.reset(0,0); 
  this.cupMinus1.reset(0,0);
  this.cupMinus2.reset(0,0);

  this.x = x;
  this.y = y;

  this.scale.setTo(0.20, 0.20);

  this.hasScored = false;
  this.exists = true;
};



