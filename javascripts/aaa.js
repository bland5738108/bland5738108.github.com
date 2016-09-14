
		
		var oSlide = document.getElementById('slide');
		var oUl = document.getElementById('slide_pic');
		var aLi = oUl.getElementsByTagName('li')//oUl.children;
		var div = document.getElementById('css3')//oUl.children;
		aLi[0].style.width = 600 + 'px'
		oUl.style.width = div.offsetWidth//*aLi.length+'px';
		var iw = aLi[0].offsetWidth
		
		var aSpan = oSlide.children[1].getElementsByTagName('span');
			var iNow = 0;
			function next(){
				move(aSpan[iNow],{width:80},{complete:function(){
					iNow++;
					if(iNow == aSpan.length){
						iNow = 0;
					}
					move(oUl,{left:-iNow*aLi[0].offsetWidth},{complete:function(){
						for(var i = 0;i<aSpan.length;i++){
							aSpan[i].style.width = 0 ;
						}
						next();
					}});
				}});
			}
			//next();
			
	
