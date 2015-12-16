

/* global console, Phaser: true, game*/



var introVideo = function(game) {
    console.log(game);
};

introVideo.prototype = {

    preload: function() {


    },
    create: function() {
        var introVideo = game.add.video('introVideo');

        videoSprite = introVideo.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
        introVideo.play();

        introVideo.onComplete.add(startDemo, this);


        fadeIn();
    }
};

function startDemo(){
	game.state.start('Demo');
}