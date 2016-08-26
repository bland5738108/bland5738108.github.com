window.onload=function(){
	var oC = document.getElementById('c1');
	var gd = oC.getContext('2d');
	loadImage(
		resources,
		function(result){
			var bottom = new Sprite(result.bottom);
			var cannon = new Cannon(result,1);
			var aBullet = [];
			var aFish = [];
			var aDieFish = [];
			
			bottom.width = 765;
			bottom.height = 71;
			bottom.x = oC.width/2;
			bottom.y = oC.height-bottom.height/2;
			
			cannon.x = bottom.x+cannon.width/2+6;
			cannon.y = bottom.y;
			
			oC.onmousemove = function(ev){
				var x = ev.pageX-oC.offsetLeft;
				var y = ev.pageY-oC.offsetTop;
				var a = x-cannon.x;
				var b = y-cannon.y;
				
				cannon.r = a2d(Math.atan2(b,a))+90;
			};
			
			oC.onclick=function(){
				var oA = new Audio();
				oA.src = 'mp3/gunShot.mp3';
				oA.play();
				var bullet = new Bullet(result.bullet,cannon.type);
				bullet.x = cannon.x;
				bullet.y = cannon.y;
				bullet.r = cannon.r;
				aBullet.push(bullet);
			};
			
			setInterval(function(){
				var fish = new Fish(result,rnd(1,6));
				fish.x = -50;
				fish.y = rnd(0,oC.height);
				fish.r = rnd(45,135);
				aFish.push(fish);
			},500);
			
			
			setInterval(function(){
				gd.clearRect(0,0,oC.width,oC.height);
				bottom.draw(gd);
				
				//画炮弹，移动
				for(var i=0;i<aBullet.length;i++){
					aBullet[i].draw(gd);
					aBullet[i].move();
				}
				
				//画鱼，移动
				for(var i=0;i<aFish.length;i++){
					aFish[i].draw(gd);
					aFish[i].move();
				}
				
				//画死鱼
				for(var i=0;i<aDieFish.length;i++){
					aDieFish[i].draw(gd);
				}
				
				
				//鱼和炮弹碰撞检测
				for(var i=0;i<aBullet.length;i++){
					for(var j=0;j<aFish.length;j++){
						if(aBullet[i].collTest(aFish[j])){
							aBullet.splice(i,1);
							i--;
							
							var dieFish = new DieFish(result,aFish[j].type);
							
							dieFish.x = aFish[j].x;
							dieFish.y = aFish[j].y;
							dieFish.r = aFish[j].r;
							
							aDieFish.push(dieFish);
							
							aFish.splice(j,1);
							j--;
						}
					}
				}
				
				//清除死鱼
				for(var i=0;i<aDieFish.length;i++){
					if(aDieFish[i].die==1){
						aDieFish.splice(i,1);
						i--;
					}
				}
				
				//清除消失的炮弹
				for(var i=0;i<aBullet.length;i++){
					if(aBullet[i].x<-100||aBullet[i].y<-100||aBullet[i].x>oC.width+100||aBullet[i].y>oC.height+100){
						aBullet.splice(i,1);
						i--;
					}
				}
				//清除消失的鱼
				for(var i=0;i<aFish.length;i++){
					if(aFish[i].x<-100||aFish[i].y<-100||aFish[i].x>oC.width+100||aFish[i].y>oC.height+100){
						aFish.splice(i,1);
						i--;
					}
				}
				
				
				cannon.draw(gd);
			},30);
			
			setInterval(function(){
				//游
				for(var i=0;i<aFish.length;i++){
					aFish[i].swim();
				}
				//挣扎
				for(var i=0;i<aDieFish.length;i++){
					aDieFish[i].stru();
				}
			},120);
		}
	);
};
