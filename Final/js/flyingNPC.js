// flyingNPC.js
// NPC object template for phaser, flying enemy
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function flyingNPC(game, x, y, img, frame) {
	//inherit NPC class
	// calling new Sprite
	NPC.call(this, game, x, y, img, frame);

	//this.sight.scale.x = 1;
	this.sight.rotation = -Math.PI/2;
	this.sight.body.setSize(this.sight.height, this.sight.width, this.sight.width-42, 42);
	this.body.gravity = 0;
}

//=========
//PROTOTYPE
//=========
flyingNPC.prototype = Object.create(NPC.prototype);
flyingNPC.prototype.constructor = flyingNPC;

//================
//UPDATE FUNCTION:
//	npc behavior
//================
flyingNPC.prototype.update = function(){

	// debug
	game.debug.body(this);
	//console.log(this.movingHori);

	//COLLISION + OVERLAPS
	game.physics.arcade.collide(this, layer1);
	let hit = 0;
	if(!player.hidden && this.aggro) {
		hit = game.physics.arcade.overlap(this, player, attackPlayer);
	}

	//MOVEMENT
	if(this.movingHori != 0 && !this.isStunned) {
		this.body.velocity.x = this.maxSpeed * this.movingHori;
		if(Math.sign(this.body.velocity.x) != this.facing){
			this.facing *= -1;
			this.scale.x *= -1;
		}
	} else {
		this.body.velocity.x = 0;
	}
	//make the sight follow the facing variable
	this.sight.x = this.x-16;
	this.sight.y = this.y;

	//BEHAVIOR
	if(!this.isStunned){
		stunTimer.pause();
		if(this.sight.playerInSight && !player.hidden) { //aggro - red
			this.tint = 0xFF0000;
			this.aggro = true;
			this.behave.pause();
		} else if(player.hidden && !this.sight.playerInSight){ // wander - blue
			this.tint = 0xFFFFFF;
			this.aggro = false;
			this.behave.resume();
		}
	} else {
		this.tint = 0x00FF00; // stunned - green
		this.stunTimer.resume();
	}

	//AGGRO'd
	if(this.aggro){
		this.idle = false;
		this.isStunned = false;
		this.maxSpeed = 200;
		moveTowardsPlayer(this);
		this.atkTimer.resume();
	} else {
		this.atkTimer.pause();
		this.maxSpeed = 100;
	}
}

//=========
//FUNCTIONS
//=========