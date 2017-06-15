// Player.js
// Player object template for phaser

//===========
//CONSTRUCTOR
//===========
function Player(x, y, scale, img){
	//Inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);


	//invisibility
	this.isInvis = false;

	//phaser related variables
	//and physics


	this.x = x;
	this.y = y;
	this.scale.x = scale;
	this.scale.y = scale;
	this.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000;
	this.body.collideWorldBounds = true;
	//this.checkWorldBounds = true;
	//this.events.onOutOfBounds.add(deathRestart, this);
	//set hitbox size
	this.body.setSize(400, 800, 100, 50);
	//this.body.addRectangle(400, 800, 100, 50);

	
	//personal variables
	this.maxHearts = 100;	//character's hp
	this.hearts = this.maxHearts;		
	this.maxSpeed = 500;	//speed cap
	this.jump = -500;		//jump height
	this.accel = 25;		//acceleration
	this.hidden = false; 	//is the player hidden from enemies?
	this.facing = 1; 		//1 for right, -1 for left

	//sounds
	this.landSFX = game.add.audio('step');
	this.landed = false;
	this.punchSFX = game.add.audio('NPCHit');



	// for anim cancelling/playing at the right times
	this.isJumping = false;
	this.isPunching = false;
	this.isShooting = false;
	//this.stepSFX.loopFull();

	this.playerAttack1SFX = game.add.audio('player_attack1');
	this.playerAttack1SFX.volume = .4;
	this.playerAttack2SFX = game.add.audio('player_attack2');
	this.playerAttack2SFX.volume = .4;
	this.playerAttack3SFX = game.add.audio('player_attack3');
	this.playerAttack3SFX.volume = .4;
	this.playerAttackCounter = 1; 

	


	//upload animations

	this.animations.add('falling', //[0,1,2,3,4,5,6,7,8,9,
		[10,11,12,13,14], 1, false);
	this.animations.add('idletosit', [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 65, true);
	this.animations.add('sit', [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44], 65, true);
	this.animations.add('idle', [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59], 65, true);
	this.animations.add('takingdamage', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 65, true);
	//this.animations.add('idle', [115,116,117,118,119,120,121,122,123,124,125,126,127,128,129], 65, true);
	this.animations.add('idletorun', [60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89], 75, true);
	this.animations.add('jump', [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],50,true);
	//this.animations.add('idletorun', [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74], 65, true);
	this.animations.add('run', [90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119], 75, true);
	this.animations.add('punch', [120,121,122,123,124,125,126,127,128,129,139,140,141,142,143], 75, true);



	//this.animations.add('run', [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74], 75, true);
	//this.animations.add('idletorun', [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44], 65, true);
	//this.animations.add('runtoidle', [44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15], 65, true);



	// **** this.animations.add('idle', [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49], 1, true);
	//this.animations.add('idle', Phaser.Animation.generateFrameNames('', 1, 2, '', 4), 10, true, false);
	//this.animations.add('walk', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
	// 							   31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], 10, true);
	// **** this.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 1, true);
	//this.onStart.add(animationStarted, this);
	//this.animations.add('walk', Phaser.Animation.generateFrameNames('', 1, 61, '', 4), 10, true, false);
	//var anim = this.animations.add('walk');
	//anim.play(100, true);
	game.add.existing(this);


	this.excel = true;
	this.decel = false;

	this.oldVelocity = 0;
	var idletorun_playing, jump_playing, punch_playing;

	this.counter = 0;



	// for imagination cloud

	/*this.cloud = new cloud(this.x, this.y-100, 0.3, 'bigcloud');
	game.add.existing(this.cloud);

	this.cloud1 = new cloud(this.x, this.y-100, 0.3, 'smallcloud');
	game.add.existing(this.cloud1);

	this.cloud2 = new cloud(this.x, this.y-100, 0.15, 'smallcloud');
	game.add.existing(this.cloud2);*/
}

//=========
//PROTOTYPE
//=========
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//==========================================
//UPDATE FUNCTION: player input and behavior
//==========================================
Player.prototype.update = function(){
	this.alpha = 1;
	// for moving clouds

	/*this.cloud.x = this.x-50;
	this.cloud.y = this.y-150;

	this.cloud1.x = this.x-30;
	this.cloud1.y = this.y-100;

	this.cloud2.x = this.x-20;
	this.cloud2.y = this.y-80;*/

	// get key presses
	let mv_up = (game.input.keyboard.justPressed(Phaser.Keyboard.W) || game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR));
	let mv_left = game.input.keyboard.isDown(Phaser.Keyboard.A);
	let mv_right = game.input.keyboard.isDown(Phaser.Keyboard.D);
	let mv_down = game.input.keyboard.justPressed(Phaser.Keyboard.S);

	let k_attack = game.input.keyboard.justPressed(Phaser.Keyboard.K); 
	let l_down = game.input.keyboard.justPressed(Phaser.Keyboard.L);
	//let f_dash = game.input.keyboard.justPressed(Phaser.Keyboard.F);
	let r_shoot = game.input.keyboard.justPressed(Phaser.Keyboard.J);

	// for mouse is down
	//game.input.activePointer.isDown;

	//collide with platforms
	let hitGround = game.physics.arcade.collide(this, layer1);

	//movement vars
	let vert = mv_down - mv_up;
	let hori = mv_right - mv_left;

	//MOVEMENT
	if(!this.hidden){
		//tinting
		this.tint = 0xFFFFFF;
		//jump
		if(vert < 0 && hitGround ) {  //&& this.body.velocity.y ==0 for no double jump
			this.body.velocity.y = this.jump; // also allows wall jumps
		}

		//move left and right + accelerate
		if(hori != 0) {
			this.body.velocity.x += this.accel * hori;

			if(Math.sign(this.body.velocity.x) != this.facing) {
				this.facing *= -1;
				this.scale.x *= -1;
				this.excel=true;
				//console.log("here");
				this.decel = false;
			}

		} else { //deccelerate
			this.body.velocity.x -= Math.sign(this.body.velocity.x) * this.accel;
			//stopping
			if(Math.abs(this.body.velocity.x) < this.accel/2) this.body.velocity.x = 0;

			this.decel = true;

			//console.log("deceling");
		}


		//reaching max speed
		if(Math.abs(this.body.velocity.x) > this.maxSpeed) 
			this.body.velocity.x = Math.sign(this.body.velocity.x) * this.maxSpeed;

		//Can only attack while not hidden
		//attacking
		if(k_attack && !this.isInvis){
			var hitBox;	//make a hitbox to check against an enemy
			hitBox = game.add.sprite(this.x, this.y-40, 'platform');
			game.physics.arcade.enable(hitBox);
			//change hit box size
			hitBox.body.setSize(this.facing*125, 50);
			//game.debug.body(hitBox);
			//console.log("isPunching set to true");
			//SFX
			if(this.playerAttackCounter % 2 == 0){
				this.playerAttack2SFX.play();
				this.playerAttackCounter++;
			}else if(this.playerAttackCounter %3 == 0){
				this.playerAttack3SFX.play();
				this.playerAttackCounter++;
			}else{
				this.playerAttack1SFX.play();
				this.playerAttackCounter++;
			}

			this.isPunching = true;
			game.physics.arcade.overlap(hitBox, group_npc, stunTheEnemy, null, NPC);
			hitBox.destroy();
		}
		if (l_down){
			toggleInvis(this);
		}
		if(this.isInvis){
			this.alpha = 0.2;
			this.counter++;

			if (this.counter%30==0){
				this.hearts--;
				this.counter = 0;
			}
		}

		if (r_shoot && !this.isInvis){
			this.isShooting = true;
			this.shoot = new projectile(this.x + this.facing*25, this.y, 1000, this.facing, 0.3, 'rainbowShot');
			game.add.existing(this.shoot);
			//console.log('r pressed');
			//SFX
			if(this.playerAttackCounter % 2 == 0){
				this.playerAttack2SFX.play();
				this.playerAttackCounter++;
			}else if(this.playerAttackCounter %3 == 0){
				this.playerAttack3SFX.play();
				this.playerAttackCounter++;
			}else{
				this.playerAttack1SFX.play();
				this.playerAttackCounter++;
			}

			player.hearts -=2;
		}
	} else { //IS HIDDEN
		this.tint = 0x111111;		//face when hidden
		this.body.velocity.x = 0;	//stop when hidden
		this.body.velocity.y = 0;	//stop when hidden

		if ((game.input.keyboard.justPressed(Phaser.Keyboard.S)||game.input.keyboard.justPressed(Phaser.Keyboard.W)) && !game.physics.arcade.overlap(this, group_hidingspot)){
			this.hidden = false;
		}
	}

	//ANIMATION + SOUND HANDLING
	//console.log("player y vel "+this.body.velocity.y);

	if (Math.abs(this.body.velocity.y)>850) this.body.velocity.y=850;

	if (mv_up) {
		//console.log("jump");
		//this.animations.play('jump', 50, false);
		this.isJumping = true;
	}
	if (hitGround) {
		this.isJumping = false;
	}

	if (this.isPunching || this.isShooting){
		//console.log("punch anim");
		//if (punch_playing.loopCount<=1)
		punch_playing = this.animations.play('punch', 50, false);
		punch_playing.onComplete.add(animationStopped, this);
	}
	else if (this.isJumping){
		//console.log("jump anim");
		//this.jump_playing = this.animations.play('falling', 5, false);
	}
	else if (this.body.velocity.x != 0) {
			//console.log("run");
			if (this.excel) {
				//if (this.body.acceleration.x>0)
				//console.log("accel anim");
				idletorun_playing = this.animations.play('idletorun');  //,65,false);
				//else 
				//idletorun_playing = this.animations.play('runtoidle');
			
			}
			//idletorun_playing.killOnComplete = true;

			//idletorun_playing.killOnComplete = true;
			if (idletorun_playing.loopCount>=1 && (mv_left || mv_right)) {//Math.abs(this.body.velocity.x)>180) {
				//console.log("finished");
				this.excel = false;
				this.animations.play('run', 75, true);
			}

			

	} else {
		if(this.hidden)	{
			this.facing = 1;
			this.scale.x = this.scale.y;
			this.animations.play('sit', 50, true);
		}
		else this.animations.play('idle', 10, true);
	}

	this.oldVelocity = this.body.velocity.x;
	if(hitGround && !this.landed){
		this.landSFX.play();
		this.landed = true;
	}

	if(!hitGround && (this.body.velocity.y< -50 || this.body.velocity.y > 50)){
		this.landed = false;
	}
	


}

//=========
//FUNCTIONS
//=========
function stunTheEnemy(hb, npc){
	player.punchSFX.play();
	npc.isStunned = true;
	//npc.body.velocity.x += Math.sign(npc.x - player.x)*400;
	//console.log(npc.body.velocity.x);
	//console.log(Math.sign(npc.x - player.x)*400);
}


function animationStopped(sprite, animation){
	player.isPunching = false;
	player.isShooting = false;
}

function deathRestart(sprite){
	sprite.x = 300;
	sprite.y = 300;
}

function toggleInvis(me){
	me.isInvis = !me.isInvis;
}