// HidingSpot.js
// HidingSpot object template for phaser
// allows player to hide behind it.
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function HidingSpot(game, x, y, img, frame){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, frame);
	//console.log("made view box");

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	this.scale.x = .5;
	this.scale.y = .5;
	this.tint = 0x000000;
	game.physics.arcade.enable(this);

	//insert into game
	game.add.existing(this);

	//add to hidingspot group
	group_hidingspot.add(this);
}

//=========
//PROTOTYPE
//=========
HidingSpot.prototype = Object.create(Phaser.Sprite.prototype);
HidingSpot.prototype.constructor = HidingSpot;

//=====================
//UPDATE FUNCTION:
//	HidingSpot behavior
//=====================
HidingSpot.prototype.update = function(){

	game.debug.body(this);
	
	let hidden = game.physics.arcade.overlap(this, player);
	// change the player's hiding variable
	toggleHiding(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR), hidden);
}

//=========
//FUNCTIONS
//=========
//toggle hiding
function toggleHiding(pressSpace, overlapping){
	if(pressSpace && overlapping){
		player.hidden = !player.hidden;
	}
}