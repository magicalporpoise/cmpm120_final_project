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

	this.anchor.x+=1;
	this.anchor.y+=0.5;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);

	this.collideworldbounds = true;
	this.outofboundskill = true;
	
	// Booleans for sight
	this.playerInSight = false;
	this.anim = this.animations.add('shoot');
	
	// for mouse clicked event
	//game.physics.arcade.moveToPointer(this, 300);
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
	
	// move
	this.body.velocity.x = this.speed * this.dir;
	
	// collision
	let projHit = game.physics.arcade.overlap(this, group_npc);
	if (projHit) {
		game.physics.arcade.overlap(this, group_npc, vanish);
		this.destroy();
	}

	this.animations.play('shoot', 10, false);


	// debug
	//game.debug.body(this);
}

function vanish(hb, npc){
	//npc.destroy();
	npc.isStunned = true;
	//npc.sight.destroy();

}