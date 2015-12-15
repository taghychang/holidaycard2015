/* global console, Phaser: true, game*/

var preloader = function(game) {
    console.log(game);
};

preloader.prototype = {
    preload: function() {
      
        // PRELOAD ALL ASSET
        var loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        //ADD AUDIO
        game.load.audio('shopLoop', ['sounds/shopLoop.mp3', 'sounds/shopLoop.ogg']);
        game.load.image('shop', 'images/shop.jpg');
        //ADD POWERDOWN POWERUP SPRITESHEET
        game.load.atlas('snowflakes', 'images/powerDown/powerDown_snowflake_spriteSheet.png', 'images/powerDown/powerDown_snowflake_spriteSheet.json');
        game.load.atlas('steam', 'images/powerUp/powerUp_steam_spriteSheet.png', 'images/powerUp/powerUp_steam_spriteSheet.json');
        

        game.load.spritesheet('player', 'images/playerSprite.png', 130, 238);
        game.load.atlas('stageFreeze', 'images/stageFreeze/stageFreeze.png', 'images/stageFreeze/stageFreeze.json');

        game.load.image("startButtonMobile", "images/startButtonMobile.jpg");
        game.load.image("demoPlaceholder", "images/demoPlaceholder.png");
        game.load.image('logo', 'images/logo.png');

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

       
    },
    create: function() {
        

          // DESKTOP SETTING
        if (game.device.desktop) {
            // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // game.scale.pageAlignHorizontally = true;

            // game.scale.minWidth = 320;
            // game.scale.minHeight = 480;
            // game.scale.maxWidth = 640;
            // game.scale.maxHeight = 960;
            

        } else {
        // MOBILE SETTING
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.minWidth = 320;
            game.scale.minHeight = 480;
            game.scale.maxWidth = 960;
            game.scale.maxHeight = 1440;

        }

        game.scale.setScreenSize(true); 


        game.state.start("PreGame");
    }
};
