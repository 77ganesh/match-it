var quizOptions;
var puzzleData = {};
var score;
var questionNo;


var playState = {

	create: function () {
		score = 0;
		questionNo = 0;
		var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'bg');
		bg.anchor.set(0.5);
        bg.tint = 0xa3f7fc;
        
		var titleText = game.add.text(game.world.centerX, 50, "Match it!", { font: "bold 60px Arial", fill: "#000000" });
        titleText.anchor.setTo(0.5, 0.5);

		var bottomText = game.add.text(game.world.centerX, 1050, "Source: Wikipedia, National Geography", { font: "10px Arial", fill: "#000000" });
		bottomText.anchor.setTo(0.5);
        
        // us = game.add.sprite(game.world.centerX, game.world.centerY, 'us');
        // ind = game.add.sprite(game.world.centerX, game.world.centerY, 'in');
        // cn = game.add.sprite(game.world.centerX, game.world.centerY, 'cn');
        // ie = game.add.sprite(game.world.centerX, game.world.centerY, 'ie');
        // this.scaleFlags(1.3);

        var flag = game.add.sprite(10, 100, 'flag');
        flag.scale.set(0.7);

        puzzleData = game.cache.getJSON('gameData');

        quizOptions = this.initQuestions();
        

        var paperY = 120;
        var textSize = 25;
        for (var i=0; i<5; i++, paperY += 130) {
            t = game.add.sprite(890, paperY, 'paper');
            t.tint = 0xfdf969;
            t.anchor.set(0.5);
            var tOption = quizOptions[i].option;
            var tText1 = tOption.substring(0,tOption.indexOf(' '));
            var tArr = tOption.split(' ');
            if(tText1.length < 10) {
            	tText1 = tArr.slice(0,2).join(' ');
            	tText2 = tArr.slice(2).join(' ');
            }
            else 
            	var tText2 = tOption.substring(tOption.indexOf(' ')+1);
           	

            var text1 = game.add.text(0, 0, tText1, {font: "bold "+textSize+"px Arial", fill: "#000000" });
            var text2 = game.add.text(0, 0, tText2, {font: "bold "+textSize+"px Arial", fill: "#000000" });
            text1.scale.setTo(1/0.5, 1/0.3);
            text1.anchor.setTo(0.5,0.8);
            text2.scale.setTo(1/0.5, 1/0.3);
            text2.anchor.setTo(0.5,0);
            t.addChild(text1);
            t.addChild(text2);
            t.inputEnabled = true;
            t.input.enableDrag();
            t.scale.setTo(0.47,0.3);
            t.myAnswer = quizOptions[i].answer;
            t.events.onDragStop.add(this.onDragStop, this, 0, quizOptions[i].answer);
        }

	},

	onDragStop: function(sprite) {
       if( this.anyOverlap(sprite))
       		this.checkAndEvaluate(sprite);
	},

	checkAndEvaluate: function(sprite) {
		var res = this.checkIntersection(sprite.getBounds(), sprite.myAnswer);
	 	// sprite.destroy();

	 	var answerArr = ["india", "china", "ireland", "us"];

		if(res) {
			score++;
			this.showCorrect();
			this.addScoreStar();
		}
		else {
			this.showWrong();
			console.log(answerArr[sprite.myAnswer]);
		}
		questionNo++;
		game.state.states['end'].score = score;
		if(questionNo == 5)
			game.time.events.add(1000, function() { game.state.start("end"); });
	},

	addScoreStar: function() {
		if(score == 1) {
			var scoreText = game.add.text(150, 670, "Score: ", { font: "bold 40px Courier", fill: "#000000" });
        	scoreText.anchor.set(0.5);
		}
		var star = game.add.sprite(250 + (score-1)*70,760, 'star');
		game.add.tween(star).to( { y: 660 }, 1000, Phaser.Easing.Bounce.Out, true);
        star.anchor.set(0.5);
        star.scale.set(0.1);
	},

	// Some really crappy hardcoded numbers here :P 
	checkIntersection: function(bound1, answer) {
		// check if bound1 inside bound2
		var bound2 = {};
		// in,cn,ie,us - 0,1,2,3
		var flag = false;
		// console.log(bound1);

		/*switch(answer) {
			case 1:
				// China
				if ( 
					(bound1.x > -70)
					&& (bound1.x < 210)
					&& (bound1.y > 55)
					&& (bound1.y < 275)
				)
					return true;				
			break; // Not Required

			case 0:
				// India
				if ( 
					(bound1.x > bound2.x -25)
					&& (bound1.x < bound2.x +220)
					&& (bound1.y > bound2.y -20)
					&& (bound1.y < bound2.y +180)
				)
					return true;				
			break; // Not Required

			case 2:
				// Ireland
				if ( 
					(bound1.x > bound2.x -25)
					&& (bound1.x < bound2.x +220)
					&& (bound1.y > bound2.y -20)
					&& (bound1.y < bound2.y +180)
				)
					return true;				
			break; // Not Required

			case 3:
				// US
				if ( 
					(bound1.x > bound2.x -25)
					&& (bound1.x < bound2.x +220)
					&& (bound1.y > bound2.y -20)
					&& (bound1.y < bound2.y +180)
				)
					return true;				
			break; // Not Required

		}*/
				if ( 
					(bound1.x > -70)
					&& (bound1.x < 210)
					&& (bound1.y > 55)
					&& (bound1.y < 275)
				)
					return true;	

		return flag;
	},
	
	anyOverlap: function(sprite) {
        
		var bound1 = sprite.getBounds();
		var flag = false;
		console.log(bound1);
		
		if (bound1.x > -70 && bound1.x < 555 
			&& bound1.y > 55 && bound1.y < 520)
			flag = true;

		return flag;
		// return false;
	},

	showCorrect: function () {
		var tick = game.add.sprite(game.world.centerX, game.world.centerY, 'tick');
		tick.scale.set(4);
		tick.anchor.set(0.5);
		game.add.tween(tick).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
       game.time.events.add(2000, function() { tick.destroy(); });
       console.log("correct");
	},

	showWrong: function () {
		var wrong = game.add.sprite(game.world.centerX, game.world.centerY, 'x');
		wrong.scale.set(4);
		wrong.anchor.set(0.5);
		game.add.tween(wrong).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
       game.time.events.add(2000, function() { wrong.destroy(); });
	},

	// scaleFlags: function (flagScale) {
 //        us.scale.setTo(flagScale*1.25);
 //        ind.scale.setTo(flagScale*1.05);
 //        ie.scale.setTo(flagScale*1.4);
 //        cn.scale.setTo(flagScale*1.4);

 //        var topLeftX = 60;
 //        var topLeftY = 130;

 //        us.x = topLeftX + 340;
 //        us.y = topLeftY + 5;

 //        ind.x = topLeftX;
 //        ind.y = topLeftY;

 //        ie.x = topLeftX;
 //        ie.y = topLeftY + 240;

 //        cn.x = topLeftX + 360;
 //        cn.y = topLeftY + 245;
 //    },

    initQuestions: function() {
        var qSet, l;
        qSet = [];

        var num = [];
        var r = this.getRandom(4);
        
        for (var i=0; i<4; i++) {
            if(i==r) continue;
            l = puzzleData.easy[i].length;
            qSet.push({ "option": puzzleData.easy[i][this.getRandom(l)], "answer": i });
        }

        r = this.getRandom(3) + 1;
        console.log(r);
        for (i=1; i<4; i++) {
            if(i==r) continue;
            l = puzzleData.challenging[i].length;
            qSet.push({ "option": puzzleData.challenging[i][this.getRandom(l)], "answer": i });
        }
        return qSet;
    },

    getRandom: function(t) {
        return Math.floor(Math.random()*100)%t;
    },

    render: function() {
    	var pos = game.input.activePointer.position;
        game.debug.text("x:" + pos.x + " y:" + pos.y, 180, 200);
    }
};
