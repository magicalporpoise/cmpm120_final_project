//-----------------------------------------------------------------------
// Phaser: Game World
// 		phaser template for a basic game world
//		use this as the base for a 2-D game project
//-----------------------------------------------------------------------

//create phaser game variable
var game;
var pauseScreen;
var music1;
var music2; 
var musicCounter = 0;
var musicMenu;
var shouldPlayMenu = true;
var shouldPlaySpike = true;
var	spikeSFX;
var bellSFX;
//================================================
//PRELOAD: 
//	load main art assets and move to the main menu
//================================================
var Preloader = function(game) {};
Preloader.prototype = {
	preload: function() {
		console.log("In Preloader: preload");
		
		//LOAD MUSIC
		game.load.path = 'assets/audio/music/';
		game.load.audio('ambient', 'Detention_second.wav');
		game.load.audio('dank','Detention_creepy.mp3');
		game.load.audio('menu', 'Detention_menu.wav');

		//LOAD SFX
		game.load.path = 'assets/audio/sfx/';
		game.load.audio('growl', 'growl.wav');
		game.load.audio('step', 'footstep.mp3');
		game.load.audio('NPCHit', 'player_smack.wav')
		game.load.audio('playerDeathSFX', 'player_death.wav');
		game.load.audio('hideNoise', 'chairNoise.wav');
		game.load.audio('laser', 'laser.wav');
		game.load.audio('spike', 'SpikeTheme.wav');
		game.load.audio('bell', 'bell.wav');
		game.load.path = 'assets/audio/sfx/player_attacks/';
		game.load.audio('player_attack1', 'player_attack1.wav');
		game.load.audio('player_attack2', 'player_attack2.wav');
		game.load.audio('player_attack3', 'player_attack3.wav');
		game.load.path = 'assets/audio/sfx/enemy_attacks/';
		game.load.audio('enemy_attack', 'jakesux.wav');

		//LOAD ART ASSETS
		game.load.path = "assets/img/";
		//game.load.spritesheet('player', 'stb-Sheet.png', 32, 50);	

		game.load.image('platform', 'black_tile.png');
		game.load.image('blackTile', 'black_tile.png');
		game.load.image('diploma', 'diploma.png');
		game.load.image('happyTeddy', 'happyTeddyBear1.png');
		game.load.image('sadkid', 'sadkid.png');
		game.load.image('-1', 'minusOne.png');


		//loads in json tilemap created with tiled(key,filename,
		//not exactly sure why null works here,the tilemap tool used)
		game.load.tilemap('tiletest1','tiletest1.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('elementary_tileset', 'elementary_tileset.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('middleschool','middleschool.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('dopeislands','dopeislands.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('elementary','elementary.json',null,Phaser.Tilemap.TILED_JSON);

		//game.load.tilemap('supaIntenseTest','supaIntenseTest.json',null,Phaser.Tilemap.TILED_JSON);
		//game.load.tilemap('testingLRI','testingLRI.json',null,Phaser.Tilemap.TILED_JSON);
		//game.load.tilemap('twoSmallerIslands','twoSmallerIslands.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('testingIslandsMinimized2','testingIslandsMinimized2.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('testingPipesMinimized','testingPipesMinimized.json',null,Phaser.Tilemap.TILED_JSON);

		game.load.tilemap('testingSI','testingSI.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('medIslandTest','medIslandTest.json',null,Phaser.Tilemap.TILED_JSON);



		game.load.tilemap('elewopipes','elewopipes.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('transo','transo.json',null,Phaser.Tilemap.TILED_JSON);


		//game.load.tilemap('noImaginationLand','new_last_level.json',null,Phaser.Tilemap.TILED_JSON);

		//loads the image used in tiled to create the map(key, filename,32x32)
		//the key can actually be called anything as well
		//game.load.spritesheet('tilesheet','dirt-tiles.png',32,32);
		game.load.spritesheet('bricks3');
		game.load.spritesheet('cloudy');
		game.load.spritesheet('last_level');
		game.load.spritesheet('pipesNew');
		game.load.spritesheet('supaIntense');
		game.load.spritesheet('lowResIntense');
		game.load.spritesheet('smallerIslands1');
		game.load.spritesheet('smallerIslands2');
		game.load.spritesheet('islandsMinimized');
		game.load.spritesheet('pipesMinimized');
		game.load.spritesheet('small_islands');
		game.load.spritesheet('med_islands');


		// vectorized images
		//game.load.image('bigcloud','coloredCloud.png');
		//game.load.image('bigcloud2','coloredCloud2.png');
		game.load.image('bigcloud3','coloredCloud2.png');
		game.load.image('darkcloud','darkCloud.png');
		//game.load.image('smallcloud','cloud5_white.png');

		// rasterized images and atlas's 
		game.load.image('chalkboard','chalkboard.png');		
		game.load.image('chair','chair.png');
		game.load.image('desk','desk.png');
		game.load.image('killableSubstance','killableSubstance.png');
		game.load.image('sightLine','sightLine_simple.png');
		game.load.image('boom','newBoom2.png');
		game.load.image('speaker','speaker.png')
		//game.load.image('redSquare','redSquareFill3.png');

		game.load.atlasJSONArray('teddy', 'newTeddy_everything.png', 'newTeddy_everything.json');
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

//=========================================
//MAINMENU: 
//	wait for player input to begin the game
//=========================================

var MainMenu = function(game) {
	//Needed text
	var title;
	var controls;
	var introTeddy;
	var extraText;

	
};
MainMenu.prototype = {
	preload:function(){
		console.log("MainMenu: preload");
	},
	create: function() {
		console.log("MainMenu: create");
		
		//title name
		music1 = game.add.audio('dank');
		music2 = game.add.audio('ambient');
		
		if(shouldPlayMenu){
			musicMenu = game.add.audio('menu');
			musicMenu.play();
			musicMenu.volume = .7;
			shouldPlayMenu = false;
		}
		
		
		title = game.add.text(1400/2, 750/8,
						'DETENTION', 
						{ font: 'Source Code Pro', fontSize: '64px', fill: '#FFF', fontWeight: 'bold', align: 'center' });
		title.anchor.set(0.5);
		//teddy image
		introTeddy = game.add.image(1000, 300, 'happyTeddy');
		introTeddy.scale.x = 5;
		introTeddy.scale.y = 5;
		//give main menu instructions
		controls = game.add.text(16, 750/4,
						"                     Your Imagination is Precious:\n-----------------------------------------------------------------------------\nWASD to MOVE\nSit down in seats to avoid angry books\nJ to throw a STUN BALL\nK to throw a STUN PUNCH\nL to become INVISIBLE\nP to Pause\n\n press SPACE to continue...", 
						{ font: 'Source Code Pro', fontSize: '32px', fill: '#FFF' });

		extraText = game.add.text(100, 650,
						'L for more Lore :: C for Credits', 
						{ font: 'Source Code Pro', fontSize: '16px', fill: '#FFF', fontWeight: 'bold', align: 'center' });

	},
	update: function(){
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			//add loading text
			game.add.text(650, 3*750/4, "LOADING...", { font: 'Source Code Pro', fontSize: '64px', fill: '#FFF' });
			musicMenu.stop();
			game.state.start('Game');
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.L)){
			//go to next state
			game.state.start('Lore');
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.C)){
			//go to next state
			game.state.start('Credits');
		}
	}
}

//==============================
//GAME: 
//	set up assets, play the game
//==============================
var currentLevel;
var currentMap;
var Game = function(game) {
	var player;
	var imagination;
	var tilemap;
	var grayScreen;
	var blob;

	var spikeSFX;
	var shouldPlaySpike = true;
	
	var playerDeathSFX;
}

Game.prototype = {

	preload: function(){
		console.log("in Game Preloader");
		if(currentLevel === undefined) currentLevel = 0;
	},
	create: function() {
		//Major Groups for Collision checks
		console.log('creating game');
		musicMenu.stop();

		//pause screen
		pauseScreen = game.add.image(0, 0, 'blackTile');
		pauseScreen.width = game.world.width + 100;
		pauseScreen.height = game.world.height + 100;
		pauseScreen.alpha = 0;

		//CREATE GAME GROUPS
		group_ViewBox = game.add.group();
		group_npc = game.add.group();
		group_hidingspot = game.add.group();
		group_projectile1 = game.add.group();
		group_Diploma = game.add.group();
		group_danger = game.add.group();
		group_Emitter = game.add.group();
		group_speaker = game.add.group();
		group_text = game.add.group();


		spikeSFX = game.add.audio('spike');
		bellSFX = game.add.audio('bell');
		bellSFX.volume = .2;
		playerDeathSFX = game.add.audio('playerDeathSFX')
		playerDeathSFX.volume = 3;
		

		//=============
		//PLAYER OBJECT
		//CURRENT MAP
		//=============


		

		player = new Player(150, 100, 0.15, 'teddy');
		imagination = new cloud(0, 0, 0.5, 'bigcloud3');

		//test = new NPC(game, 800, 1400, 'redBook', 0);

		currentMap = new Level('t', 'tiletest1', ['cloudy','bricks3'], ['Tile Layer 1','Tile Layer 2']);
	},
	update:function() {		// add game logic
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		pauseScreen.x = game.camera.x-50;
		pauseScreen.y = game.camera.y-50;

		//console.log(currentMap);
		if(currentLevel == 1 && currentMap.key != 'e') {
			deleteMap(currentMap);

			// DOPE PIPE LEVEL
			//currentMap = new Level('e', 'testingPipesMinimized', ['pipesMinimized','bricks3'], ['Tile Layer 1','Tile Layer 2']);
			
			//currentMap = new Level('e', 'testingIslandsMinimized2', ['islandsMinimized','bricks3'], ['Tile Layer 1','Tile Layer 2']);
			//currentMap = new Level('e', 'elewopipes', ['bricks3', 'pipesNew'], ['Tile Layer 1','Tile Layer 2']);


			currentMap = new Level('e', 'elewopipes', ['bricks3','cloudy'], ['Tile Layer 1','Tile Layer 2']);


		} else if(currentLevel == 2 && currentMap.key != 'm') {
			deleteMap(currentMap);
			currentMap = new Level('m', 'middleschool', ['bricks3', 'cloudy'], ['Tile Layer 1','Tile Layer 2']);

		} else if(currentLevel == 3 && currentMap.key != 'tr') {
			deleteMap(currentMap);
			currentMap = new Level('tr', 'transo', ['bricks3', 'pipesMinimized'], ['Tile Layer 1','Tile Layer 2']);
		}else if(currentLevel == 4 && currentMap.key != 'p') {
			deleteMap(currentMap);
			currentMap = new Level('p', 'testingPipesMinimized', ['pipesMinimized'], ['Tile Layer 1']);
		} else if(currentLevel == 5 && currentMap.key != 'f') {
			deleteMap(currentMap);
			currentMap = new Level('f', 'medIslandTest', ['med_islands'], ['Tile Layer 1']);
		}else if(currentLevel > 5){
			deleteMap(currentMap);
			game.state.start('GameOver');
		}

		
		//PLAYER DEATH
		if(player.hearts <= 0 || player.isDead){
			deleteMap(currentMap);
			
			playerDeathSFX.play();
			musicCounter++;
			game.state.start('GameOver');
		}

		if(!music1.isPlaying && !music2.isPlaying){
			if(musicCounter%2 == 0){
				music1.play();
				

			}else{
				music2.play();
				

			}
			musicCounter++;
		}
		if(music1.isPlaying && music2.isPlaying){
			music1.stop();
			music2.stop();
		}
	}
}

//========
//GAMEOVER
//	state
//========
var GameOver = function(game) {
	var endText;
}
GameOver.prototype = {
	create:function(){
		console.log("ending game.....");
		shouldPlayMenu = true;
		musicCounter++;
		currentLevel = 0;
		//set the player's grade
		game.stage.backgroundColor = "#000";
		let finalScore = player.hearts  + "/" + player.maxHearts;
		let g = player.hearts;
		grade = (g < 60 ? "F" : (g < 70 ? "D" : (g < 80 ?  "C" : (g < 90 ? "B" : "A" ))));

		endText = game.add.text(350, 325,
				(""  + finalScore + " -- " + grade + "\n\n\npress [SPACE] to try again...\n[M] to go back to the MainMenu..."), 
				{ fontSize: '56px', fill: '#FFF' });
	},
	update:function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('Game');
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.M)){
			//go to next state
			music1.stop();
			music2.stop();
			
			game.state.start('MainMenu');
		}
	}
}

