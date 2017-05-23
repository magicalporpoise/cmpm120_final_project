// Player.js
// Player object template for phaser
//		Written by: Philip Stanley

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
	
	//personal variables
	this.hearts = 10;		//character's hp
	this.maxSpeed = 500;	//speed cap
	this.jump = -500;		//jump height
	this.accel = 25;		//acceleration
	this.hidden = false; 	//is the player hidden from enemies?
	this.facing = 1; 		//1 for right, -1 for left

	//sounds
	this.stepSFX = game.add.audio('step');
	this.stepSFX.loopFull();

	//upload animations
	this.animations.add('idle', [0], 1, false);
	this.animations.add('walk', [1,2,3,4], 10, true);

	//add to game world
	game.add.existing(this);
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
	//get key presses
	let mv_up = game.input.keyboard.justPressed(Phaser.Keyboard.W);
	let mv_left = game.input.keyboard.isDown(Phaser.Keyboard.A);
	let mv_right = game.input.keyboard.isDown(Phaser.Keyboard.D);
	let mv_down = game.input.keyboard.justPressed(Phaser.Keyboard.S);
	let k_attack = game.input.keyboard.justPressed(Phaser.Keyboard.K); 

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
		if(vert < 0 && hitGround){ 
			this.body.velocity.y = this.jump; // also allows wall jumps
		}

		//move left and right + accelerate
		if(hori != 0) {
			this.body.velocity.x += this.accel * hori;
			if(Math.sign(this.body.velocity.x) != this.facing) {
				this.facing *= -1;
				this.scale.x *= -1;
			}

		} else { //deccelerate
			this.body.velocity.x -= Math.sign(this.body.velocity.x) * this.accel / 2;
			//stopping
			if(Math.abs(this.body.velocity.x) < this.accel/2) this.body.velocity.x = 0;
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
			if(!group_npc.aggro) game.physics.arcade.overlap(hitBox, group_npc, stunTheEnemy);
			hitBox.destroy();
			//--add animation--//
		}
	} else { //IS HIDDEN
		this.tint = 0;				//turn black when hidden
		this.body.velocity.x = 0;	//stop when hidden
	}

	//ANIMATION + SOUND HANDLING
	if(this.body.velocity.x != 0){
		this.animations.play('walk', 15, true);
		this.stepSFX.resume();
	}else {
		this.stepSFX.pause();
		this.animations.play('idle');
	}

}

function stunTheEnemy(hb, npc){
	npc.isStunned = true;
}
