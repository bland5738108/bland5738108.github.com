var FISH_SIZE = [
	null,
	{width:37,height:55},
	{width:64,height:78},
	{width:56,height:72},
	{width:59,height:77},
	{width:122,height:107}
];
function Fish(images,type){
	Sprite.call(this,images['fish'+type]);
	this.width = FISH_SIZE[type].width;
	this.height = FISH_SIZE[type].height;
	this.iSpeed = 3;
	this.type = type;
}
Fish.prototype = new Sprite();
Fish.prototype.constructor = Fish;
Fish.prototype.swim = function(){
	this.sx+=this.width;
	if(this.sx>=this.width*4){
		this.sx = 0;
	}
};












