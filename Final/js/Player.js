// Player.js
// Player object template for phaser

//***
// CONSTRUCTOR
//***
function Player(x, y, scale, img){
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
	this.body.gravity.y = 1000;
	this.body.collideWorldBounds = true;
	
	//personal variables
	this.hearts = 10;
	this.maxSpeed = 500;
	this.jump = -500;
	this.accel = 25;
	this.hidden = false; // can the player be seen?
	this.facing = 1; //1 for right, -1 for left

	//sounds
	this.stepSFX = game.add.audio('step');
	this.stepSFX.loopFull();

	//upload animations
	this.animations.add('idle', [0], 1, true);
	//this.animations.add('idle', Phaser.Animation.generateFrameNames('', 1, 2, '', 4), 10, true, false);
	//this.animations.add('walk', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,], 10, true);
	//this.onStart.add(animationStarted, this);
	//this.animations.add('walk', Phaser.Animation.generateFrameNames('', 1, 61, '', 4), 10, true, false);
	var anim = this.animations.add('walk');
	//anim.play(100, true);

	game.add.existing(this);
}

//EDIT PROTOTYPE
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//***
//UPDATE FUNCTION:
//	player input and behavior
//***
Player.prototype.update = function(){
	//console.log('top of update');
	let mv_up = game.input.keyboard.justPressed(Phaser.Keyboard.W); //cursors.up.isDown;
	let mv_left = game.input.keyboard.isDown(Phaser.Keyboard.A); //cursors.left.isDown;
	let mv_right = game.input.keyboard.isDown(Phaser.Keyboard.D); //cursors.right.isDown;
	let mv_down = game.input.keyboard.justPressed(Phaser.Keyboard.S); //cursors.down.isDown;
	let k_attack = game.input.keyboard.justPressed(Phaser.Keyboard.K); 
	//collide with platforms
	// will this work even tho platforms are in main?
	let hitGround = game.physics.arcade.collide(this, layer1);

	//movement vars
	let vert = mv_down - mv_up;
	let hori = mv_right - mv_left;

	// move the character
	this.tint = 0xFFFFFF;
	if(!this.hidden){
		//jump
		if(vert < 0 && hitGround){ 
			// also allows wall jumps if against a wall 
			this.body.velocity.y = this.jump;
		} else if (vert > 0) {
			//fast fall.
			this.body.velocity.y = 10*this.accel;
		}
		//move left and right + accelerate
		if(hori != 0) {
			this.body.velocity.x += this.accel * hori;
			if(Math.sign(this.body.velocity.x) != this.facing){
				this.facing *= -1;
				this.scale.x *= -1;
			}

		}
		//reaching max speed
		if(Math.abs(this.body.velocity.x) > this.maxSpeed) 
			this.body.velocity.x = Math.sign(this.body.velocity.x) * this.maxSpeed;

		//deccelerate
		this.body.velocity.x -= Math.sign(this.body.velocity.x) * this.accel / 2;
		//stopping
		if(Math.abs(this.body.velocity.x) < this.accel/2) this.body.velocity.x = 0;

		//attacking
		if(k_attack){
			var hitBox;
			if(this.facing > 0) hitBox = game.add.sprite(this.x, this.y, 'platform');
			else hitBox = game.add.sprite(this.x-100, this.y, 'platform');
			game.physics.arcade.enable(hitBox);
			//change hit box size
			hitBox.body.setSize(100, 50, 0, 0);
			if(!group_npc.aggro) game.physics.arcade.overlap(hitBox, group_npc, stunTheEnemy);
			hitBox.destroy();
			//--add animation--//
		}
	} else {
		this.tint = 0;
		this.body.velocity.x = 0; //stop when hidden
	}
	if(this.body.velocity.x != 0){
		this.animations.play('walk', 65, true);
		this.stepSFX.resume();
	}else {
		this.stepSFX.pause();
		this.animations.play('idle');
	}
	//console.log('bot of update');

}

function stunTheEnemy(hb, npc){
	npc.isStunned = true;
}
