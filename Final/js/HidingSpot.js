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
	this.time = 0;
	//this.tint = 0x000000;
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

	//game.debug.body(this);

	let hidden = game.physics.arcade.overlap(this, player, loseImagination);
	// change the player's hiding variable
	toggleHiding(this, (game.input.keyboard.justPressed(Phaser.Keyboard.S)), hidden);
}

//=========
//FUNCTIONS
//=========
//toggle hiding
function toggleHiding(me, input, overlapping){
	if(input == false && player.hidden){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.W)) input = true;
	}

	if(input && overlapping){
		player.hidden = !player.hidden;
		if(player.hidden) {
			player.body.velocity.x = 0;
			player.x = me.x + 50;
			player.y = me.y+20;
			player.isInvis = false;
		}
	}
}

function loseImagination(me, player){
	if(player.hidden){
		me.time++;
		if(me.time % 120 == 0){
			me.time = 0;
			player.hearts--;
		}
	}
}