/* globals game, console*/
var endGameWin = function(game) {
  console.log(game);
};

endGameWin.prototype = {

// Share Social Function
  shareTwitter: function() {
    openDeviceBrowser('https://twitter.com/intent/tweet?url=http://www.tagworldwide.com&text=Custom+Text&via=custom_via&hashtags=custom_hashtag');
  },
  shareFacebook: function() {
    openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://www.tagworldwide.com');
  },
// End Share Social Function

  preload: function() {
    game.load.image("replayButton", "images/winPage/replay.png");

  },
  create: function() {

    // Change to game stage
    function nextState() {
      game.state.start("PreGame");
    }

    // Title
    // var text = "YOU WIN";
    // var style = { font: "65px Arial", fill: "#FF0000", align: "center" };
    // var endTitle = game.add.text(game.world.centerX, 130, text, style);
    // endTitle.anchor.set(0.5,0.5);

    // var winPageBgMobile = game.add.

    // Start button
    var winPageBgMobile = game.add.sprite(0,0, 'winPageBgMobile');
    var replayButton = game.add.button(78, 635, "replayButton",nextState);

    // Custom share buttons in Phaser
    var shareTwitterButton = game.add.button(209, 848, 'shareTwitterButton', this.shareTwitter);
    var shareFacebookButton = game.add.button(131, 848, 'shareFacebookButton', this.shareFacebook);



    // Draw solid black screen for fading
    // var width = game.world.width // example;
    // var height = game.world.height // example;
    // var bmd = game.add.bitmapData(width, height);

    // bmd.ctx.beginPath();
    // bmd.ctx.rect(0, 0, width, height);
    // bmd.ctx.fillStyle = '#000000';
    // bmd.ctx.fill();
    // blackbox= game.add.sprite(game.world.centerX, game.world.centerY, bmd);
    // blackbox.anchor.setTo(0.5, 0.5);
    // fadein();
  }
};
