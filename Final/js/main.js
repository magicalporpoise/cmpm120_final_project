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
		game.load.path = 'assets/audio/music/level1/';
		game.load.audio('ambient', 'ambient.mp3');

		game.load.path = 'assets/audio/music/'
		game.load.audio('dank','Detention_creepy.mp3')

		//LOAD SFX
		game.load.path = 'assets/audio/sfx/';
		game.load.audio('growl', 'growl.wav');
		game.load.audio('step', 'footstep.mp3');

		//LOAD ART ASSETS
		game.load.path = "assets/img/";
		game.load.spritesheet('player', 'stb-Sheet.png', 32, 50);
		// test
		game.load.spritesheet('player2', 'teddy_colored.png', 630, 900);		

		game.load.image('platform', 'platform.png');
		game.load.image('flame', 'flameParticle.png');
		//loads in json tilemap created with tiled(key,filename,
		//not exactly sure why null works here,the tilemap tool used)
		game.load.tilemap('Level0','Level0.json',null,Phaser.Tilemap.TILED_JSON);
		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);


		game.load.image('sightLine','sightline2.png');

		game.load.atlasJSONArray('teddy', 'tb.png', 'tb.json');
		game.load.atlasJSONArray('redBook', 'redBook.png', 'redBook.json');
		game.load.atlasJSONArray('blueBook', 'blueBookSheet.png', 'blueBookSheet.json');
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
	var player;
	var npc;
	var tilemap;

	//declare timers
	var behave;
	var stunTimer;
	var atkTimer;
}

Game.prototype = {
	preload: function(){
		console.log("in Game Preloader");
	},
	create: function() {
		console.log("in Game Create");
		//activate physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.startSystem(Phaser.Physics.P2JS);
		//game.physics.p2.gravity.y = 1000;
		//Pause Screen
		/*
		pauseScreen = game.add.graphics(0, 0);
		pauseScreen.beginFill(0x000, 0.5);
		pauseScreen.drawRect(0, 0, game.width, game.height);
		pauseScreen.endFill();
		*/
		//window.graphics = graphics;

		

		//Major Groups for Collision checks
		group_ViewBox = game.add.group();
		group_npc = game.add.group();
		group_npc.enableBody = true;



		//Add Audio / Music
		this.music = game.add.audio('dank');
		this.music.loopFull();

		//BG color, blue
		game.stage.backgroundColor = "#AAAAAA";

		//=============
		//PLAYER OBJECT
		//=============
		//player = new Player(100, 100, 0.15, 'player2');
		player = new Player(100, 100, 0.15, 'teddy');

		//game.physics.p2.enable([group_npc, player], true);

		//======
		//TIMERS for NPCs
		//======
		behave = game.time.create(false);
		stunTimer = game.time.create(false);
		atkTimer = game.time.create(false);


		//===================
		//TILEMAP: main level
		//===================
			//this is whatever you used for the key when you loaded it in
			map = game.add.tilemap('Level0');

			//add a tileset image to create the map-object(name,key used above when loading image)
			//name has to be the one specified in the json file
			// under tileset in the name category
			map.addTilesetImage('Level0_tilesheet','tilesheet');

			//initiates new layer, must be exact same name as specified in json
			layer1 = map.createLayer ('Tile Layer 1');

			//entire grid will have collision set
			map.setCollisionByExclusion([]); //i don't completely understand how this works

			//fits layer to the game world
			layer1.resizeWorld();
			//game.physics.p2.convertTilemap(map, layer1);

			//====================================
			//CREATE OBJECTS: from tile map layers
			//====================================
			//timing information above
			//walking npcs
			map.createFromObjects('npc',  10, 'redBook', 0, true, true, group_npc, NPC);
			//flying npc
			//flyer = new flyingNPC(game, 300, 100, 'flame', 0);
			//hiding spots
			hidingspot1 = new HidingSpot(1200, 2300, 0.5, 'platform');
			hidingspot2 = new HidingSpot(600, 600, 0.5, 'platform');

		console.log(map);

		//camera follows player
		game.camera.follow(player);

		//print groups to confirm proper creation
		console.log(group_npc.children);

		//START TIMERS
		behave.start();
		stunTimer.start();
		atkTimer.start();

		//debug text
		displayText = game.add.text(player.x, player.y-100, 'Player Hearts:', { fontSize: '32px', fill: '#F00'});
	
	},
	update:function() {		// add game logic
		displayText.text = "Player Hearts: " + player.hearts;
		displayText.x = player.x- 100;
		displayText.y = player.y - 100;
		// some logic is handled within other objects
		game.debug.body(player);
		//game.debug.body(npc);
	}
}



//======================
//START GAME: add states
//======================
window.onload = function() {
	var width  = 900;
	var height = 700;
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