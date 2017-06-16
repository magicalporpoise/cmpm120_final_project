function speaker(game, x, y, img, frame, text){
	//inherit Phaser.Sprite class
	// calling new Sprite
	Phaser.Sprite.call(this, game, x, y, img, 0);
	//console.log("made view box");
	game.physics.arcade.enable(this);
	game.add.existing(this);

	this.announcement = new ScrollText(game, x, y-100, text, { fontSize: '22px', fill: '#FFF'});

	this.active = false;

	this.body.setSize(300, 300);
	group_speaker.add(this);
	group_speaker.add(this.announcement);

}

//=========
//PROTOTYPE
//=========
speaker.prototype = Object.create(Phaser.Sprite.prototype);
speaker.prototype.constructor = speaker;

//==================
//UPDATE FUNCTION:
//	speaker behavior
//==================
speaker.prototype.update = function(){
	let playerHit = game.physics.arcade.overlap(this, player);
	if(playerHit){
		this.active = true;
		//console.log("in speaker " + this.active);
		if(this.active && !this.announcement.active){
			bellSFX.play();
			this.announcement.active = true;
		}
	}
}
