window.onload = function() {
    window.scrollTo(0,1);
    var IMG_PATH = "./img/";
    var request = new XMLHttpRequest();
    request.open('GET', './questions.json', false);
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send();
    var puzzleData = JSON.parse(request.response);
    var options = [];
    var style = { font: "bold 30px Courier", fill: "#000000" };

    var quizOptions;

    
    var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create });

    function preload () {

        game.load.image('logo', IMG_PATH + 'phaser.png');
        game.load.image('in', IMG_PATH + 'in.png');
        game.load.image('cn', IMG_PATH + 'cn.png');
        game.load.image('ie', IMG_PATH + 'ie.png');
        game.load.image('us', IMG_PATH + 'us.png');
        game.load.image('bg', IMG_PATH + 'bg-world.jpg');
        // game.load.image('star', IMG_PATH + 'star.png');

        game.load.image('tick', IMG_PATH + 'tick.png');
        game.load.image('x', IMG_PATH + 'x.png');

        game.load.image('paper', IMG_PATH + 'paper.png');
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        quizOptions = initQuestions();
        console.log(JSON.stringify(quizOptions));
        game.input.onTap.add(gofull, this);

    }

    function create () {

        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'bg');
        logo.scale.setTo(1);
        var titleText = game.add.text(game.world.centerX, 50, "Match it!" ,style);
        titleText.anchor.set(0.5);
        us = game.add.sprite(game.world.centerX, game.world.centerY, 'us');
        ind = game.add.sprite(game.world.centerX, game.world.centerY, 'in');
        cn = game.add.sprite(game.world.centerX, game.world.centerY, 'cn');
        ie = game.add.sprite(game.world.centerX, game.world.centerY, 'ie');
        // ie = game.add.sprite(game.world.centerX, game.world.centerY, 'x');

        // var t = game.add.sprite(750, 100, 'paper'); 
        // t = game.add.sprite(750, 300, 'paper');
        var paperY = 50;
        for (var i=0; i<5; i++, paperY += 140) {
            t = game.add.sprite(750, paperY, 'paper');
            var text1 = game.add.text(0, 0, quizOptions[i].option, style);
            text1.anchor.set(-0.2,-1.6);
            text1.scale.setTo(1/0.45, 1/0.3);
            t.addChild(text1);
            t.inputEnabled = true;
            t.input.enableDrag();
            options.push(t);
        }
        t.addChild(text1);
        // options.push(t);
        
        logo.anchor.set(0.5);
        scaleFlags(1.3);

    }

    function scaleFlags(flagScale) {
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

        for (var i=0; i<options.length; i++)
            options[i].scale.setTo(0.45, 0.3);
    }

    function gofull() {
    if (game.scale.isFullScreen)    {
        game.scale.stopFullScreen();
    }
    else     {
        game.scale.startFullScreen(false);
    }
    }

    // Questions Logic
    function initQuestions() {
        var qSet, l;
        qSet = [];

        console.log(getRandom(100)%4);

        var num = [];
        // num.push(puzzleData.easy.in.length);
        // num.push(puzzleData.easy.cn.length);
        // num.push(puzzleData.easy.ie.length);
        // num.push(puzzleData.easy.us.length);

        // in,cn,ie,us
        var r = getRandom(4);

        console.log(num);
        
        for (var i=0; i<4; i++) {
            if(i==r) continue;
            l = puzzleData.easy[i].length;
            qSet.push({ "option": puzzleData.easy[i][getRandom(l)], "answer": i });
        }
        l = puzzleData.challenging[r].length;
        qSet.push({ "option": puzzleData.challenging[r][getRandom(l)], "answer": r});

        if(r%2 == 0) {
            r = getRandom(4);
            l = puzzleData.easy[r].length;
            qSet.push({"option": puzzleData.easy[r][getRandom(l)], "answer": r});
        }
        else {
            r = getRandom(4);
            l = puzzleData.challenging[r].length;
            qSet.push({"option": puzzleData.challenging[r][getRandom(l)], "answer": r});
        }
        return qSet;
    }


    function getRandom(t) {
        return Math.floor(Math.random()*100)%t;
    }


};

/*
            case 0:
                console.log("india");
                x1 = ind.x;
                w = ind.width;
                y1 = ind.y;
                h = ind.height;
                break;

            case 1:
                x1 = ind.x;
                w = ind.width;
                y1 = ind.y;
                h = ind.height;
                break;

            case 2:
                x1 = ind.x;
                w = ind.width;
                y1 = ind.y;
                h = ind.height;
                break;

            case 3:
                x1 = ind.x;
                w = ind.width;
                y1 = ind.y;
                h = ind.height;
                break;

*/