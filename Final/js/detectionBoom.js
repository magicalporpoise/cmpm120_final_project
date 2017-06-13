
//===========
//CONSTRUCTOR
//===========
function detectionBoom(x, y, img){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);
	//console.log("made view box");

	//phaser related variables
	//		and physics
	this.x = x;
	this.y = y;
	//this.scale.x = scale_length;
	//this.scale_length = scale_length;
	//this.scale.y = scale_length;
	this.scale.x=0.8;
	this.scale.y=0.8;


	this.anchor.x=0.5;
	this.anchor.y=0.5;
	//this.scale.y = scale;

	game.physics.arcade.enable(this);
	game.add.existing(this);
	
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
		this.scale.x += 0.05;
		this.scale.y += 0.025;
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