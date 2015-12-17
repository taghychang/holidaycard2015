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
    openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://tagonline.tagworldwide.com/public/nytdi/holiday2015/index.html');
  },
   shareLinkedIn: function() {
    openDeviceBrowser('https://www.linkedin.com/shareArticle?mini=true&url=http://cappcaper.tdiny.com&title=CAPPCAPER&summary=My%20favorite%20developer%20program&source=LinkedIn');
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
    var winPageBg = game.add.sprite(0,0,'winPageBg');

    // Create button //
    replayButton = game.add.button(game.world.centerX - 247, 590, "replayButton");
    replayButton.variable = "PlayGame"; // next state
    replayButton.inputEnabled = true;
    replayButton.events.onInputDown.add(toNextState, this);

    // Custom share buttons in Phaser
    var shareTwitterButton = game.add.button(291+420, 846, 'shareTwitterButton', this.shareTwitter);
    var shareFacebookButton = game.add.button(354+420, 846, 'shareFacebookButton', this.shareFacebook);
    var shareLinkedInButton = game.add.button(418+420, 846, 'shareLinkedInButton', this.shareLinkedIn);

    fadeIn();
  }
};
