//-----------------------------------------------------------------------
// Phaser: Game World
// 		phaser template for a basic game world
//		use this as the base for a 2-D game project
// 		Written by: Philip Stanley
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
		//game.load.tilemap('Level0','Level0.json',null,Phaser.Tilemap.TILED_JSON);

		game.load.tilemap('tiletest1','tiletest1.json',null,Phaser.Tilemap.TILED_JSON);	
		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		//game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);
		game.load.spritesheet('bricks2');

		
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
}

Game.prototype = {
	preload: function(){
		console.log("in Game Preloader");
	},
	create: function() {
		console.log("in Game Create");
		//activate physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
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

		//add music
		this.music = game.add.audio('ambient');
		this.music.loopFull();

		//BG color, blue
		game.stage.backgroundColor = "#AAAAAA";
		// the official player object
		player = new Player(100, 100, 0.15, 'player2');

		//create any npc objects
		//npc = new NPC(580,500,2,'player', group_ViewBox); //adding in npc's like this 
		//npc2 = new NPC(1000,1000,2,'player',group_ViewBox); //will have to be a temp fix
		//npc3 = new NPC(50,1200,2,'player',group_ViewBox);
		//npc4 = new NPC(3000,50,2,'player',group_ViewBox);
		//npc5 = new NPC(4000,2000,2,'player',group_ViewBox);
		//npc6 = new NPC(200,2000,2,'player',group_ViewBox);
		//npc7 = new NPC(1200,1500,2,'player',group_ViewBox);
		//npc8 = new NPC(2000,2200,2,'player',group_ViewBox);
		//npc9 = new NPC(2200,2200,2,'player',group_ViewBox);
		//npc10 = new NPC(2400,2200,2,'player',group_ViewBox);

		//this is whatever you used for the key when you loaded it in
		//map = game.add.tilemap('Level0');
		map = game.add.tilemap('tiletest1');

		//add a tileset image to create the map-object(name,key used above when loading image)
		//name has to be the one specified in the json file
		// under tileset in the name category
		//map.addTilesetImage('Level0_tilesheet','tilesheet');
		map.addTilesetImage('bricks2');

		//initiates new layer, must be exact same name as specified in json
		layer1 = map.createLayer('Tile Layer 1');
		layer1.resizeWorld();
		//layer1.scale.x = .5;
		//layer1.scale.y = .5;

		//Phaser.Canvas.setSmoothingEnabled(this.game.context, false);

		//entire grid will have collision set
		map.setCollisionByExclusion([]); //i don't completely understand how this works


		//supposed to add our npc's in on the object layer but i am not gettin feedback
		map.createFromObjects('npc',  10, 'player',0,true,true, group_npc, NPC);
		console.log(map);

		hidingspot1 = new HidingSpot(1200, 2300, 0.5, 'platform');
		hidingspot2 = new HidingSpot(600, 600, 0.5, 'platform');
		
		game.camera.follow(player); //camera follows player

		console.log(group_npc.children);

		displayText = game.add.text(player.x, player.y-100, 'Player Hearts:', { fontSize: '32px', fill: '#F00'});
	
	},
	update:function() {		// add game logic
		displayText.text = "Player Hearts: " + player.hearts;
		displayText.x = player.x- 100;
		displayText.y = player.y - 100;
		// some logic is handled within other objects
	}
}



//Add the states to the game and start up.
//	additional logic can be used to traverse states
window.onload = function() {
	var width  = 800;
	var height = 600;
	game = new Phaser.Game(width, height, Phaser.AUTO);

	game.state.add('Preloader', Preloader);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Game', Game);
	game.state.start('Preloader');
}

window.onkeydown = function(event){
	var kdown = event.keyCode || event.which;
	if(kdown === Phaser.Keyboard.P){
		pauseGame();
	}
}

function pauseGame(){
	game.paused ? game.paused = false : game.paused = true;

	if(game.paused){
		//add gray alpha layer to display pause
	} else {
	}
}