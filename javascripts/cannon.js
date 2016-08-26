var CANNONE_SIZE = [
	null,
	{width:74,height:74},
	{width:74,height:76},
	{width:74,height:76},
	{width:74,height:83},
	{width:74,height:85},
	{width:74,height:90},
	{width:74,height:94}
];
function Cannon(images,type){
	Sprite.call(this,images['cannon'+type]);
	this.width = CANNONE_SIZE[type].width;
	this.height= CANNONE_SIZE[type].height;
	this.type = type;
}
Cannon.prototype = new Sprite();
Cannon.prototype.constructor = Cannon;