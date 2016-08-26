function DieFish(result,type){
	Sprite.call(this,result['fish'+type]);
	this.width = FISH_SIZE[type].width;
	this.height = FISH_SIZE[type].height;
	this.sx = 4*this.width;
	this.die = 0;
}
DieFish.prototype = new Sprite();
DieFish.prototype.constructor = DieFish;
DieFish.prototype.stru = function(){
	this.sx+=this.width;
	if(this.sx>=this.width*8){
		this.sx = this.width*4;
		this.die = 1;
	}
};