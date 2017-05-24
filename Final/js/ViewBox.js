// ViewBox.js
// ViewBox object template for phaser
// allows npcs to 'see' the player.
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
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

	this.anchor.x+=1;
	this.anchor.y+=0.5;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);
	
	// Booleans for sight
	this.playerInSight = false;
}

//=========
//PROTOTYPE
//=========
ViewBox.prototype = Object.create(Phaser.Sprite.prototype);
ViewBox.prototype.constructor = ViewBox;

//==================
//UPDATE FUNCTION:
//	viewbox behavior
//==================
ViewBox.prototype.update = function(){
	let inSights = game.physics.arcade.overlap(this, player);
	//check if player is in sights
	if(inSights) {this.playerInSight = true;}
	else this.playerInSight = false;

	// debug
	//game.debug.body(this);
}