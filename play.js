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
        
        us = game.add.sprite(game.world.centerX, game.world.centerY, 'us');
        ind = game.add.sprite(game.world.centerX, game.world.centerY, 'in');
        cn = game.add.sprite(game.world.centerX, game.world.centerY, 'cn');
        ie = game.add.sprite(game.world.centerX, game.world.centerY, 'ie');
        var flag = game.add.sprite(10, 100, 'flag');
        flag.scale.set(0.7);

        this.scaleFlags(1.3);
        puzzleData = game.cache.getJSON('gameData');

        quizOptions = this.initQuestions();
        

        var paperY = 50;
        var textSize = 25;
        for (var i=0; i<5; i++, paperY += 140) {
            t = game.add.sprite(760, paperY, 'paper');
            t.tint = 0xfdf969;
            if(quizOptions[i].option.length > 15) textSize = 15;
            else textSize = 25;
            var text1 = game.add.text(0, 0, quizOptions[i].option, {font: "bold "+textSize+"px Arial", fill: "#000000" });
            text1.anchor.set(-0.2,-1.6);
            text1.scale.setTo(1/0.5, 1/0.3);
            t.addChild(text1);
            t.inputEnabled = true;
            t.input.enableDrag();
            t.scale.setTo(0.5,0.3);
            t.myAnswer = quizOptions[i].answer;
            t.events.onDragStop.add(this.onDragStop, this, 0, quizOptions[i].answer);
        }

	},

	onDragStop: function(sprite) {
		var overlap = this.areaOverlap(sprite);

       if( this.anyOverlap(sprite))
       		this.checkAndEvaluate(sprite);
	},

	checkAndEvaluate: function(sprite) {
		var bound2 = [];
		bound2[0] = ind.getBounds();
		bound2[1] = cn.getBounds();
		bound2[2] = ie.getBounds();
		bound2[3] = us.getBounds();

		var res = this.checkIntersection(sprite.getBounds(), bound2[sprite.myAnswer]);
		
		// game.add.tween(sprite).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	 //       	game.time.events.add(2000, function() {
	 //       	sprite.destroy();
	 //    });
	 	sprite.destroy();

		if(res) {
			score++;
			this.showCorrect();
			this.addScoreStar();
		}
		else {
			this.showWrong();
		}
		// game.state.start("end");
		questionNo++;
		console.log(questionNo);
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
	checkIntersection: function(bound1, bound2) {
		// check if bound1 inside bound2
		// console.log(bound1.x, bound2.x);
		// console.log(bound1.y,bound2.y);
		if ( 
			(bound1.x > bound2.x -25)
			&& (bound1.x < bound2.x +50)
			&& (bound1.y > bound2.y -13)
			&& (bound1.y < bound2.y +70)
		)
			return true;
		else
			return false;
	},
	
	anyOverlap: function(sprite) {
		var bound1 = sprite.getBounds();
		var bound2 = [];
		var x1, x2, y1, y2;
		var flag = false;

		bound2[0] = ind.getBounds();
		bound2[1] = cn.getBounds();
		bound2[2] = ie.getBounds();
		bound2[3] = us.getBounds();


		for(var i=0; i<4; i++) {
			if(this.checkIntersection(bound1, bound2[i])) {
				flag = true;
				break;
			}
		}

		// console.log(checkIntersection(bound1,bound2));
		return flag;
	},

	showCorrect: function () {
		var tick = game.add.sprite(game.world.centerX, game.world.centerY, 'tick');
		tick.scale.set(4);
		tick.anchor.set(0.5);
		game.add.tween(tick).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
       game.time.events.add(2000, function() { tick.destroy(); });
	},

	showWrong: function () {
		var wrong = game.add.sprite(game.world.centerX, game.world.centerY, 'x');
		wrong.scale.set(4);
		wrong.anchor.set(0.5);
		game.add.tween(wrong).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
       game.time.events.add(2000, function() { wrong.destroy(); });
	},

	areaOverlap: function (t) {
		var x1,x2,y1,y2,w,h;
		// in,cn,ie,us
		switch(t.myAnswer) {
			case 0:
				console.log("india");
				x1 = ind.x;
				w = ind.width;
				y1 = ind.y;
				h = ind.height;
				break;

			case 1:
				console.log("china");
				x1 = cn.x;
				w = cn.width;
				y1 = cn.y;
				h = cn.height;
				break;

			case 2:
				console.log("ireland");
				x1 = ie.x;
				w = ie.width;
				y1 = ie.y;
				h = ie.height;
				break;

			case 3:
				console.log("us");
				x1 = us.x;
				w = us.width;
				y1 = us.y;
				h = us.height;
				break;

			default:
				console.log("Oops! Seems like trouble");
		}

		x2 = t.x;
		y2 = t.y;

		w = t.width;
		h = t.height;
		
		var area = ( (x1 + w) - x2 ) * ( (y1 + h) - y2 );

		var pctArea = area/(w*h);
		// console.log(ind.x, t.x );
		return pctArea;
	},

	scaleFlags: function (flagScale) {
        us.scale.setTo(flagScale*1.25);
        ind.scale.setTo(flagScale*1.05);
        ie.scale.setTo(flagScale*1.4);
        cn.scale.setTo(flagScale*1.4);

        var topLeftX = 60;
        var topLeftY = 130;

        us.x = topLeftX + 340;
        us.y = topLeftY + 5;

        ind.x = topLeftX;
        ind.y = topLeftY;

        ie.x = topLeftX;
        ie.y = topLeftY + 240;

        cn.x = topLeftX + 360;
        cn.y = topLeftY + 245;
    },

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
        l = puzzleData.challenging[r].length;
        qSet.push({ "option": puzzleData.challenging[r][this.getRandom(l)], "answer": r});
        i = r;

        while (r == i) r = this.getRandom(4);
        l = puzzleData.challenging[r].length;
        qSet.push({"option": puzzleData.challenging[r][this.getRandom(l)], "answer": r});
        return qSet;
    },

    getRandom: function(t) {
        return Math.floor(Math.random()*100)%t;
    }
};
