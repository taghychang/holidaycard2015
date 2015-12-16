/* globals game, console*/
var endGameLose = function(game) {
  console.log(game);
};

endGameLose.prototype = {

// Share Social Function
  shareTwitter: function() {
    openDeviceBrowser('https://twitter.com/intent/tweet?url=custom_url&text=Custom+Text&via=custom_via&hashtags=custom_hashtag');
  },
  shareFacebook: function() {
    openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://tagonline.tagworldwide.com/public/nytdi/holiday2015/index.html');
  },
// End Share Social Function

  preload: function() {
    // game.load.image("stageFreezeLost", "images/stageFreeze/stageFreezeLost.jpg");
    // game.load.image("replayButton", "images/replay.png");
    // game.load.image("shareTwitterButton", "images/shareTwitterButton.png");
    // game.load.image("shareFacebookButton", "images/shareFacebookButton.png");
  },
  create: function() {

    // Change to game stage
    function nextState() {
      game.state.start("PreGame");
    }

    var losePageBgMobile = game.add.sprite(0,0, 'losePageBgMobile');

    // Create button //
    tryAgain = game.add.button(78, 500, "tryAgain");
    tryAgain.variable = "PlayGame"; // next state
    tryAgain.inputEnabled = true;
    tryAgain.events.onInputDown.add(toNextState, this);

    // Custom share buttons in Phaser
    var shareTwitterButton = game.add.button(349, 846, 'shareTwitterButton', this.shareTwitter);
    var shareFacebookButton = game.add.button(289, 846, 'shareFacebookButton', this.shareFacebook);


    //Background Freeze

    // var stageFreezeLost = game.add.sprite(0,0, 'stageFreezeLost');
    // // Title
    // var text = "YOU LOSE";
    // var style = { font: "65px Arial", fill: "#0000FF", align: "center" };
    // var endTitle = game.add.text(game.world.centerX, 130, text, style);
    // endTitle.anchor.set(0.5,0.5);

    // // Start button
    // var replayButton = game.add.button(game.world.centerX, game.world.centerY, "replayButton",nextState);
    // replayButton.anchor.set(0.5,0.5);

    // // Custom share buttons in Phaser
    // var shareTwitterButton = game.add.button(game.world.centerX, 600, 'shareTwitterButton', this.shareTwitter);
    // var shareFacebookButton = game.add.button(game.world.centerX, 700, 'shareFacebookButton', this.shareFacebook);

    fadeIn();
  }
};
