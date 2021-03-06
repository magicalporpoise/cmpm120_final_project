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
	this.behave = 0;
	this.behaveCont = true;
	//	stunned...
	this.stunTimer = 0;
	this.stunTimerCont = false;
	//	reset attack
	this.atkTimer = 0;
	this.atkTimerCont = true;
	//	duration
	this.longDura = Math.round(Math.random()*(60)) + 60*3;
	this.shortDura = 60*3;
	
	//add animations
	this.animations.add('walk');
	this.animations.add('idle', [0], 1, true);

	this.teacherism = new ScrollText(game, x, y, "", {align: 'center', font: 'Source Code Pro', fontSize: '22px', fill: '#FFF'});
	this.teacherism.speed = 0.7;
	this.teacherism.anchor.set(0.5);

	//insert into game
	game.add.existing(this);
	//add to its group
	group_npc.add(this);

	// for toggle of detection radius
	this.boom;
	this.boom_bool = true;
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


	//TIMERS
	if(this.behaveCont)this.behave ++;
	if(this.stunTimerCont)this.stunTimer++;
	if(this.atkTimerCont)this.atkTimer++;
	if(this.behave % this.longDura == 0){
		this.behave = 1;
		determineBehavior(this);
	}
	if(this.stunTimer % this.shortDura == 0){
		this.stunTimer = 1;
		unStun(this);
	}
	if(this.atkTimer % this.shortDura == 0){
		this.atkTimer = 1;
		resetAttack(this);
	}

	//COLLISION + OVERLAPS
	let hitGround = game.physics.arcade.collide(this, layer1);
	let hit = 0;
	if(!player.hidden && this.aggro) {
		hit = game.physics.arcade.overlap(this, player, attackPlayer);
	}
	if(player.isInvis){
		game.physics.arcade.collide(this, player, aggro);
	}

	//MOVEMENT
	if(this.movingHori != 0 && !this.isStunned) {
		this.body.velocity.x = this.maxSpeed * this.movingHori;
		if(Math.sign(this.body.velocity.x) != this.facing){
		//flip images
			this.facing *= -1;
			this.scale.x *= -1;
			this.sight.scale.x *= -1;
		}
		this.animations.play('walk', 105, true);
	} else {
		this.body.velocity.x = 0;
		this.animations.play('idle', 0, false);
	}
	//make the sight follow the facing variable
	this.sight.x = this.x;
	this.sight.y = this.y-30;

	//BEHAVIOR
	if(!this.isStunned){
	//when the player has not stunned this...
		this.sight.renderable = true;
		this.stunTimerCont = false;
		if(this.sight.playerInSight && !player.hidden) { 
		//turn aggro
			//make quote appear
			this.aggro = true;
			if(this.teacherism.fullText == ""){
				this.teacherism.fullText = EQ[Math.floor(Math.random()*(EQ.length))];
			}
			this.teacherism.active = true;
			
			// for creating detection Boom object
			if (this.boom_bool) {
				this.boom = new detectionBoom(this.x, this.y,'boom');
				this.boom_bool = false;
				this.growlSFX.play();
			}

			this.behaveCont = false;
		} else if(player.hidden){
		//reset booleans when hidden
			this.boom_bool = true;
			this.aggro = false;
			this.behaveCont = true;
		}
	} else {
	//stunned behavior and resets
		if(!this.stunSFXplayed){
			this.stunSFXplayed = true;
			this.stunSFX.play();
		}
		this.sight.renderable = false;
		this.stunTimerCont = true;
	}

	//AGGRO TO PLAYER
	if(this.aggro){
		if(this.canAttack) this.tint = 0xFF3333;
		else this.tint = 0xAA4444;
		this.idle = false;
		this.isStunned = false;
		//messing around with max speed
		this.maxSpeed = Math.min(400, Math.abs(player.x - this.x) + 100);
		moveTowardsPlayer(this);
		rotateSights(this, this.sight);
		// allows npc to jump
		if (hitGround) jump(this); 
		this.atkTimerCont = true;
		this.sight.body.setSize(2*this.sight.origWidth-50, 2*this.sight.origWidth-50, 0, -this.sight.origWidth);
	} else {
		//non-aggro behavior
		removeText(this.teacherism);
		if(this.isStunned)this.tint = 0x66FF66;
		else this.tint = 0xFFFFFF;
		if(this.sight.rotation != 0) this.sight.scale.x = -this.facing;
		this.sight.rotation = 0;
		this.atkTimerCont = false;
		this.maxSpeed = 100;
		this.sight.body.setSize(this.sight.origWidth-25, this.sight.origHeight-50, 0, this.sight.origWidth/8);
	
	}

	//QUOTE
	this.teacherism.x = this.x;
	this.teacherism.y = this.y-100;

	//HARD SPEED CAP
	if (Math.abs(this.body.velocity.y)>850) this.body.velocity.y=850;
}

//=========
//FUNCTIONS
//=========
// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
function determineBehavior(me){
	//console.log("called");
		if(me.idle) {
			me.idle = false;
			me.movingHori = 0;
		} else {
			//turn around
			me.movingHori = -1 * me.facing;
			me.idle = true;
		}
	//console.log("normal npc = " + this.movingHori);
}

//undo the stun effect
function unStun(me){
	me.stunSFXplayed = false;
	me.isStunned = false;
	me.idle = true;
	me.stunTimerCont = false;
}

//follow player
function moveTowardsPlayer(self){
	// follow and hit player
	//console.log("ATTACK!!")
	let move = (player.x - self.x);
	if(Math.abs(move) < 25){
		move = 0;
	} else move = Math.sign(move);

	self.movingHori = move;
}

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
	}
}

function resetAttack(me){
	me.canAttack = true;
}

function rotateSights(npc, sights){
	if(sights.scale.x == 1){
		sights.rotation = Math.atan2(npc.y-player.y, npc.x-player.x);
	} else sights.rotation = Math.atan2(player.y-npc.y, player.x-npc.x);
	//return sights.rotation;
}

function aggro(me, play){me.aggro = true;}