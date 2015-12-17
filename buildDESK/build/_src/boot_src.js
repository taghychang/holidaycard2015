/* global console, Phaser: true, game*/

var boot = function(game) {
    console.log(game);
};

boot.prototype = {
    preload: function() {
        game.load.image("startButtonMobile", "images/startButtonMobile.jpg");

    	game.load.image("loadMask","images/loadMask.jpg");

      	game.load.image("loading","images/loading.png");
      	game.load.image("loadingBg", "images/loadingBg.png");
      	game.load.image("loadSteam", "images/loadSteam.png");
        game.load.image("playBtn", "images/playBtn.png");



      
    },
    create: function() {



            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.minWidth = 760;
            game.scale.minHeight = 486;
            game.scale.maxWidth = 1500;
            game.scale.maxHeight = 960;



        // game.scale.setScreenSize(true);
        game.state.start("Preloader");
    }
};
