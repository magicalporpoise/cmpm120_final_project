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
	//phaser related variables
	//		and physics
	this.ball_aggro = false;
	
	this.scale.x = 0.7;
	this.scale.y = 0.7;
	
	this.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(this);
	//this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	//this.tint = 0x0000FF;

	//personal variables
	this.maxSpeed = 100; 	//speed cap
	this.maxSpeedy = 800;

	this.idle = false;		//stand still?
	this.facing = -1;		//1 for right, -1 for left
	this.movingHori = 0;	//moving left, right, or none
	this.isStunned = false; //stunned?
	this.aggro = false;		//seen player? --> aggro
	this.canAttack = true;	//attack cooldown

	// for jumping
	this.jump = -200;
	this.body.gravity.y = 800;



	//create view box
	this.sight = new ViewBox(this.x, this.y-140, 1, 'sightLine');
	game.add.existing(this.sight);
	group_ViewBox.add(this.sight);
	//console.log("in NPC: "+ group.children);

	//SFX
	this.growlSFX = game.add.audio('growl');
	this.growlSFX.volume = .4;
	this.stunSFX = game.add.audio('NPCHit');
	this.stunSFX.volume = .1;
	this.stunSFXplayed = false;
	this.enemyAttackSFX = game.add.audio('enemy_attack');
	this.enemyAttackSFX.volume = .1;
	this.enemyAttackCounter = 1;


	//behavior timers
	//	patrolling...
	this.behave = game.time.create(false);
	this.behave.loop(Math.random()*2000+2000, normalBehave, this);
	this.behave.start();
	//stunned for how long...
	this.stunTimer = game.time.create(false);
	this.stunTimer.loop(3000, unStun, this);
	this.stunTimer.start();
	//reset attack
	this.atkTimer = game.time.create(false);
	this.atkTimer.loop(3000, resetAttack, this);
	this.atkTimer.start();
	

	this.animations.add('walk');
	this.animations.add('idle', [0], 1, true);

	//insert into game
	game.add.existing(this);
	//add to its group
	group_npc.add(this);

	// for toggle of detection radius
	this.boom;
	this.boom_bool =true;

	this.isDefStunned = false;
	// for detection radius itself
	var boom;

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

	if (Math.abs(this.body.velocity.y)>850) this.body.velocity.y=850;


	//game.debug.body(this);
	let hitGround = game.physics.arcade.collide(this, layer1);

	//COLLISION + OVERLAPS
	//game.physics.arcade.collide(this, layer1);
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
	this.sight.y = this.y-30;

	//BEHAVIOR
	if(!this.isStunned){
		this.sight.visible = true;
		this.stunTimer.pause();

		if(this.sight.playerInSight && !player.hidden) { //aggro - red
			this.aggro = true;
			
			// for creating detection Boom object
			if (this.boom_bool) {
				this.boom = new detectionBoom(this.x, this.y,'boom');
				this.boom_bool = false;
				game.add.existing(this.boom);
				this.growlSFX.play();
			}
			


			this.behave.pause();
		} else if(player.hidden){ // wander - blue
			this.boom_bool = true;
			this.aggro = false;
			this.behave.resume();
		}
	} else {
		if(!this.stunSFXplayed){
			this.stunSFXplayed = true;
			this.stunSFX.play();
		}
		this.sight.visible = false;
		this.stunTimer.resume();
		//console.log(this.stunSFXplayed);
	}

	//AGGRO'd
	if(this.aggro){
		if(this.canAttack) this.tint = 0xCC0000;
		else this.tint = 0x330000;
		this.idle = false;
		this.isStunned = false;
		//messing around with max speed
		this.maxSpeed = Math.abs(player.x - this.x) + 150;
		//this.maxSpeed = 300;
		moveTowardsPlayer(this);
		rotateSights(this, this.sight)
		// this.y>=player.position.y+20 <- for player y check
		// allows npc to jump
		if (hitGround) jump(this); 
		this.atkTimer.resume();

	/*
	} else if (this.ball_aggro) {
		//console.log("npc.ball_aggro = true");
		this.idle = false;
		this.isStunned = false;
		this.maxSpeed = 300;
		moveTowardsBall(this);
	*/
		this.sight.body.setSize(2*this.sight.origWidth-50, 2*this.sight.origWidth-50, 0, -this.sight.origWidth);
	
	} else {
		if(this.isStunned)this.tint = 0x00FF00;
		else this.tint = 0xFFFFFF;
		if(this.sight.rotation != 0) this.sight.scale.x = -this.facing;
		this.sight.rotation = 0;
		this.atkTimer.pause();
		this.maxSpeed = 100;
		this.sight.body.setSize(this.sight.origWidth, this.sight.origHeight-40, 0, 0);
	
	}
}

//=========
//FUNCTIONS
//=========
// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
normalBehave = function determineBehavior(){
	//console.log("called");
		if(this.idle) {
			this.idle = false;
			this.movingHori = 0;
		} else {
			//turn around
			this.movingHori = -1 * this.facing;
			this.idle = true;
		}
	//console.log("normal npc = " + this.movingHori);
}

//undo the stun effect
function unStun(){
	this.stunSFXplayed = false;
	this.isStunned = false;
	this.idle = true;
	//this.sight.visible = true;
	this.stunTimer.pause();
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
	//console.log("player.y " + player.position.y);
	//console.log("npc.y " + self.y);
}

/*
function moveTowardsBall(self){
	//console.log("npc in moveTowardsBall");
	//console.log("projectile.x "+projectile.x);
	let move = projectile.x-self.x;
	if (Math.abs(move)<25) move = 0;
	else move = Math.sign(move);
	self.movingHori = move;
}*/

// npc jumps if player if higher
function jump(self){
	//console.log("in jump");
	self.body.velocity.y = self.jump;
}
 
//hit player, deal damage, deal knockback
function attackPlayer(self, play){
	
	if(self.canAttack) {

		//game.camera.shake(0.001, 200);

		self.enemyAttackSFX.play();
		//game.camera.shake(0.005, 100);


		play.hearts-=5;
		self.canAttack = false;
		//shake
		game.camera.shake(0.02, 200);

		//knockback
		//play.body.velocity.y = -250;
		//play.body.velocity.x = Math.sign(play.x - self.x) * 1000;
	}
	//prevent infinite hits
}

function resetAttack(){
	this.canAttack = true;
}

function resetAttackSFX(){
	this.canPlay = true;
}

function rotateSights(npc, sights){
	if(sights.scale.x == 1){
		sights.rotation = Math.atan2(npc.y-player.y, npc.x-player.x);
	} else sights.rotation = Math.atan2(player.y-npc.y, player.x-npc.x);
	//return sights.rotation;
}