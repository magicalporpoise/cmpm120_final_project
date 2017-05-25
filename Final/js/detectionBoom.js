
//===========
//CONSTRUCTOR
//===========
function detectionBoom(x, y, scale_length, img){
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

	this.anchor.x+=0;
	this.anchor.y+=0.5;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);
	
	// Booleans for sight
	this.npcInRange = false;
	this.s=0;
}

//=========
//PROTOTYPE
//=========
detectionBoom.prototype = Object.create(Phaser.Sprite.prototype);
detectionBoom.prototype.constructor = detectionBoom;

//==================
//UPDATE FUNCTION:
//	viewbox behavior
//==================

detectionBoom.prototype.update = function(){
	let boomHit = game.physics.arcade.overlap(this, group_npc);
	if (this.s<=20) {
		this.scale.x += 0.1;
		this.scale.y += 0.03;
	}
	if (this.s>=50) {
		this.destroy();
	}
	this.s++;

	if (boomHit) game.physics.arcade.overlap(this, group_npc, makeAggro);
	

	//if (boomHit) npc.aggro = true;
	//if(boomHit) {this.npcInRange = true;}
	//else this.npcInRange = false;
	//else this.playerInSight = false;

	// debug
	//game.debug.body(this);
}

function makeAggro(hb, npc){
	npc.aggro = true;
}