function through(obj){
	function a2d(n){
		return 	n*180/Math.PI;
	}
	//判断鼠标从哪个边移入
	function hoverDir(obj,ev){
		var x = obj.offsetLeft+obj.offsetWidth/2 - ev.clientX;
		var y = obj.offsetTop+obj.offsetHeight/2 - ev.clientY;
		return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
	}
	obj.onmouseover = function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				oS.style.left = '296px';
				oS.style.top = 0;
			break;
			case 1:
				oS.style.top = '204px';
				oS.style.left = 0;
			break;
			case 2:
				oS.style.left = '-296px';
				oS.style.top = 0;
			break;
			case 3:
				oS.style.top = '-204px';
				oS.style.left = 0;
			break;
		}
		move(oS,{left:0,top:0});
	};
	
	obj.onmouseout = function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				move(oS,{left:296,top:0});
			break;
			case 1:
				move(oS,{left:0,top:204});
			break;
			case 2:
				move(oS,{left:-296,top:0});
			break;
			case 3:
				move(oS,{left:0,top:-204});
			break;
		}
	};
}