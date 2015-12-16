/* global console, Phaser: true, game*/

var preloader = function(game) {
    console.log(game);
};

preloader.prototype = {
    preload: function() {

        game.load.start();
        var loadMask = game.add.image(game.world.centerX + 15, game.world.centerY + 142, "loadMask");
        loadMask.anchor.setTo(0.5, 1);
        loadMask.scale.setTo(1.2);

        var loadingBar = this.add.sprite(game.world.centerX + 15, game.world.centerY + 144, "loading");
        loadingBar.anchor.setTo(0.5, 1);
        this.load.setPreloadSprite(loadingBar, 1);

        var loadingBg = game.add.image(game.world.centerX, game.world.centerY, "loadingBg");
        loadingBg.anchor.set(0.5, 0.5);

        var loadSteam = game.add.image(320, 220, 'loadSteam');

        loadSteam.alpha = 0;
        game.add.tween(loadSteam).to( { alpha: 1 }, 5000, "Linear", true, 0, 0);
       
        loadSteam.anchor.setTo(0.5);
        //ADD AUDIO
        game.load.audio('shopLoop', ['sounds/shopLoop.mp3', 'sounds/shopLoop.ogg']);
        game.load.audio('cupOnMove', ['sounds/cupOnMove.mp3', 'sounds/cupOnMove.ogg']);
        game.load.audio('loseScene', ['sounds/loseScene.mp3', 'sounds/loseScene.ogg']);
        game.load.audio('winScene', ['sounds/winScene.mp3', 'sounds/winScene.ogg']);
        game.load.audio('cupOnMove', ['sounds/cupOnMove.mp3', 'sounds/cupOnMove.ogg']);
        game.load.audio('noiseLoop', ['sounds/shop.mp3', 'sounds/shop.ogg']);

        game.load.image('shop', 'images/shop.jpg');
        //ADD POWERDOWN POWERUP SPRITESHEET
        game.load.atlas('snowflakes', 'images/powerDown/powerDown_snowflake_spriteSheet.png', 'images/powerDown/powerDown_snowflake_spriteSheet.json');
        game.load.atlas('steam', 'images/powerUp/powerUp_steam_spriteSheet.png', 'images/powerUp/powerUp_steam_spriteSheet.json');

        game.load.atlas('player', 'images/playerSprite.png', 'images/playerSprite.json');
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

        game.load.image("demoPlaceholder", "images/demoPlaceholder.jpg");
        // Audio Files for PowerUp/PowerDown
        game.load.audio('powerUpFX', ['sounds/powerUpAudio.mp3', 'sound/powerUpAudio.ogg']);
        game.load.audio('powerDownFX', ['sounds/powerDownAudio.mp3', 'sound/powerDownAudio.ogg']);
        game.load.image('shopMobile', 'images/shopMobile.jpg');
        game.load.atlas('barista', 'images/barista/barista.png', 'images/barista/barista.json');
        // ADD CUPS SPRITESHEET
        game.load.atlas('cup', 'images/cups/cups.png', 'images/cups/cups.json');
        game.load.atlas('splash', 'images/cups/splash.png', 'images/cups/splash.json');
        // ADD STAGEFREEZE SPRITESHEET
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');
        game.load.atlas('countDown', 'images/countDown/countDown.png', 'images/countDown/countDown.json');
        game.load.atlas('scoreGauge', 'images/scoreGauge/scoreGauge.png', 'images/scoreGauge/scoreGauge.json');
        // ADD STEAM SPRITESHEET
        game.load.atlas('stageSteam', 'images/stageSteam/stageSteam.png', 'images/stageSteam/stageSteam.json');
        //WIN PAGE ASSETS
        game.load.image('winPageBgMobile', 'images/winPage/winPageBgMobile.jpg');
        game.load.image('losePageBgMobile', 'images/losePage/losePageBgMobile.jpg');
        game.load.image('shareTwitterButton', 'images/winPage/shareTwitterButton.png'); 
        game.load.image('shareFacebookButton', 'images/winPage/shareFacebookButton.png'); 
        game.load.image('playAgain', 'images/winPage/replay.png');
        game.load.image('tryAgain', 'images/losePage/tryAgain.png');
        // INTRO VIDEO
        game.load.video('introVideo', 'video/intro.mp4');


    
    },
    create: function() {

        game.load.onLoadStart.addOnce(loadStart);
        game.load.onLoadComplete.addOnce(loadComplete);
    }
};

function loadStart() {
      game.add.text(275, 800, 'LOADING', { fill: '#ffffff' });
}

function loadComplete() {
    game.state.start('PreGame');
}





