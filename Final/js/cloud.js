function cloud(x, y, scale_length, img){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);
	//console.log("made view box");

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	this.scale.x = scale_length;
	this.scale.y = scale_length;	
	game.add.existing(this);
	this.imagination = game.add.text(game.world.width/2, game.world.height/2,
				player.hearts, 
				{ fontSize: '64px', fill: '#FFF', stroke: '#000'});
	this.imagination.strokeThickness = 10;
}

//=========
//PROTOTYPE
//=========
cloud.prototype = Object.create(Phaser.Sprite.prototype);
cloud.prototype.constructor = cloud;

//==================
//UPDATE FUNCTION:
//	cloud behavior
//==================
cloud.prototype.update = function(){
	this.x = game.camera.x;
	this.y = game.camera.y;

	this.scale.x = (player.hearts+player.maxHearts/4)/player.maxHearts;
	this.scale.y = (player.hearts+player.maxHearts/4)/player.maxHearts;

	this.imagination.x = game.camera.x + this.width/4;
	this.imagination.y = game.camera.y + this.height/4 -5;

	this.imagination.text = player.hearts;
	this.imagination.scale.x = (player.hearts+player.maxHearts/4)/player.maxHearts;
	this.imagination.scale.y = (player.hearts+player.maxHearts/4)/player.maxHearts;
}
