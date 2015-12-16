/* globals game, console*/
var endGameLose = function(game) {
  console.log(game);
};

endGameLose.prototype = {

// Share Social Function
  // shareTwitter: function() {
  //   openDeviceBrowser('https://twitter.com/intent/tweet?url=custom_url&text=Custom+Text&via=custom_via&hashtags=custom_hashtag');
  // },
  // shareFacebook: function() {
  //   openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://tagonline.tagworldwide.com/public/nytdi/holiday2015/index.html');
  // },
// End Share Social Function

  preload: function() {

  },
  create: function() {

    // Change to game stage
    function nextState() {
      game.state.start("PreGame");
    }

    var losePageBgMobile = game.add.sprite(0,0, 'losePageBgMobile');

    // Create button //
    tryAgain = game.add.button(78, 400, "tryAgain");
    tryAgain.variable = "PlayGame"; // next state
    tryAgain.inputEnabled = true;
    tryAgain.events.onInputDown.add(toNextState, this);

    // Custom share buttons in Phaser
    // var shareTwitterButton = game.add.button(349, 846, 'shareTwitterButton', this.shareTwitter);
    // var shareFacebookButton = game.add.button(289, 846, 'shareFacebookButton', this.shareFacebook);

    // fade bg music
    shopLoop.fadeTo(2000, 0.2);
    fadeIn();
  }
};
