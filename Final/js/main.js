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
		//game.load.tilemap('Level0','Level0.json',null,Phaser.Tilemap.TILED_JSON);

		game.load.tilemap('tiletest1','tiletest1.json',null,Phaser.Tilemap.TILED_JSON);	
		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		//game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);
		game.load.spritesheet('bricks3');

		// rasterized images and atlas's 
		game.load.image('sightLine','sightline2.png');
		game.load.image('redSquare','redSquareFill3.png');

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
	var grayScreen;
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
		this.music1 = game.add.audio('dank');
		this.music2 = game.add.audio('ambient');

		//BG color, blue
		game.stage.backgroundColor = "#AAAAAA";

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


		//===================
		//TILEMAP: main level
		//===================


		//this is whatever you used for the key when you loaded it in
		map = game.add.tilemap('tiletest1');

		//add a tileset image to create the map-object(name,key used above when loading image)
		//name has to be the one specified in the json file
		// under tileset in the name category
		map.addTilesetImage('bricks3');

		//initiates new layer, must be exact same name as specified in json
		layer1 = map.createLayer('Tile Layer 1');
		layer1.resizeWorld();

		//entire grid will have collision set
		map.setCollisionByExclusion([]); //i don't completely understand how this works


		//supposed to add our npc's in on the object layer but i am not gettin feedback
		map.createFromObjects('npc',  91, 'redBook',0,true,true, group_npc, NPC);
		console.log(map);

		//game.physics.p2.convertTilemap(map, layer1);
		//=============
		//PLAYER OBJECT
		//=============
		//player = new Player(100, 100, 0.15, 'player2');
		player = new Player(100, 100, 0.15, 'teddy');

		//game.physics.p2.enable([group_npc, player], true);


		//====================================
		//CREATE OBJECTS: from tile map layers
		//====================================
		//walking npcs
		map.createFromObjects('npc',  91, 'redBook', 0, true, true, group_npc, NPC);
		//flying enemy
		flyer = new flyingNPC(game, 200, 100, 'blueBook', 0);
		//hiding spots
		hidingspot1 = new HidingSpot(1200, 2300, 0.5, 'platform');
		hidingspot2 = new HidingSpot(600, 600, 0.5, 'platform');

		//camera follows player
		game.camera.follow(player);

		// gray screen
		grayScreen = game.add.image(game.world.centerX, game.world.centerY, 'blackTile');
		//game.physics.arcade.enable(grayScreen);
		grayScreen.anchor.setTo(0.5);
		grayScreen.width  = game.world.width + 200;
		grayScreen.height = game.world.height + 200;
		console.log(grayScreen);
		grayScreen.alpha = 0;
		//print groups to confirm proper creation
		//console.log(group_npc.children);

		//debug text
		displayText = game.add.text(player.x, player.y-100, 'Health/Imagination:', { fontSize: '32px', fill: '#F00'});
	
	},
	update:function() {		// add game logic
		displayText.text = "Health/Imagination: " + player.hearts;
		displayText.x = player.x- 100;
		displayText.y = player.y - 100;

		grayScreen.x = game.world.centerX;
		grayScreen.y = game.world.centerY;
		// some logic is handled within other objects
		//game.debug.body(player);
		//game.debug.body(npc);

		//if (player.hearts<=0) {
			//ALSO KILL THE PLAYER
			//STOP ALL INPUT
			grayScreen.alpha = (10 - player.hearts) / 10;

			if(grayScreen.alpha > 0.90){
				//CHANGE TO END GAME STATE
			}
	    //}

	    //music stuff
	    this.music1turn = false;
	    this.music2turn = true;
	    if(!this.music1.isPlaying && !this.music2.isPlaying){
	    	if(this.music1turn){
	    		this.music1turn == false;
	    		this.music2turn == true;
	    		this.music2.play();
	    	}else if(this.music2turn){
	    		this.music2turn == false;
	    		this.music1turn == true;
	    		this.music1.play();
	    	}
	    }
	}
	    
}



//======================
//START GAME: add states
//======================
window.onload = function() {
	var width  = 800;
	var height = 600;
	game = new Phaser.Game(width, height, Phaser.AUTO);

	game.state.add('Preloader', Preloader);
	game.state.add('MainMenu', MainMenu);
	//game.state.add('Lose', Lose);
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