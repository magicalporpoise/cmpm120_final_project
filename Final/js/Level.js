// Level.js
// Level object template for phaser
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function Level(tilemap, tileimage, layer){
		//inherit Phaser.State class
	// calling new State
	Phaser.State.call(this);

	this.tilemap = tilemap;
	this.tileimage = tileimage;
	this.layer = layer;

	this.create();
}

//=========
//PROTOTYPE
//=========
Level.prototype = Object.create(Phaser.State.prototype);
Level.prototype.constructor = Level;

Level.prototype.create = function(){

	console.log("in Game Create");
	//activate physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//Pause Screen

	//Add Audio / Music
	this.music1 = game.add.audio('dank');
	this.music2 = game.add.audio('ambient');
	this.counter = 1;
	this.music1.loopFull();
	
	//BG color, gray
	game.stage.backgroundColor = "#AAA";

	//===================
	//TILEMAP: main level
	//===================
	//this is whatever you used for the key when you loaded it in
	map = game.add.tilemap(this.tilemap);

	//add a tileset image to create the map-object(name,key used above when loading image)
	//name has to be the one specified in the json file
	// under tileset in the name category
	map.addTilesetImage(this.tileimage);

	//initiates new layer, must be exact same name as specified in json
	layer1 = map.createLayer(this.layer);
	layer1.resizeWorld();
	//entire grid will have collision set
	map.setCollisionByExclusion([]); //i don't completely understand how this works

	//=============
	//PLAYER OBJECT
	//=============
	//player = new Player(100, 100, 0.15, 'player2');
	player = new Player(100, 100, 0.15, 'teddy');

	//====================================
	//CREATE OBJECTS: from tile map layers
	//====================================
	//walking npcs
	map.createFromObjects('npc',  91, 'redBook', 0, true, true, group_npc, NPC);
	//flying npcs
	map.createFromObjects('flyer', 130, 'blueBook', 0, true, true, group_npc, flyingNPC);
	//creates hiding spots
	map.createFromObjects('hide', 119, 'platform', 0, true, true, group_hidingspot, HidingSpot);
	//make diploma
	//var diploma = new Diploma(game, 500, 500, 'platform', 0);

	//camera follows player
	game.camera.follow(player);
	//insert into game
}