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

	this.tint = 0x00FF00;
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
	//let mv_up = determineBehavior(); //cursors.up.isDown;
	//let mv_left = determineBehavior(walking); //cursors.left.isDown;
	//let mv_right = determineBehavior(walking); //cursors.right.isDown;
	//let mv_down = determineBehavior(); //cursors.down.isDown;
	//collide with platforms
	//	 will this work even tho platforms are in main?
	let hitGround = game.physics.arcade.collide(this, platforms);

	//movement vars
	let vert = 0;
	let hori = 0;
	if(Math.random() < 0.1) idle = false;
	else idle = true;
	if(!idle) hori = determineBehavior();

	// move the character
	if(hori != 0) this.body.velocity.x = this.maxSpeed * hori;


}

// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(){
	if(Math.random() < 0.5) return 1
	else return -1;
}

// NPC on fire!!
function burning(){
	console.log("I'M ON FIRE");
}