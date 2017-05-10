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
	this.body.gravity.y = 1000;
	this.body.collideWorldBounds = true;
	//personal variables

	this.maxSpeed = 400;
	this.jump = -500;
	this.accel = 50;

	this.facing = 1; //1 for right, -1 for left

	this.emitter = game.add.emitter(this.x, this.y, 1000);
	this.emitter.makeParticles('flame');
	this.emitter.maxRotation = 0;
	this.emitter.minRotation = 0;
	this.emitter.gravity.y = -100;
	this.emitter.minParticleScale = 0.5;
	this.emitter.maxParticleScale = 1.5;
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
	let k_ability = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR); 
	//collide with platforms
	// will this work even tho platforms are in main?
	let hitGround = game.physics.arcade.collide(this, platforms);

	//movement vars
	let vert = mv_down - mv_up;
	let hori = mv_right - mv_left;

	// move the character
	//jump
	if(vert < 0 && hitGround) this.body.velocity.y += this.jump;
	//fall
	else if (vert > 0) this.body.velocity.y += accel;
	//move left and right + accelerate
	if(hori != 0) {
		this.body.velocity.x += this.accel * hori;
		if(Math.sign(this.body.velocity.x) != this.facing){
			this.facing *= -1;
			this.scale.x *= -1;
		}
	}
	//deccelerate
	else this.body.velocity.x -= Math.sign(this.body.velocity.x) * this.accel / 2;
	//stopping
	if(Math.abs(this.body.velocity.x) < this.accel) this.body.velocity.x = 0;
	//reaching max speed
	if(Math.abs(this.body.velocity.x) > this.maxSpeed) 
		this.body.velocity.x = Math.sign(this.body.velocity.x) * this.maxSpeed;

	this.emitter.x = this.x + (this.width);
	this.emitter.y = this.y;
	if(k_ability) {
		this.emitter.on = true;
		this.emitter.gravity.x = this.facing * 1000 + this.body.velocity.x;
		this.emitter.start(true, 1000, 50);
	}
	else {this.emitter.on = false;}
}