//===================
//BACKGROUND AND LORE
//	state
//===================
var Lore = function(game) {
	var loreText;
}
Lore.prototype = {
	create:function(){
		console.log("Entering Game Lore");
		var txt = "Imagination! who can sing thy force?\nOr who describe the swiftness of thy course?\nSoaring through air to find the bright abode,\nTh' empyreal palace of the thund'ring God,\nWe on thy pinions can surpass the wind,\nAnd leave the rolling universe behind----\n                    ERNEST, PAY ATTENTION!\n                    YOU HAVE TO PAY ATTENTION IN CLASS\n----From star to star the mental optics rove,\nMeasure the skies, and range the realms above----\n                    I SAID PAY ATTENTION!\nBut I like using my imagination.\n                    DID I SAY YOU COULD DO THAT?\nI just want to think for myself!\n                    THAT'S IT, YOU HAVE DETENTION!";
		loreText = new ScrollText(game, 100, 100, txt, { fontSize: '20px', fill: '#FFF', font: 'Sans Serif'});
		loreText.speed = 1;
		loreText.active = true;

		//add some images! 
		game.add.image(1000, 325, 'sadkid');
	},
	update:function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)||game.input.keyboard.justPressed(Phaser.Keyboard.L)){
			//go to next state
			game.state.start('MainMenu');
		}
	}
}


