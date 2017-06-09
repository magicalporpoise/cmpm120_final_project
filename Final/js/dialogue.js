function speaker(x, y, scale_length, img){
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
speaker.prototype = Object.create(Phaser.Sprite.prototype);
speaker.prototype.constructor = speaker;

//==================
//UPDATE FUNCTION:
//	speaker behavior
//==================
speaker.prototype.update = function(){
	let playerHit = game.physics.arcade.overlap(this, player, tellPlayer);
}

function tellPlayer() {
	// kill player
	console.log("speaker is telling player");
	// player.isDead = true;


}