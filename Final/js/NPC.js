// NPC.js
// NPC object template for phaser
//		Written by: Philip Stanley

//***
// CONSTRUCTOR
//***
function NPC(x, y, scale, img){
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
	this.maxSpeed = 50;
	this.idle = true;
	this.facing = 1;

	//create view box
	this.sight = new ViewBox(this.x, this.y, 0.25, 'platform')
	game.add.existing(this.sight);

	//timer for behavior
}

//EDIT PROTOTYPE
NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

//***
//CREATE:
//	set up any main vars
//***
NPC.prototype.create = function(){
	//cursors = game.input.keyboard.createCursorKeys();
}

//***
//UPDATE FUNCTION:
//	npc behavior
//***
NPC.prototype.update = function(){
	let hitGround = game.physics.arcade.collide(this, platforms);

	//movement vars
	let vert = 0;
	let hori = 0;
	if(Math.random() < 0.1) idle = false;
	else idle = true;
	if(!idle) hori = determineBehavior();

	// move the character
	if(hori != 0) {
		this.body.velocity.x = this.maxSpeed * hori;
		if(Math.sign(this.body.velocity.x) != this.facing){
			this.facing *= -1;
			this.scale.x *= -1;
			this.sight.scale.x *= -1;
		}
	}
	//make the sight follow the facing variable
	this.sight.x = this.x;
	this.sight.y = this.y-32;

	if(this.sight.playerInSight) this.tint = 0xFF0000;
	else this.tint = 0x0000FF;
}

// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(currentSpeed){
	if(Math.random() < 0.5) return 1
	else return -1;
}