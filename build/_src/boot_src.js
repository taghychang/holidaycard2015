/* global console, Phaser: true, game*/

var boot = function(game) {
    console.log(game);
};

boot.prototype = {
    preload: function() {
    	game.load.image("startButtonMobile", "images/startButtonMobile.png");
    	game.load.image("loadingBg", "images/loadingBg.jpg");
      	game.load.image("loading","images/loading3.png"); 
    },
    create: function() {
        game.state.start("Preloader");
    }
};
