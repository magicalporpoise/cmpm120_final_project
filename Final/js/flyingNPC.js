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

	//CHANGE FOR FLYING ENEMY
	game.time.events.remove(this.behave[0]);
	this.behave.loop(Math.random()*2000+5000, flyingBehave, this);
	this.behave.start();
	//this.sight.scale.x = 1;
	this.sight.rotation = -Math.PI/2;
	this.sight.body.setSize(this.sight.height, this.sight.width, this.sight.width-42, 42);
	this.body.gravity.y = 0;

	//insert into game
	game.add.existing(this); 

	//add to flyingNPC group
	group_npc.add(this);


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
flyingBehave = function determineBehavior(){
	//console.log("called");
		if(this.idle) {
			this.idle = false;
			this.movingHori = 0;
		} else {
			//turn around
			this.movingHori = -1 * this.facing;
			this.idle = true;
		}

	//console.log("flying npc behavior = " + this.movingHori);
}