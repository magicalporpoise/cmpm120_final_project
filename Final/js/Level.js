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
	game.physics.setBoundsToWorld();
	
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
	map.addTilesetImage(tileimage[0]);
	map.addTilesetImage(tileimage[1]);

	//initiates new layer, must be exact same name as specified in json
	layer1 = map.createLayer(layer[0]);
	layer2 = map.createLayer(layer[1]);
	//layer3 = map.createLayer(layer[2]);
	//layer4 = map.createLayer(layer[3]);
	layer1.resizeWorld();
	//entire grid will have collision set
	map.setCollisionByExclusion([]);
	//map.setCollisionBetween(178,195, true);
	//map.setCollisionBetween(1341,1344);
	console.log(map);

	//===============
	//MOVE THE PLAYER
	//===============
	player.x = 300;
	player.y = 300;

	//====================================
	//CREATE OBJECTS: from tile map layers
	//====================================
	//walking npcs
	map.createFromObjects('npc',  91, 'redBook', 0, true, true, group_npc, NPC);
	//flying npcs
	map.createFromObjects('flyer', 130, 'blueBook', 0, true, true, group_npc, flyingNPC);

	//creates hiding spots
	map.createFromObjects('hide', 119, 'chair', 0, true, true, group_hidingspot, HidingSpot);

	//make diploma
	map.createFromObjects('exit',129,'diploma', 0, true, true, group_Diploma, Diploma);
	//var diploma = new Diploma(game, 500, 500, 'platform', 0);

	//make floor death
	map.createFromObjects('death' ,121,'killableSubstance', 0, true, true, group_danger, killableSubstance);

	//insert SPEAKERS
	//map.createFromObjects('words', XXX, 'chalkboard', 0, true, true, group_speaker, speaker);
	//insertAllText(currentLevel, group_speaker);

	game.world.bringToTop(group_speaker);
	game.world.bringToTop(group_npc);
	game.world.bringToTop(group_Emitter);
	player.bringToTop();
}

//=========
//PROTOTYPE
//=========
Level.prototype = Object.create(Phaser.Tilemap.prototype);
Level.prototype.constructor = Level;

function deleteMap(map){

	group_npc.removeAll(true);
	group_hidingspot.removeAll(true);
	group_Diploma.removeAll(true);
	group_ViewBox.removeAll(true);
	group_danger.removeAll(true);
	group_speaker.removeAll(true);

	layer1.destroy();
	if(layer2 != undefined)layer2.destroy();
	map.destroy();
}