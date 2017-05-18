// Player.js
// Player object template for phaser
//		Written by: Philip Stanley

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

	this.maxSpeed = 250;
	this.jump = -500;
	this.accel = 25;
	this.hidden = false; // can the player be seen?
	this.facing = 1; //1 for right, -1 for left

	//upload animations
	this.animations.add('idle', [0], 1, false);
	this.animations.add('walk', [1,2,3,4], 10, true);
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
		if(!game.physics.arcade.overlap(this, group_ViewBox) && k_attack){
			var hitBox;
			if(this.facing > 0) hitBox = game.add.sprite(this.x, this.y, 'platform');
			else hitBox = game.add.sprite(this.x-60, this.y, 'platform');
			game.physics.arcade.enable(hitBox);
			//change hit box size
			hitBox.body.setSize(60, 50, 0, 0);
			game.physics.arcade.overlap(hitBox, group_npc, stunTheEnemy);
			hitBox.destroy();
			//--add animation--//
		}
	} else this.body.velocity.x = 0; //stop when hidden

	if(this.body.velocity.x != 0) this.animations.play('walk', 15, true);
	else this.animations.play('idle');

}

function stunTheEnemy(hb, npc){
	npc.isStunned = true;
}
