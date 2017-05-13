// ViewBox.js
// ViewBox object template for phaser
// allows npcs to 'see' the player.
//		Written by: Philip Stanley

//***
// CONSTRUCTOR
//***
function ViewBox(x, y, scale_length, img){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);
	//console.log("made view box");

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	this.scale.x = scale_length;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);
	
	// Booleans for sight
	this.playerInSight = false;
}

//EDIT PROTOTYPE
ViewBox.prototype = Object.create(Phaser.Sprite.prototype);
ViewBox.prototype.constructor = ViewBox;

//***
//UPDATE FUNCTION:
//	viewbox behavior
//***
ViewBox.prototype.update = function(){
	let inSights = game.physics.arcade.overlap(this, player);
	// move the character
	if(inSights) {this.playerInSight = true;}
	else this.playerInSight = false;
}