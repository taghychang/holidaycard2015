var endGameLose=function(e){console.log(e)};endGameLose.prototype={preload:function(){},create:function(){function e(){game.state.start("PreGame")}var a=game.add.sprite(0,0,"losePageBgMobile");tryAgain=game.add.button(78,400,"tryAgain"),tryAgain.variable="PlayGame",tryAgain.inputEnabled=!0,tryAgain.events.onInputDown.add(toNextState,this),shopLoop.fadeTo(2e3,.2),fadeIn()}};