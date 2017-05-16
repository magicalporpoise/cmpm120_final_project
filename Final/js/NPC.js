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
	this.maxSpeed = 100;
	this.idle = false;
	this.facing = 1;
	this.movingHori = 0;

	//create view box
	this.sight = new ViewBox(this.x, this.y, 0.33, 'platform');
	game.add.existing(this.sight);

	//behavior timer
	this.behave = game.time.create(false);
	this.behave.loop(3000, determineBehavior, this);
	this.behave.start();
	//insert into game
	game.add.existing(this);
}

//EDIT PROTOTYPE
NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

//***
//CREATE:
//	set up any main vars
//***
NPC.prototype.create = function(){
	//timer for behavior
	console.log("NPC MADE");
}

//***
//UPDATE FUNCTION:
//	npc behavior
//***
NPC.prototype.update = function(){
	let hitGround = game.physics.arcade.collide(this, layer1);

	// move the character
	if(this.movingHori != 0) {
		this.body.velocity.x = this.maxSpeed * this.movingHori;
		if(Math.sign(this.body.velocity.x) != this.facing){
			this.facing *= -1;
			this.scale.x *= -1;
			this.sight.scale.x *= -1;
		}
	} else this.body.velocity.x = 0;
	//make the sight follow the facing variable
	this.sight.x = this.x;
	this.sight.y = this.y-32;

	if(this.sight.playerInSight && !player.hidden) this.tint = 0xFF0000;
	else this.tint = 0x0000FF;
}

// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(){
	//console.log("called");
	if(this.idle) {
		this.idle = false;
		this.movingHori = 0;
	} else {
		//turn around
		this.movingHori = -1 * this.facing;

		this.idle = true;
	}
	//console.log(this.movingHori);
}