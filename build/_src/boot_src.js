/* global console, Phaser: true, game*/

var boot = function(game) {
    console.log(game);
};

boot.prototype = {
    preload: function() {
    	game.load.image("startButtonMobile", "images/startButtonMobile.png");
    	game.load.image("loadMask","images/loadMask.jpg");

      	game.load.image("loading","images/loading.png");
      	game.load.image("loadingBg", "images/loadingBg.png");
      	game.load.image("loadSteam", "images/loadSteam.png");
        game.load.image('rotate', 'images/rotate.png');
        game.load.image('playBtn', 'images/playBtn.png');
      
    },
    create: function() {

    	//PAUSE GAME IF IN LANDSCAPE
        window.addEventListener("orientationchange", function(){
        
        if(window.orientation !== 0){
            game.paused = true;
            document.getElementById("orientation").style.display = "block";
        } else if (window.orientation === 0) {
            console.log("KILLLLL")
            document.getElementById("orientation").style.display = "none";
            
            game.paused = false;                 

            } else {
                
            }
        }, false);


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
            game.scale.pageAlignHorizontally = true;
            game.scale.minWidth = 320;
            game.scale.minHeight = 480;
            game.scale.maxWidth = 980;
            game.scale.maxHeight = 1470;

        }

        // game.scale.setScreenSize(true);
        game.state.start("Preloader");
    }
};
