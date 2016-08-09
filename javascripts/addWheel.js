function addWheel(obj,fn){
	function fnWheel(ev){
		var oEvent = ev||event;
		var down = false;
		//2判断滚轮方向
		if(oEvent.wheelDelta){
			//下
			if(oEvent.wheelDelta<0){
				down = true;
			}else{
				down = false;
			}
					
		}else{
			//下
			if(oEvent.detail>0){
				down = true;
			}else{
				down = false;
			}
		}
		//3根据方向down干事儿
		fn(down);
		return false;

	}
	//1.滚轮事件兼容
	obj.onmousewheel = fnWheel;//IE chrome
	obj.addEventListener&&obj.addEventListener('DOMMouseScroll',fnWheel,false);//FF
	
}
