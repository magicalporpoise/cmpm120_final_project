function killableSubstance(x, y, scale_length, img){
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
killableSubstance.prototype = Object.create(Phaser.Sprite.prototype);
killableSubstance.prototype.constructor = killableSubstance;

//==================
//UPDATE FUNCTION:
//	killableSubstance behavior
//==================
killableSubstance.prototype.update = function(){
	let playerHit = game.physics.arcade.overlap(this, player, killPlayer);
}

function killPlayer() {
	// kill player
	console.log("killable substance is killing player");
	player.isDead = true;


}