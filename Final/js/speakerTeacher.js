//Literally contains all the text we'll need
var TEACHER = new Array();
for(var i = 0 ; i < 5 ; i++){
	TEACHER[i] = new Array();
}

//an 2-D array of text
TEACHER[0][0] ="SOME TEXT";
TEACHER[0][1] = "DIFFERENT TEXT";
TEACHER[0][2] = "DIFFERENT TEXT2";
TEACHER[0][3] = "DIFFERENT TEXT3";
TEACHER[0][4] = "DIFFERENT TEXT4";
TEACHER[0][5] = "DIFFERENT TEXT5";
TEACHER[0][6] = "DIFFERENT TEXT6";
TEACHER[0][7] = "DIFFERENT TEXT7";
TEACHER[0][8] = "DIFFERENT TEXT8";
TEACHER[0][9] = "DIFFERENT TEXT9";
TEACHER[0][10] = "DIFFERENT TEXT10";
TEACHER[0][12] = "DIFFERENT TEXT11";

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