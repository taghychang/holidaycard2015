var Cup=function(t,s,u,e){Phaser.Sprite.call(this,t,s,u,"cup",e),this.anchor.setTo(.5,.9),this.game.physics.arcade.enableBody(this)};Cup.prototype=Object.create(Phaser.Sprite.prototype),Cup.prototype.constructor=Cup,Cup.prototype.update=function(){};var CupGroup=function(t,s){Phaser.Group.call(this,t,s),this.scale.setTo(.2,.2),this.cupPlus1=new Cup(this.game,0,0,0),this.cupPlus3=new Cup(this.game,0,0,1),this.cupMinus1=new Cup(this.game,0,0,2),this.cupMinus2=new Cup(this.game,0,0,3),this.cupsPlus=[this.cupPlus1,this.cupPlus3,this.cupMinus1,this.cupMinus2],score<3?this.add(this.cupsPlus[t.rnd.integerInRange(0,1)]):score>7?this.add(this.cupsPlus[t.rnd.integerInRange(1,3)]):this.add(this.cupsPlus[t.rnd.integerInRange(0,3)]),this.hasScored=!1};CupGroup.prototype=Object.create(Phaser.Group.prototype),CupGroup.prototype.constructor=CupGroup,CupGroup.prototype.update=function(){},CupGroup.prototype.reset=function(t,s){this.cupPlus1.reset(0,0),this.cupPlus3.reset(0,0),this.cupMinus1.reset(0,0),this.cupMinus2.reset(0,0),this.x=t,this.y=s,this.scale.setTo(.2,.2),this.hasScored=!1,this.exists=!0};