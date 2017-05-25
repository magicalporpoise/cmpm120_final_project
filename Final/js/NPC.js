// NPC.js
// NPC object template for phaser
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function NPC(game, x, y, img, frame) {
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, frame);

	// hitbox
	//this.body.setSize(x-100, y-50, 00, 0);


	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	
	this.scale.x = 0.7;
	this.scale.y = 0.7;
	
	this.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	//this.tint = 0x0000FF;

	//personal variables
	this.maxSpeed = 100; 	//speed cap
	this.idle = false;		//stand still?
	this.facing = -1;		//1 for right, -1 for left
	this.movingHori = 0;	//moving left, right, or none
	this.isStunned = false; //stunned?
	this.aggro = false;		//seen player? --> aggro
	this.canAttack = true;	//attack cooldown

	//create view box
	this.sight = new ViewBox(this.x, this.y, 1, 'sightLine');
	game.add.existing(this.sight);
	group_ViewBox.add(this.sight);
	//console.log("in NPC: "+ group.children);

	//behavior timers
	//	patrolling...
	this.bh = behave.loop(Math.random()*2000+2000, determineBehavior, this);
	//stunned for how long...
	this.st = stunTimer.loop(3000, unStun, this);
	//reset attack
	this.at = atkTimer.loop(3000, resetAttack, this);

	var anim = this.animations.add('walk');
	this.animations.add('idle', [0], 1, true);

	//insert into game
	game.add.existing(this);
	//add to its group
	group_npc.add(this);
}

//=========
//PROTOTYPE
//=========
NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

//================
//UPDATE FUNCTION:
//	npc behavior
//================
NPC.prototype.update = function(){

	// debug
	game.debug.body(this);


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
			this.sight.scale.x *= -1;
			this.animations.play('walk', 105, true);
		}
	} else {
		this.body.velocity.x = 0;
		this.animations.play('idle', 0, false);
	}
	//make the sight follow the facing variable
	this.sight.x = this.x;
	this.sight.y = this.y-32;

	//BEHAVIOR
	if(!this.isStunned){
		removeFromQ(stunTimer, this.st);
		if(this.sight.playerInSight && !player.hidden) { //aggro - red
			this.tint = 0xFF0000;
			this.aggro = true;
			removeFromQ(behave, this.bh);
		} else if(player.hidden && !this.sight.playerInSight){ // wander - blue
			this.tint = 0xFFFFFF;
			this.aggro = false;
			addBackIntoBehave(this.bh);
		}
	} else {
		this.tint = 0x00FF00; // stunned - green
		//
		//resume stun
		//
	}

	//AGGRO'd
	if(this.aggro){
		this.idle = false;
		this.isStunned = false;
		this.maxSpeed = 200;
		moveTowardsPlayer(this);
		//
		//attack timer start
		//
	} else {
		removeFromQ(atkTimer, this.at);
		this.maxSpeed = 100;
	}
}

//=========
//FUNCTIONS
//=========
// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(){
	console.log("called from normie npc");
		if(this.idle) {
			this.idle = false;
			this.movingHori = 0;
		} else {
			//turn around
			this.movingHori = -1 * this.facing;
			this.idle = true;
		}
}

//undo the stun effect
function unStun(){
	this.isStunned = false;
	this.idle = false;
	//
	//pause the timer event
	//
}

//follow player
function moveTowardsPlayer(self){
	// follow and hit player
	//console.log("ATTACK!!")
	let move = (player.x - self.x);
	if(Math.abs(move) < 25){
		move = 0;
	} else move = Math.sign(move);

	self.movingHori = move
	//console.log(player.x - self.x);
}
 
//hit player, deal damage, deal knockback
function attackPlayer(self, play){
	if(self.canAttack) {
		play.hearts--;
		self.canAttack = false;
	}
	//knockback
	play.body.velocity.y = -200;
	play.body.velocity.x = self.movingHori * 500;
	//prevent infinite hits
}

function resetAttack(){
	this.canAttack = true;
}

//timer functions
function removeFromQ(myTimer, myEvent){
	//loop thru the events
	for(let i = 0; i < myTimer.events.length; i++){
		if(myTimer[i] === myEvent) {
			game.time.events.remove(myTimer[i]);
			break;
		}
	}
	myEvent = 0;
}

function addBackIntoBehave(myEvent){
	if(myEvent == 0){
		myEvent = behave.loop(Math.random()*2000+2000, determineBehavior, this);
	}
}