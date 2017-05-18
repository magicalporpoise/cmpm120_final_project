// HidingSpot.js
// HidingSpot object template for phaser
// allows player to hide behind it.
//		Written by: Philip Stanley

//***
// CONSTRUCTOR
//***
function HidingSpot(x, y, scale_length, img){
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
	this.tint = 0x000000;
	game.physics.arcade.enable(this);
	game.add.existing(this);

}

//EDIT PROTOTYPE
HidingSpot.prototype = Object.create(Phaser.Sprite.prototype);
HidingSpot.prototype.constructor = HidingSpot;

//***
//UPDATE FUNCTION:
//	HidingSpot behavior
//***
HidingSpot.prototype.update = function(){
	let hidden = game.physics.arcade.overlap(this, player);
	// change the player's hiding variable
	toggleHiding(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR), hidden);
}

function toggleHiding(pressSpace, overlapping){
	if(pressSpace && overlapping){
		player.hidden = !player.hidden;
	}
}