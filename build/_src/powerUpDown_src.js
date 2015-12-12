function powerDownParticles(){
    powerDown = game.add.emitter(game.world.centerX, 200, 200);
    powerDown.makeParticles('snowflakes', snowflakeArray);

    //ATTACH EMITTER TO PLAYER
    player.addChild(powerDown);
//------- SETTING PARAMS FOR EMITTER ------- //
    //PLACEMENT RELATIVE TO PLAYER
    powerDown.x = 0;
    powerDown.y = 25;

    //PARTICLE LIFE/SCALE/SPEED/ROTATION/OPACITY DURING LIFE CYCLE
    powerDown.maxParticleScale=1.25;
    powerDown.minParticleScale=0.55;
    powerDown.minParticleSpeed.setTo(-600, -600);
    powerDown.maxParticleSpeed.setTo(400, 400);
    powerDown.minRotation = 20;
    powerDown.maxRotation = 60;
    powerDown.gravity = 0;
    powerDown.setAlpha(1, 0, 500);

    powerDown.start(true, 250, null, 15);
}

function powerUpParticles(){
    powerUp = game.add.emitter(game.world.centerX, 200, 200);
    powerUp.makeParticles('steam', [snowflakeArray]);

    player.addChild(powerUp);

    powerUp.x = 0;
    powerUp.y = 25;

    powerUp.maxParticleScale= 0.55;
    powerUp.minParticleScale=0.25;
    powerUp.minParticleSpeed.setTo(-600, -600);
    powerUp.maxParticleSpeed.setTo(400, 400);
    powerUp.minRotation = 20;
    powerUp.maxRotation = 60;
    powerUp.gravity = 0;
    powerUp.setAlpha(1, 0, 1500);

    powerUp.start(true,250, null, 15);
}

