/* global console, Phaser: true, game*/

var boot = function(game) {
    console.log(game);
};

boot.prototype = {
    preload: function() {
          game.load.image("loading","images/loading.png"); 

      

    },
    create: function() {
        game.state.start("Preloader");
    }
};
