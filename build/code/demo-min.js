function nextState(){shopLoop.loop=!1,shopLoop.fadeOut(),shopLoop.onStop.add(startGame)}function fadeTunesIn(){shopLoop.fadeIn(5e3,!0)}function startGame(){game.state.start("PlayGame")}var demo=function(a){console.log(a)};demo.prototype={preload:function(){game.load.image("nextButton","images/demoPage/nextButton.png"),game.load.image("img_01","images/demoPage/grabThese.png"),game.load.image("img_02","images/demoPage/grabThese_cups.png"),game.load.image("img_03","images/demoPage/avoidThese.png"),game.load.image("img_04","images/demoPage/avoidThese_cups.png"),game.load.image("img_05","images/demoPage/withThis.png"),game.load.image("img_06","images/demoPage/mitten.png"),game.load.image("img_swipe","images/demoPage/swipe.png"),game.load.image("img_07","images/demoPage/thermoWarmText.png"),game.load.image("img_08","images/demoPage/thermoWarm.png"),game.load.image("img_09","images/demoPage/thermoColdText.png"),game.load.image("img_10","images/demoPage/thermoCold.png")},create:function(){function a(){x.start()}demoPlaceholder=game.add.button(game.world.centerX,game.world.centerY,"demoPlaceholder"),demoPlaceholder.anchor.set(.5,.5);var e=game.add.button(530,910,"nextButton",a),o=game.add.sprite(225,350,"img_01"),d=game.add.sprite(425,350,"img_02"),g=game.add.sprite(420,540,"img_03"),m=game.add.sprite(220,540,"img_04"),t=game.add.sprite(185,690,"img_05"),i=game.add.sprite(360,830,"img_06"),n=game.add.sprite(180,780,"img_swipe"),p=game.add.sprite(380,240,"img_07"),h=game.add.sprite(190,270,"img_08"),s=game.add.sprite(320,540,"img_09"),l=game.add.sprite(460,460,"img_10"),r=game.add.group();r.add(o),r.add(d),r.add(g),r.add(m),r.add(t),r.add(i),r.add(n),o.anchor.setTo(.5,.5),d.anchor.setTo(.5,.5),g.anchor.setTo(.5,.5),m.anchor.setTo(.5,.5),t.anchor.setTo(.5,.5),i.anchor.setTo(.5,.5),n.anchor.setTo(.5,.5),e.anchor.set(.5,.5),p.anchor.setTo(.5,.5),h.anchor.setTo(.5,.5),s.anchor.setTo(.5,.5),l.anchor.setTo(.5,.5),o.alpha=0,d.alpha=0,g.alpha=0,m.alpha=0,t.alpha=0,i.alpha=0,n.alpha=0,e.alpha=0,p.alpha=0,h.alpha=0,s.alpha=0,l.alpha=0;var c=game.add.tween(o).to({alpha:1},600,"Quart.easeOut",!0,1500),_=game.add.tween(d).to({alpha:1},600),u=game.add.tween(g).to({alpha:1},600),T=game.add.tween(m).to({alpha:1},600),w=game.add.tween(t).to({alpha:1},600),P=game.add.tween(i).to({alpha:1},600),f=game.add.tween(n).to({alpha:1},600),L=game.add.tween(e).to({alpha:1},800),x=game.add.tween(r).to({alpha:0},600),v=game.add.tween(p).to({alpha:1},600),b=game.add.tween(h).to({alpha:1},600),I=game.add.tween(s).to({alpha:1},600),B=game.add.tween(l).to({alpha:1},600);c.chain(_),_.chain(u),u.chain(T),T.chain(w),w.chain(P),P.chain(f),f.chain(L),x.chain(v),v.chain(b),b.chain(I),I.chain(B),c.start(),shopLoop=game.add.audio("shopLoop"),shopLoop.loop=!0,shopLoop.onDecoded.add(fadeTunesIn,this),fadeIn()}};