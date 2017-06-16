//=================
//CHALKBAORD
//=================

//Literally contains all the text we'll need
var TEACHER = new Array();
for(var i = 0 ; i < 6 ; i++){
	TEACHER[i] = new Array();
}

//an 2-D array of text
//---------   NUMBER OF SPEAKERS PER LEVEL
// --------   7: intro (white)
TEACHER[0]= ["Good morning, stu[D]ent! It's the\nstart of a beautiful d[A]y.",
			 "Make your [W]ay to your desk chair\nand take a [S]eat.", 
			 "As long as you remain in your seat, child,\n...and there will be no consequences\nRemain [K]alm and be respectful of\nthe wonderful instructional material.",
			 "[D]o NOT neglect your school[W]ork,\nor it'll come back to bite you!",
			 "No matter [W]hen, [W]here, or [W]hy,\nclimbing is STRICTLY prohibited.",
			 "If you are [L]ost, a hall monitor will\nhappily escort you to your seat.",
			 "[J]ust pay attention and\nyou'll do great!"
			 ];
// --------   4 elementary (bricks 1)
TEACHER[1]= ["Come, young one. Put one foot\nin front of the other!",
			 "Shoot for the moon! Even if you miss,\nyou'll land among the stars.",
			 "Your enthusiasm is admirable... but\n *please* don't run in my halls.",
			 "Oh, I'm so *very* proud of you..."];
// --------   4 middle (bricks 2)
TEACHER[2]= ["Welcome back. Please get to work.",
			 "You are far too slow. Maybe I\nshould have held you back.",
			 "I had such *high* hopes for you...",
			 "Well, at least you've\nlearned something."
			 ];
// --------   0: transition
TEACHER[3]= [];
// --------   5: pipes
TEACHER[4]= ["You shouldn't be here...", 
			 "You're not smart enough!\nYou're not good enough!", 
			 "You should consider\nanother caree path,", 
			 "Is that really what you\nwant to do with your life?",
			 "Congratulations... You've reached the end,\n here's your reward."];
// --------   1: final
TEACHER[1]= ["Are you happy? Do you feel like you did you best?\n\nToo bad it doesn't matter:\nWe have drained your entire being...\nWe have taken away your everything...\n\n\nand We didn't give you a damn thing for it."]


//insert the text into the needed children
function insertAllText(lvl, grp){
	console.log("level is: " + lvl);
	let numbAlive = grp.countLiving();
	var j = 0;
	var child;
	for(var i = 0 ; i < numbAlive ; i+=2){
		//console.log(i);
		child = grp.getChildAt(i);
		//console.log(child);
		//console.log("the text to insert: "+  TEACHER[lvl][j]);
		child.announcement.fullText = TEACHER[lvl][j];
		//console.log(child.announcement.fullText);
		j++;
	}

}


//=============
//SHIT TEACHERS SAY
//	the enemies will say one of these things when they are aggro'd
//=============
var EQ = ["Due on Monday!", "I don't believe\nin extra credit.", 
		  "3 absences and\nyou fail the class.", "You can't start\nthis assignment\nthe day before!", 
		  "Wikipedia isn't a source!", "I don't accept late work!", 
		  "I'm assigning\nweekend homework!", 
		  "Do you have \nsomething you want\nto say to the class?", 
		  "Open your books\nto page 394.", "You will need this\nin the future.", 
		  "I won't provide\na study guide.", "You need to\nlearn cursive.", 
		  "I didn't tell you\nto pack up yet!", "I excuse you!\nNot the bell!",
		  "THE MITOCHONDRIA\nIS THE POWERHOUSE\nOF THE CELL", "The opposite of\nlowercase 'b', plus\nor minus the...",
		  ];
