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


	game.physics.arcade.enable(this);
	
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

}
