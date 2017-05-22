// NPC.js
// NPC object template for phaser
//		Written by: Philip Stanley

//***
// CONSTRUCTOR
//***
function NPC(game, x, y, img, frame) {
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, frame);

	//pass by reference, the player
	//  now the AI will track?
	//this.player = player;

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	//this.scale.x = scale;
	//this.scale.y = scale;
	this.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	this.tint = 0x0000FF;
	//personal variables
	this.maxSpeed = 100;
	this.idle = false;
	this.facing = 1;
	this.movingHori = 0;
	this.isStunned = false;
	this.aggro = false;
	this.canAttack = true;

	//create view box
	this.sight = new ViewBox(this.x, this.y, 0.45, 'platform');
	game.add.existing(this.sight);
	group_ViewBox.add(this.sight);
	//console.log("in NPC: "+ group.children);

	//behavior timer
	this.behave = game.time.create(false);
	this.behave.loop(Math.random()*2000+2000, determineBehavior, this);
	this.behave.start();
	this.stunTimer = game.time.create(false);
	this.stunTimer.loop(3000, unStun, this);
	this.stunTimer.start();
	//insert into game
	game.add.existing(this);
	group_npc.add(this);
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
	game.physics.arcade.collide(this, layer1);
	let hit = 0;
	if(!player.hidden) {
		hit = game.physics.arcade.overlap(this, player, attackPlayer);
	}

	// move the character
	if(this.movingHori != 0 && !this.isStunned) {
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

	//behavior
	if(!this.isStunned){
		this.stunTimer.pause();
		if(this.sight.playerInSight && !player.hidden) { //aggro - red
			this.tint = 0xFF0000;
			this.aggro = true;
			this.behave.pause();
		} else if((this.aggro && player.hidden) && !this.sight.playerInSight){ // wander - blue
			this.tint = 0x0000FF;
			this.aggro = false;
			this.behave.resume();
		}
	} else {
		this.tint = 0x00FF00; // stunned - green
		this.stunTimer.resume();
	}

	if(this.aggro){
		this.idle = false;
		this.isStunned = false;
		this.maxSpeed = 200;
		moveTowardsPlayer(this);
	} else this.maxSpeed = 100;
}

// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(){
	//console.log("called");
		if(this.idle) {
			this.idle = false;
			this.movingHori = 0;
			this.canAttack = true;
		} else {
			//turn around
			this.movingHori = -1 * this.facing;
			this.idle = true;
		}
}

function unStun(){
	this.isStunned = false;
	this.idle = false;
	this.stunTimer.pause();
}

function moveTowardsPlayer(self){
	// follow and hit player
	//console.log("ATTACK!!")
	self.movingHori = Math.sign(player.x - self.x);
	//console.log(player.x - self.x);
}

function attackPlayer(self, play){
	if(self.canAttack) play.hearts--;
	//knockback
	play.body.velocity.y = -200;
	play.body.velocity.x = self.movingHori * 500;

	//prevent infinite hits
	self.canAttack = false;
}