// ScrollText.js
// ScrollText object template for phaser
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function ScrollText(game, x, y, txt, style){
	//inherit Phaser.Text class
	// calling new Text
	Phaser.Text.call(this, game, x, y, txt, style);
	//phaser related variables
	//		and physics
	this.fullText = txt;
	this.text = "";

	this.stroke = '#000';
	this.strokeThickness= 6; 

	this.x = x;
	this.y = y;

	this.active = false;
	this.time = 0;
	this.speed = 1;
	game.physics.arcade.enable(this);
	//insert into game
	game.add.existing(this);
	if(game.state.current != 'Lore')group_text.add(this);
}

//=========
//PROTOTYPE
//=========
ScrollText.prototype = Object.create(Phaser.Text.prototype);
ScrollText.prototype.constructor = ScrollText;

//=====================
//UPDATE FUNCTION:
//	ScrollText behavior
//=====================
ScrollText.prototype.update = function(){
	if(this.active && this.time <= this.fullText.length){
		this.time += this.speed;
		this.text = this.fullText.substring(0, Math.floor(this.time));
	}
}

function removeText(me){
	me.text = "";
	me.fullText = "";
	me.active = false;
	me.time = 0;
}