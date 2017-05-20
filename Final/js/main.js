//-----------------------------------------------------------------------
// Phaser: Game World
// 		phaser template for a basic game world
//		use this as the base for a 2-D game project
//-----------------------------------------------------------------------

//create phaser game variable
var game = new Phaser.Game(900, 700, Phaser.AUTO);

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
		game.load.tilemap('Level0','Level0.json',null,Phaser.Tilemap.TILED_JSON);
		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);

		game.load.atlasJSONArray('teddy', 'tb.png', 'tb.json');
		
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
		//console.log('above create');
		player = new Player(100, 100, 0.15, 'teddy');
		//console.log('below create');
		//player = game.add.sprite(0, 100, 'teddy', 'tb_000.png');
		//player.scale.x = 0.3;
		//player.scale.y=0.3;

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

		//supposed to add our npc's in on the object layer but i am not gettin feedback
		map.createFromObjects('npc',  10, 'player',0,true,true, group_npc, NPC);
		console.log(map);

		hidingspot1 = new HidingSpot(1200, 2300, 0.5, 'platform');
		hidingspot2 = new HidingSpot(600, 600, 0.5, 'platform');
		
		game.camera.follow(player); //camera follows player

		console.log(group_npc.children);
	
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
