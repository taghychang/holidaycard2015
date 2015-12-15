/* global console, Phaser: true, game*/

var boot = function(game) {
    console.log(game);
};

boot.prototype = {
    preload: function() {
    	game.load.image("startButtonMobile", "images/startButtonMobile.png");
      game.load.image("loading","images/loading2.png"); 
    },
    create: function() {
        game.state.start("Preloader");
    }
};
