var BULLET_SIZE = [
	null,
	{width:24,height:26,x:86,y:0},
	{width:25,height:29,x:61,y:0},
	{width:27,height:31,x:32,y:35},
	{width:29,height:33,x:30,y:82},
	{width:30,height:34,x:0,y:82},
	{width:31,height:35,x:30,y:0},
	{width:32,height:38,x:0,y:44}
];
function Bullet(image,type){
	Sprite.call(this,image);
	this.sx = BULLET_SIZE[type].x;
	this.sy = BULLET_SIZE[type].y;
	this.width = BULLET_SIZE[type].width;
	this.height = BULLET_SIZE[type].height;
	this.iSpeed = 6;
	this.type = type;
}
Bullet.prototype = new Sprite();
Bullet.prototype.constructor = Bullet;










