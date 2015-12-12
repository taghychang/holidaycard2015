/* global console, Phaser: true, game*/

var preloader = function(game) {
    console.log(game);
};

preloader.prototype = {
    preload: function() {

        // PRELOAD ALL ASSET
        game.load.image('shop', 'images/shop.jpg');
        game.load.image('table', 'images/table.png');
        game.load.atlasXML('cup', 'images/cups/sprites.png', 'images/cups/sprites.xml');
        game.load.spritesheet('player', 'images/playerSprite.png', 325, 347);
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

    },
    create: function() {
        game.state.start("PlayGame");
    }
};