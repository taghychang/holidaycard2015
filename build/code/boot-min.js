var boot=function(a){console.log(a)};boot.prototype={preload:function(){game.load.image("startButtonMobile","images/startButtonMobile.png"),game.load.image("loadMask","images/loadMask.jpg"),game.load.image("loading","images/loading.png"),game.load.image("loadingBg","images/loadingBg.png"),game.load.image("loadSteam","images/loadSteam.png"),game.load.image("rotate","images/rotate.png"),game.load.image("playBtn","images/playBtn.png")},create:function(){window.addEventListener("orientationchange",function(){0!==window.orientation?(game.paused=!0,document.getElementById("orientation").style.display="block"):0===window.orientation&&(console.log("KILLLLL"),document.getElementById("orientation").style.display="none",game.paused=!1)},!1),game.device.desktop||(game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,game.scale.pageAlignHorizontally=!0,game.scale.minWidth=320,game.scale.minHeight=480,game.scale.maxWidth=980,game.scale.maxHeight=1470),game.state.start("Preloader")}};