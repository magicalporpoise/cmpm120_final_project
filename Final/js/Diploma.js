// Diploma.js
// Diploma object template for phaser
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function Diploma(game, x, y, img, frame){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, frame);
	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	game.physics.arcade.enable(this);
	//insert into game
	game.add.existing(this);
	//add to Diploma group
	group_Diploma.add(this);
}

//=========
//PROTOTYPE
//=========
Diploma.prototype = Object.create(Phaser.Sprite.prototype);
Diploma.prototype.constructor = Diploma;

//=====================
//UPDATE FUNCTION:
//	Diploma behavior
//=====================
Diploma.prototype.update = function(){
	let graduate = game.physics.arcade.overlap(this, player);
	// change the player's hiding variable
	if(graduate){
		currentLevel++;
		game.state.start('Game', true);
	}
}