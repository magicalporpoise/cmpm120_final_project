//=================
//CHALKBAORD
//=================

//Literally contains all the text we'll need
var TEACHER = new Array();
for(var i = 0 ; i < 5 ; i++){
	TEACHER[i] = new Array();
}

//an 2-D array of text
TEACHER[0]= ["aergrgeg", "awegwegweg", "aweggwegwg"]

//insert the text into the needed children
function insertAllText(lvl, grp){
	console.log("level is: " + lvl);
	let numbAlive = grp.countLiving();
	var j = 0;
	var child;
	for(var i = 0 ; i < numbAlive ; i+=2){
		console.log(i);
		child = grp.getChildAt(i);
		console.log(child);
		console.log("the text to insert: "+  TEACHER[lvl][j]);
		child.announcement.fullText = TEACHER[lvl][j];
		console.log(child.announcement.fullText);
		j++;
	}

}


//=============
//SHIT TEACHERS SAY
//	the enemies will say one of these things when they are aggro'd
//=============
var EQ = ["Due on Monday!", "I don't belive\nin extra credit.", 
		  "3 absences and\nyou fail the class.", "You can't start\nthis assignment\nthe day before!", 
		  "Wikipedia isn't a source!", "I don't accept late work!", 
		  "I'm assigning\nweekend homework!", "College professors won't\nbe this lenient.", 
		  "We're preparing you\nfor college!", "Do you have \nsomething you want\nto say to the class?", 
		  "Attendance is mandatory!", "Open your books\nto page 394.", "You will need this\nin the future.", 
		  "I won't provide\na study guide.", "You need to\nlearn cursive.", 
		  "I didn't tell you\nto pack up yet!", "I excuse you!\nNot the bell!",
		  "THE MITOCHONDRIA\nIS THE POWEHOUSE\nOF THE CELL"];
