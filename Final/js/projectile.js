function projectile(x, y, speed, direction, scale_length, img){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);
	//console.log("made view box");

	//phaser related variables
	//		and physics

	this.x = x;
	this.y = y;
	this.scale.x = scale_length;
	this.scale.y = scale_length;

	this.speed = speed;
	this.dir = direction;

	this.anchor.x=0.5;
	this.anchor.y=0.5;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);
	this.body.setSize(100, 70, 100, 100);

	this.collideworldbounds = true;
	this.outofboundskill = true;
	
	// Booleans for sight
	this.playerInSight = false;
	this.anim = this.animations.add('shoot');

	this.doDestroy = false;
	
	// for mouse clicked event
	//game.physics.arcade.moveToPointer(this, 300);
	group_projectile1.add(this);
}

//=========
//PROTOTYPE
//=========
projectile.prototype = Object.create(Phaser.Sprite.prototype);
projectile.prototype.constructor = projectile;

//==================
//UPDATE FUNCTION:
//	projectile behavior
//==================
projectile.prototype.update = function(){
	// move velocity
	this.body.velocity.x = this.speed * this.dir;

	let hitGround = game.physics.arcade.collide(this, layer1);
	if (hitGround) {
		//console.log("projectile hit ground");
		this.destroy();
	}
	
	if (this.doDestroy) this.destroy();
	// collision with npc
	let projHit = game.physics.arcade.overlap(this, group_npc, vanish);
	//if (projHit) {
		//game.physics.arcade.overlap(this, group_npc, vanish);
		//this.destroy();
	//}

	//collision with viewbox

	this.animations.play('shoot', 10, false);


	// debug
	//game.debug.body(this);
}

function vanish(hb, npc){
	//npc.destroy();
	if(!npc.aggro){
		npc.isStunned = true;
	}
	hb.doDestroy=true;
	//npc.sight.destroy();
}