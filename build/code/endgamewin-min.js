var endGameWin=function(t){console.log(t)};endGameWin.prototype={shareTwitter:function(){openDeviceBrowser("https://twitter.com/intent/tweet?url=http://www.tagworldwide.com&text=Custom+Text&via=custom_via&hashtags=custom_hashtag")},shareFacebook:function(){openDeviceBrowser("https://www.facebook.com/sharer/sharer.php?u=http://www.tagworldwide.com")},preload:function(){game.load.image("replayButton","images/winPage/replay.png")},create:function(){function t(){game.state.start("PreGame")}var e=game.add.sprite(0,0,"winPageBgMobile"),a=game.add.button(76,590,"replayButton",t),o=game.add.button(349,846,"shareTwitterButton",this.shareTwitter),r=game.add.button(289,846,"shareFacebookButton",this.shareFacebook)}};