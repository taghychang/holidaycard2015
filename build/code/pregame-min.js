var preGame=function(t){console.log(t)},startButtonMobile,playBtn;preGame.prototype={preload:function(){},create:function(){if(startButtonMobile=game.add.button(game.world.centerX,game.world.centerY,"startButtonMobile"),game.device.desktop)startButtonMobile.variable="IntroVideo";else{var t=document.getElementById("video_button"),e=document.getElementById("video_fallback"),n=document.createElement("source");n.setAttribute("src","video/intro.mp4"),e.appendChild(n),t.style.display="block",t.addEventListener("click",function(){e.style.display="block",e.play()});var a=document.getElementsByTagName("canvas")[0];a.style.display="none",e.addEventListener("ended",function(){e.webkitExitFullscreen(),e.style.display="none",a.style.display="block",startDemo(this)})}startButtonMobile.inputEnabled=!0,startButtonMobile.events.onInputDown.add(toNextState,this),startButtonMobile.anchor.set(.5,.5),playBtn=game.add.image(223,810,"playBtn"),playBtn.alpha=0,game.add.tween(playBtn).to({alpha:1},4e3,"Linear",!0,0,0),fadeIn()}};