//========================
//CREDITS AND CONTRIBUTORS
//	state
//========================
var Credits = function(game) {
	var creditText;
}
Credits.prototype = {
	create:function(){
		console.log("Entering Credits");
		creditText = game.add.text(700, 375,
				("Jacob Darby - composer and writer\nJake Shapiro - artist and programmer\nPhilip Stanley - programmer and quality assurance\nTristan Clark - level designer\n\n\n\n\n\n\nspecial thanks to Luka Dowell - literature contributions\nPoem by Phillis Wheatley"), 
				{ font:'Sans Serif', fontSize: '32px', fill: '#FFF', align: 'center' });
		creditText.anchor.set(0.5);
	},
	update:function(){
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)||game.input.keyboard.justPressed(Phaser.Keyboard.C)){
			//go to next state
			game.state.start('MainMenu');
		}
	}
}


//======================
//START GAME: add states
//======================
window.onload = function() {

	var width  = 1400;
	var height = 750;

	//var width  = window.innerWidth;
	//var height = window.innerHeight;

	game = new Phaser.Game(width, height, Phaser.AUTO);

	game.state.add('Preloader', Preloader);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Game', Game);
	game.state.add('GameOver', GameOver);
	game.state.add('Lore', Lore);
	game.state.add('Credits', Credits);
	game.state.start('Preloader');
}

//out of 'Update' pause state
window.onkeydown = function(event){
	var kdown = event.keyCode || event.which;
	if(kdown === Phaser.Keyboard.P){
		pauseGame();
	}
	//LEVEL SKIP
	//if(kdown === Phaser.Keyboard.X){
	//	currentLevel++;
	//}
}

//pause the game
function pauseGame(){
	game.paused = !game.paused;
	pauseScreen.bringToTop();
	if(game.paused){
		pauseScreen.alpha = 0.75;
	} else {
		pauseScreen.alpha = 0;
	}
}

