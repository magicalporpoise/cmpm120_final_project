// flyingNPC.js
// NPC object template for phaser, flying enemy
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function flyingNPC(game, x, y, img, frame) {
	//inherit NPC class
	// calling new Sprite
	NPC.call(this, game, x, y, img, frame);

	this.altitude = this.y;

	//CHANGE FOR FLYING NPC
	this.sight.anchor.x = 1;
	this.sight.rotation = -Math.PI/2;
	this.sight.body.setSize(this.sight.origHeight, this.sight.origWidth, 0, 0);
	this.body.gravity.y = 0;

	//insert into game
	//game.add.existing(this); 

	//add to flyingNPC group
	//group_npc.add(this);


}

//=========
//PROTOTYPE
//=========
flyingNPC.prototype = Object.create(NPC.prototype);
flyingNPC.prototype.constructor = flyingNPC;

//======
//UPDATE
// call and then change small functionality
//======
flyingNPC.prototype.update = function(){
	NPC.prototype.update.call(this);

	//also follow y direction
	if(this.aggro){
		this.body.velocity.y = Math.min(Math.abs(player.y - this.y), 400) * Math.sign(player.y-this.y);
		this.sight.body.setSize(2*this.sight.origWidth-50, 2*this.sight.origWidth-50, 0, -this.sight.origWidth);
		//change view box size
		//let angle = this.sight.rotation;
		//this.sight.body.setSize(100, 100, Math.cos(this.sight.rotation) * this.sight.width, Math.sin(this.sight.rotation) * this.sight.width);
	} else {
		this.sight.rotation = -Math.PI/2;
		this.sight.body.setSize(this.sight.origHeight-50, this.sight.origWidth-50, 320, 120);
		//this.sight.body.setSize(this.sight.height, Math.abs(this.sight.width), this.sight.width-42, 42);
		//fly back up to a normal height
		if(this.y != this.altitude) this.body.velocity.y = (this.altitude-this.y);
	}
	//prevent weird sight flipping on update from
	//parent npc class
	this.sight.scale.x = 1;
	//make it so that it's constantly flapping
	this.animations.play('walk', 105, true);
}