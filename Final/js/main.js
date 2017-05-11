//-----------------------------------------------------------------------
// Phaser: Game World
// 		phaser template for a basic game world
//		use this as the base for a 2-D game project
// 		Written by: Philip Stanley
//-----------------------------------------------------------------------

//create phaser game variable
var game = new Phaser.Game(600, 600, Phaser.AUTO);

//***
//PRELOAD: 
//	load main art assets and move to the main menu
//***
var Preloader = function(game) {};
Preloader.prototype = {
	preload: function() {
		console.log("In Preloader: preload");
		//LOAD ART ASSETS
		game.load.path = "assets/img/";
		game.load.image('player', 'characterTempArt.png');
		game.load.image('platform', 'platform.png');
		game.load.image('flame', 'flameParticle.png');
	},
	create: function(){
		console.log("In Preloader: create");
		//go to next state
		game.state.start('MainMenu');
	}
}

//***
//MAINMENU: 
//	wait for player input to begin the game
//***
var MainMenu = function(game) {
	//Needed text
};
MainMenu.prototype = {
	create: function() {
		console.log("MainMenu: create");
		//give main menu instructions
		var introText = game.add.text(16, game.world.height/2,
						'PRESS SPACE TO CONTINUE', 
						{ fontSize: '32px', fill: '#FFF' });
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('Game');
		}
	}
}

//***
//GAME: 
//	set up assets, play the game
//***
var Game = function(game) {
}

Game.prototype = {
	preload: function(){
		console.log("in Game Preloader");
	},
	create: function() {
		console.log("in Game Create");
		//create any player objects
		var player = new Player(100, 100, 0.5, 'player');
		game.add.existing(player);

		//create any npc objects
		var npc = new NPC(400, 400, 0.25, 'player');
		game.add.existing(npc);

		//create a platform object
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height -64, 'platform');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		//start / allow physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
	
	},
	update:function() {		// add game logic
		// some logic is handled within other objects
	}
}



//Add the states to the game and start up.
//	additional logic can be used to traverse states
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.start('Preloader');