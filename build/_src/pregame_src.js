/* global console, game, startDemo, toNextState, fadeIn */

var preGame = function(game) {
    console.log(game);
};

// Added variable 
var startButtonMobile, playBtn;

preGame.prototype = {

    preload: function() { },
    
    create: function() {

        // Create button //
        startButtonMobile = game.add.button(game.world.centerX, game.world.centerY, "startButtonMobile");

        if (game.device.desktop) {
             startButtonMobile.variable = "Demo";
        } else {
            
            // Add source to video tag & display 
            var video_fallback = document.getElementById("video_fallback");
            var video_source = document.createElement("source");
            video_source.setAttribute("src", "video/intro.mp4");
            video_fallback.appendChild(video_source);
            video_fallback.style.display = "block";

            // Hide canvas as it is created on the top most layer
            var game_canvas = document.getElementsByTagName("canvas")[0];
            game_canvas.style.display = "none";
            
            // When video ends force exit fullscreen, hide video player and bring back canvas
            video_fallback.addEventListener("ended", function(){
                video_fallback.webkitExitFullscreen();
                video_fallback.style.display = "none";
                game_canvas.style.display = "block";
                
                // Start Demo
                startDemo(this);
            });
        }
    
        // startButtonMobile.variable = "IntroVideo"; // next state
        startButtonMobile.inputEnabled = true;
        startButtonMobile.events.onInputDown.add(toNextState, this);
        startButtonMobile.anchor.set(0.5, 0.5);

             // Title
        playBtn = game.add.image(223, 810, "playBtn");


        playBtn.alpha = 0;
        game.add.tween(playBtn).to( { alpha: 1 }, 4000, "Linear", true, 0, 0);


        fadeIn();
    }
};

