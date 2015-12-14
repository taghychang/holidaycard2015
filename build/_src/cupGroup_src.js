

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
  this.scale.setTo(0.35, 0.35);

  // Setup cups to add to array
  this.cupMinus1 = new Cup(this.game, 0, 0, game.rnd.integerInRange(0,1));
  this.cupMinus2 = new Cup(this.game, 0, 0, game.rnd.integerInRange(2,3));
  this.cupPlus1 = new Cup(this.game, 0, 0, game.rnd.integerInRange(4,5));
  this.cupPlus3 = new Cup(this.game, 0,0, game.rnd.integerInRange(6,7));
 
  this.cupsPlus = [this.cupMinus1, this.cupMinus2, this.cupPlus1, this.cupPlus3];

  // Adjust Difficulty
  // Choose the cups to generate based on the score
  // if (score <= 3) {
  //   this.add(this.cupsPlus[game.rnd.integerInRange(0,3)]);
  // } else if (score >= 6) {
  //   this.add(this.cupsPlus[game.rnd.integerInRange(0,3)]);
  // } else {
  //   this.add(this.cupsPlus[game.rnd.integerInRange(0,3)]);
  // }
  this.add(this.cupsPlus[game.rnd.integerInRange(0,3)]);
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

  this.scale.setTo(0.35, 0.35);

  this.hasScored = false;
  this.exists = true;
};



