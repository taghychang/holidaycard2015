var endGameWin=function(t){console.log(t)};endGameWin.prototype={shareTwitter:function(){openDeviceBrowser("https://twitter.com/intent/tweet?url=http://www.tagworldwide.com&text=Custom+Text&via=custom_via&hashtags=custom_hashtag")},shareFacebook:function(){openDeviceBrowser("https://www.facebook.com/sharer/sharer.php?u=http://tagonline.tagworldwide.com/public/nytdi/holiday2015/index.html")},preload:function(){game.load.image("replayButton","images/winPage/replay.png")},create:function(){var t=game.add.sprite(0,0,"winPageBgMobile");replayButton=game.add.button(78,635,"replayButton"),replayButton.variable="PreGame",replayButton.inputEnabled=!0,replayButton.events.onInputDown.add(toNextState,this);var e=game.add.button(349,846,"shareTwitterButton",this.shareTwitter),a=game.add.button(289,846,"shareFacebookButton",this.shareFacebook);fadeIn()}};