//-----------------------------------------------------------------------
// Phaser: Game World
// 		phaser template for a basic game world
//		use this as the base for a 2-D game project
//-----------------------------------------------------------------------

//create phaser game variable
var game;
var pauseScreen;
//***
//PRELOAD: 
//	load main art assets and move to the main menu
//***
var Preloader = function(game) {};
Preloader.prototype = {
	preload: function() {
		console.log("In Preloader: preload");
		
		//LOAD MUSIC
		game.load.path = 'assets/audio/music/';
		game.load.audio('ambient', 'Detention_ambient.mp3');

		game.load.path = 'assets/audio/music/'
		game.load.audio('dank','Detention_creepy.mp3')

		//LOAD SFX
		game.load.path = 'assets/audio/sfx/';
		game.load.audio('growl', 'growl.wav');
		game.load.audio('step', 'footstep.mp3');
		game.load.audio('NPCHit', 'NPCHit.mp3')
		game.load.path = 'assets/audio/sfx/player_attacks/';
		game.load.audio('player_attack1', 'player_attack1.wav');
		game.load.audio('player_attack2', 'player_attack2.wav');
		game.load.audio('player_attack3', 'player_attack3.wav');


		//LOAD ART ASSETS
		game.load.path = "assets/img/";
		game.load.spritesheet('player', 'stb-Sheet.png', 32, 50);
		// test
		game.load.spritesheet('player2', 'teddy_colored.png', 630, 900);		

		game.load.image('platform', 'platform.png');
		game.load.image('flame', 'flameParticle.png');
		game.load.image('blackTile', 'black_tile.png');

		//loads in json tilemap created with tiled(key,filename,
		//not exactly sure why null works here,the tilemap tool used)
		game.load.tilemap('tiletest1','tiletest1.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('elementary_tileset', 'elementary_tileset.json', null, Phaser.Tilemap.TILED_JSON);

		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		//game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);
		game.load.spritesheet('bricks3');


		// vectorized images
		game.load.image('bigcloud','cloud3_white.png');
		game.load.image('smallcloud','cloud5_white.png');

		// rasterized images and atlas's 
		game.load.image('sightLine','sightline2.png');
		game.load.image('redSquare','redSquareFill3.png');

		game.load.atlasJSONArray('teddy', 'teddy_everything.png', 'teddy_everything.json');
		game.load.atlasJSONArray('redBook', 'redBook.png', 'redBook.json');
		game.load.atlasJSONArray('blueBook', 'blueBookSheet.png', 'blueBookSheet.json');
		game.load.atlasJSONArray('rainbowShot', 'rainbowShot.png', 'rainbowShot.json');

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
						'WASD to MOVE\nSPACE to HIDE\nK to STUN\n\n press space to continue...', 
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
var currentLevel = 1;
var Game = function(game) {
	var player;
	var tilemap;
	var grayScreen;
}

Game.prototype = {

	preload: function(){
		console.log("in Game Preloader");
		if(currentLevel === undefined) currentLevel = 1;
	},
	create: function() {
		//Major Groups for Collision checks
		console.log('creating game');

		group_ViewBox = game.add.group();
		group_npc = game.add.group();
		group_hidingspot = game.add.group();
		group_projectile1 = game.add.group();
		group_Diploma = game.add.group();

		console.log(currentLevel);

		//Level1 = new Level('elementary_tileset','bricks3','Tile Layer 1');

		A_NEW_LEVEL = new Level('tiletest1', 'bricks3', 'Tile Layer 1');
		game.state.start(A_NEW_LEVEL, false);	

	},
	update:function() {		// add game logic

	}
}


//======================
//START GAME: add states
//======================
window.onload = function() {

	var width  = 1000;
	var height = 650;

	//var width  = window.innerWidth;
	//var height = window.innerHeight;

	game = new Phaser.Game(width, height, Phaser.AUTO);

	game.state.add('Preloader', Preloader);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Game', Game);
	game.state.start('Preloader');
}

//out of 'Update' pause state
window.onkeydown = function(event){
	var kdown = event.keyCode || event.which;
	if(kdown === Phaser.Keyboard.P){
		pauseGame();
	}
}

//pause the game
function pauseGame(){
	game.paused ? game.paused = false : game.paused = true;
	if(game.paused){
		//add gray alpha layer to display pause
	} else {
	}
}