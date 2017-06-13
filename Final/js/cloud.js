function cloud(x, y, scale_length, img){
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
	game.add.existing(this);

	this.imagination = game.add.text(game.world.width/2, game.world.height/2,
				player.hearts, 
				{ fontSize: '64px', fill: '#FFF', stroke: '#000'});
	this.imagination.strokeThickness = 10;

	//tracker to see if you took damage
	this.oldHearts = player.hearts;
	//particle effect whenever you lose imagination
	this.rainbowDeath = game.add.emitter(x, y, 1000);
	this.rainbowDeath.makeParticles('rainbowShot');
	this.rainbowDeath.minParticleScale = 0.7;
	this.rainbowDeath.maxParticleScale = 0.9;
	this.rainbowDeath.gravity.y = 500;
	this.rainbowDeath.setXSpeed(-100, 300);
	this.rainbowDeath.setYSpeed(400, 500);
	this.rainbowDeath.start(true, 1000, 0, 0, true);

	//other emitter for player
	this.playerpain = game.add.emitter(x, y, 1000);
	this.playerpain.makeParticles('-1');
	this.playerpain.setXSpeed(-100, 300);
	this.playerpain.setYSpeed(-100, -200);
	this.playerpain.start(true, 1000, 0, 0, true);

	group_Emitter.add(this);
	group_Emitter.add(this.rainbowDeath);
	group_Emitter.add(this.imagination);

	//console.log(this.rainbowDeath);
}

//=========
//PROTOTYPE
//=========
cloud.prototype = Object.create(Phaser.Sprite.prototype);
cloud.prototype.constructor = cloud;

//==================
//UPDATE FUNCTION:
//	cloud behavior
//==================
cloud.prototype.update = function(){
	this.x = game.camera.x;
	this.y = game.camera.y;

	takeDamage(this, [this.playerpain, this.rainbowDeath], this.oldHearts);

	this.rainbowDeath.x = this.x + (this.scale.x*this.width)/3;
	this.rainbowDeath.y = this.y + (this.scale.y*this.height)/2;
	this.playerpain.x = player.x;
	this.playerpain.y = player.y;

	this.scale.x = (player.hearts+player.maxHearts/4)/player.maxHearts;
	this.scale.y = (player.hearts+player.maxHearts/4)/player.maxHearts;

	this.imagination.x = game.camera.x + this.width/4;
	this.imagination.y = game.camera.y + this.height/4 -5;

	this.imagination.text = player.hearts;
	this.imagination.scale.x = (player.hearts+player.maxHearts/4)/player.maxHearts;
	this.imagination.scale.y = (player.hearts+player.maxHearts/4)/player.maxHearts;
}

//================
//HELPER FUNCTIONS
//================
function takeDamage(me, emit, oldHP){
	if(player.hearts != oldHP){
		let diff = oldHP - player.hearts;
		me.oldHearts = player.hearts;
		for(var i = 0 ; i < emit.length ; i++){
			emit[i].quantity = diff;
			emit[i].explode(1000, diff);
		}
	} else {
		emit.on = false;
	}
}




