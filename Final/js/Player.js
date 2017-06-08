// Player.js
// Player object template for phaser

//===========
//CONSTRUCTOR
//===========
function Player(x, y, scale, img){
	//Inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);

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
	//set hitbox size
	this.body.setSize(400, 800, 100, 50);
	//this.body.addRectangle(400, 800, 100, 50);

	
	//personal variables
	this.hearts = 10;		//character's hp
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
	//this.stepSFX.loopFull();

	this.playerAttack1SFX = game.add.audio('player_attack1');
	this.playerAttack2SFX = game.add.audio('player_attack2');
	this.playerAttack3SFX = game.add.audio('player_attack3');
	this.playerAttackCounter = 1; 

	


	//upload animations

	this.animations.add('falling', //[0,1,2,3,4,5,6,7,8,9,
		[10,11,12,13,14], 1, false);
	this.animations.add('idle', [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 65, true);
	this.animations.add('jump', [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],50,true);
	this.animations.add('idletorun', [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74], 65, true);
	this.animations.add('run', [75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103], 75, true);
	this.animations.add('punch', [104,105,106,107,108,109,110,111,112,113], 75, true);



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

	// imagination cloud

	this.cloud = new cloud(this.x, this.y-100, 0.3, 'bigcloud');
	game.add.existing(this.cloud);

	this.cloud1 = new cloud(this.x, this.y-100, 0.3, 'smallcloud');
	game.add.existing(this.cloud1);

	this.cloud2 = new cloud(this.x, this.y-100, 0.15, 'smallcloud');
	game.add.existing(this.cloud2);
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

	//this.cloud = new cloud(this.x, this.y-100, 0.3, 'bigcloud');
	//game.add.existing(this.cloud);
	this.cloud.x = this.x-50;
	this.cloud.y = this.y-150;

	this.cloud1.x = this.x-30;
	this.cloud1.y = this.y-100;

	this.cloud2.x = this.x-20;
	this.cloud2.y = this.y-80;

	//get key presses
	let mv_up = game.input.keyboard.justPressed(Phaser.Keyboard.W);
	let mv_left = game.input.keyboard.isDown(Phaser.Keyboard.A);
	let mv_right = game.input.keyboard.isDown(Phaser.Keyboard.D);
	let mv_down = game.input.keyboard.justPressed(Phaser.Keyboard.S);

	let k_attack = game.input.keyboard.justPressed(Phaser.Keyboard.K); 

	let f_dash = game.input.keyboard.justPressed(Phaser.Keyboard.F);
	let r_shoot = game.input.keyboard.justPressed(Phaser.Keyboard.R);

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

		//if (hitGround) console.log("player hit ground");

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

				//this.animations.play('run', 75, true);

				//console.log("acceling");
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
		if(k_attack){
			var hitBox;	//make a hitbox to check against an enemy
			if(this.facing > 0) hitBox = game.add.sprite(this.x, this.y, 'platform');
			else hitBox = game.add.sprite(this.x-100, this.y, 'platform');
			game.physics.arcade.enable(hitBox);
			//change hit box size
			hitBox.body.setSize(100, 50, 0, 0);

			//console.log("isPunching set to true");

			this.isPunching = true;
			if(!group_npc.aggro) game.physics.arcade.overlap(hitBox, group_npc, stunTheEnemy);
			hitBox.destroy();


			//--add animation--//
		}
		if (f_dash){
			player.x+=this.facing*300;//Math.sign(this.body.velocity.x)*300;
			player.hearts -=2;
			//this.body.velocity.x=this.facing*(this.maxSpeed+500);
		}
		if (r_shoot){
			this.shoot = new projectile(this.x, this.y, 1000, this.facing, 0.3, 'rainbowShot');
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
		this.tint = 0;				//turn black when hidden
		this.body.velocity.x = 0;	//stop when hidden

		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !game.physics.arcade.overlap(this, group_hidingspot)){
			this.hidden = false;
		}
	}

	//ANIMATION + SOUND HANDLING

	if (mv_up) {
		//console.log("jump");
		//this.animations.play('jump', 50, false);
		this.isJumping = true;
	}
	if (hitGround) {
		this.isJumping = false;
	}





	/*else if (mv_left || mv_right) {
		idletorun_playing = this.animations.play('idletorun');
		if (idletorun_playing.loopCount>=1) {
			console.log("done");
			idletorun_playing = this.animations.play('run', 75, true);
		}
		
	}
	
	
	if (this.body.velocity.y >= 100 || this.body.velocity.y <= -100) {
		console.log("y vel " + this.body.velocity.y);
		//this.animations.play('falling', 2, false);
	}*/

	if (this.isPunching){
		//console.log("punch anim");
		//if (punch_playing.loopCount<=1)

		punch_playing = this.animations.play('punch', 50, false);
		punch_playing.onComplete.add(animationStopped, this);
	}

	else if (this.isJumping){
		//console.log("jump anim");
		this.jump_playing = this.animations.play('falling', 5, false);
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
			if (idletorun_playing.loopCount>=1) {
				//console.log("finished");
				this.excel = false;
				//this.decel = false;
				//idletorun_playing.destroy();
				//idletorun_playing.killOnComplete = true;
				

				this.animations.play('run', 75, true);

				//if (Math.abs(this.body.velocity.x)<=100 && this.body.velocity.x<this.oldVelocity) {
				//	console.log("slowed down, change anim");
					//idletorun_playing = this.animations.play('runtoidle');
				//}
			

			}

			

	} else {

		//this.stepSFX.pause();
		//console.log("idle");
		//if (!this.isJumping)



		this.animations.play('idle', 10, true);
	}
	//console.log('bot of update');

	this.oldVelocity = this.body.velocity.x;

	if(hitGround && !this.landed){
		this.landSFX.play();
		this.landed = true;
	}

	if(vert < 0){
		this.landed = false;
	}
	


}

//=========
//FUNCTIONS
//=========
function stunTheEnemy(hb, npc){
	//console.log("isPunching should be false...")
	//player.isPunching = false;
	player.punchSFX.play();
	npc.isStunned = true;
}


function animationStopped(sprite, animation){
	player.isPunching = false;
}