var endGameLose=function(t){console.log(t)};endGameLose.prototype={shareTwitter:function(){openDeviceBrowser("https://twitter.com/intent/tweet?url=custom_url&text=Custom+Text&via=custom_via&hashtags=custom_hashtag")},shareFacebook:function(){openDeviceBrowser("https://www.facebook.com/sharer/sharer.php?u=http://www.tagworldwide.com")},preload:function(){},create:function(){function t(){game.state.start("PreGame")}var e=game.add.sprite(0,0,"losePageBgMobile"),o=game.add.button(78,450,"tryAgain",t),a=game.add.button(349,846,"shareTwitterButton",this.shareTwitter),r=game.add.button(289,846,"shareFacebookButton",this.shareFacebook)}};