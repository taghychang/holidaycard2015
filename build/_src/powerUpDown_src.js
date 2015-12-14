function powerDownParticles(){
    // powerDown = game.add.emitter(game.world.centerX, 200, 200);
    // powerDown.makeParticles('snowflakes', snowflakeArray);


    //ATTACH EMITTER TO PLAYER
//    player.addChildAt(powerDown, 0);


//------- SETTING PARAMS FOR EMITTER ------- //
    //PLACEMENT RELATIVE TO PLAYER
    powerDown.x = player.x+40;
    powerDown.y = player.y-130;


    //PARTICLE LIFE/SCALE/SPEED/ROTATION/OPACITY DURING LIFE CYCLE
    powerDown.maxParticleScale=0.5;
    powerDown.minParticleScale=0.15;
    powerDown.minParticleSpeed.setTo(-600, -600);
    powerDown.maxParticleSpeed.setTo(400, 400);
    powerDown.minRotation = 20;
    powerDown.maxRotation = 60;
    powerDown.gravity = 0;
    powerDown.setAlpha(1, 0, 500);

    powerDown.start(true, 100, null, 15);
    layerSort();
}

function powerUpParticles(){
    // powerUp = game.add.emitter(game.world.centerX, 200, 200);
    // powerUp.makeParticles('steam', [snowflakeArray]);

    //player.addChild(powerUp);

    powerUp.x = player.x+30;
    powerUp.y = player.y-120;

    powerUp.maxParticleScale= 0.1;
    powerUp.minParticleScale=0.05;
    powerUp.minParticleSpeed.setTo(-600, -600);
    powerUp.maxParticleSpeed.setTo(400, 400);
    powerUp.minRotation = 20;
    powerUp.maxRotation = 60;
    powerUp.gravity = 0;
    powerUp.setAlpha(1, 0, 1200);
    powerUp.start(true, 100, null, 15);
    layerSort();
}

