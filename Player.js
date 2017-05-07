// Player.js
// Player object template for phaser
//		Written by: Philip Stanley

//***
// CONSTRUCTOR
//***
function Player(x, y, scale, img){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	this.scale.x = scale;
	this.scale.y = scale;
	this.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	//personal variables

	maxSpeed = 400;
	jump = -500;
	accel = 50;
}

//EDIT PROTOTYPE
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//***
//CREATE:
//	set up any main vars
//***
Player.prototype.create = function(){
	//cursors = game.input.keyboard.createCursorKeys();
}
//***
//UPDATE FUNCTION:
//	player input and behavior
//***
Player.prototype.update = function(){
	let mv_up = game.input.keyboard.isDown(Phaser.Keyboard.W); //cursors.up.isDown;
	let mv_left = game.input.keyboard.isDown(Phaser.Keyboard.A); //cursors.left.isDown;
	let mv_right = game.input.keyboard.isDown(Phaser.Keyboard.D); //cursors.right.isDown;
	let mv_down = game.input.keyboard.isDown(Phaser.Keyboard.S); //cursors.down.isDown;
	//collide with platforms
	// will this work even tho platforms are in main?
	let hitGround = game.physics.arcade.collide(this, platforms);

	//movement vars
	let vert = mv_down - mv_up;
	let hori = mv_right - mv_left;

	// move the character
	if(vert < 0 && hitGround) this.body.velocity.y += jump;
	else if (vert > 0) this.body.velocity.y += accel;
	if(hori != 0) this.body.velocity.x += accel * hori;
	else this.body.velocity.x -= Math.sign(this.body.velocity.x) * accel / 2;
	if(Math.abs(this.body.velocity.x) < accel) this.body.velocity.x = 0;

	//if(Math.abs(this.body.velocity.y) > maxSpeed) 
	//	this.body.velocity.y = Math.sign(this.body.velocity.y) * maxSpeed;
	if(Math.abs(this.body.velocity.x) > maxSpeed) 
		this.body.velocity.x = Math.sign(this.body.velocity.x) * maxSpeed;
}