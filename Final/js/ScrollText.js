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

	this.text.strokeFill='#000';
	this.text.stroke= 8; 

	this.x = x;
	this.y = y-30;

	this.active = false;
	this.time = 0;
	this.speed = 0.1;
	game.physics.arcade.enable(this);
	//insert into game
	game.add.existing(this);
	//add to Text group
	group_Text.add(this);
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
	//console.log("in ScrollText " +this.active);
	if(this.active && this.time <= this.fullText.length){
		this.time += this.speed;
		this.text = this.fullText.substring(0, Math.floor(this.time));
	}
	//console.log(this.time);
	//console.log(this.fullText);
}