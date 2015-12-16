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
//    function nextState() {
//      fadeOut("PreGame");
//    }

    // Title
    // var text = "YOU WIN";
    // var style = { font: "65px Arial", fill: "#FF0000", align: "center" };
    // var endTitle = game.add.text(game.world.centerX, 130, text, style);
    // endTitle.anchor.set(0.5,0.5);

    // var winPageBgMobile = game.add.

    // Start button
    var winPageBgMobile = game.add.sprite(0,0,'winPageBgMobile');

    // Create button //
    replayButton = game.add.button(75, 570, "replayButton");
    replayButton.variable = "PreGame"; // next state
    replayButton.inputEnabled = true;
    replayButton.events.onInputDown.add(toNextState, this);

    // Custom share buttons in Phaser
    var shareTwitterButton = game.add.button(349, 846, 'shareTwitterButton', this.shareTwitter);
    var shareFacebookButton = game.add.button(289, 846, 'shareFacebookButton', this.shareFacebook);

    fadeIn();
  }
};
