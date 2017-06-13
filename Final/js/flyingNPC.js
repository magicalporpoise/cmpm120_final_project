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

	//CHANGE FOR FLYING ENEMY
	this.behave.pause();

	this.newBehave = game.time.create(false);
	this.newBehave.loop(5000, flyingnewBehave, this);
	this.newBehave.start();
	//this.sight.scale.x = 1;
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
		this.body.velocity.y = (player.y - this.y);
		this.sight.body.setSize(2*this.sight.origWidth-50, 2*this.sight.origWidth-50, 0, -this.sight.origWidth);
		//change view box size
		//let angle = this.sight.rotation;
		//this.sight.body.setSize(100, 100, Math.cos(this.sight.rotation) * this.sight.width, Math.sin(this.sight.rotation) * this.sight.width);
	} else {
		this.sight.rotation = -Math.PI/2;
		this.sight.body.setSize(this.sight.origHeight, this.sight.origWidth, 7*this.sight.origWidth/8, 0);
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

//=========
//FUNCTIONS
//=========
// determineBehavior(npc)
//		take the npc and set its movement variables
//		based off stimuli
flyingnewBehave = function determineBehavior(){
	//console.log("called");
		if(this.idle) {
			this.idle = false;
			this.movingHori = 0;
		} else {
			//turn around
			this.movingHori = -1 * this.facing;
			this.idle = true;
		}
}