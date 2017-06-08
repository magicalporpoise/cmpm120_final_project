// Level.js
// Level object template for phaser
//		Written by: Philip Stanley

//===========
//CONSTRUCTOR
//===========
function Level(key, tilemap, tileimage, layer){
	//inherit Phaser.Tilemap class
	// calling new Tilemap
	Phaser.Tilemap.call(this, game);
	this.key = key;
	//console.log(this.key);
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
	game.stage.backgroundColor = "#CCC";

	//===================
	//TILEMAP: main level
	//===================
	//this is whatever you used for the key when you loaded it in
	map = game.add.tilemap(tilemap);

	//add a tileset image to create the map-object(name,key used above when loading image)
	//name has to be the one specified in the json file
	// under tileset in the name category
	map.addTilesetImage(tileimage);

	//initiates new layer, must be exact same name as specified in json
	layer1 = map.createLayer(layer);
	layer1.resizeWorld();
	//entire grid will have collision set
	map.setCollisionByExclusion([]); //i don't completely understand how this works

	//===============
	//MOVE THE PLAYER
	//
	//??? find correct spot!!
	//
	//===============
	player.x = 200;
	player.y = 200;

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
	map.createFromObjects('exit',129,'platform', 0, true, true, group_Diploma, Diploma);
	//var diploma = new Diploma(game, 500, 500, 'platform', 0);
	//console.log(map);
	//camera follows player
	//game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

}

//=========
//PROTOTYPE
//=========
Level.prototype = Object.create(Phaser.Tilemap.prototype);
Level.prototype.constructor = Level;

function deleteMap(map){

	group_npc.removeAll(true);
	group_flyingNPC.removeAll(true);
	group_hidingspot.removeAll(true);
	group_Diploma.removeAll(true);
	group_ViewBox.removeAll(true);

	layer1.destroy();
	map.destroy();
}