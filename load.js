var loadState = {

	preload: function () {
		var IMG_PATH = "./img/";
		var loadLabel = game.add.text(160,160, 'Loading...', {font: "100px Arial", fill: "#ffffff"});

		game.load.json('gameData', 'questions.json');

		game.load.image('in', IMG_PATH + 'in.png');
        game.load.image('cn', IMG_PATH + 'cn.png');
        game.load.image('ie', IMG_PATH + 'ie.png');
        game.load.image('us', IMG_PATH + 'us.png');
        game.load.image('flag', IMG_PATH + 'flags.png');

        game.load.image('bg', IMG_PATH + 'bg-world.jpg');
        game.load.image('tick', IMG_PATH + 'tick.png');
        game.load.image('x', IMG_PATH + 'x.png');
        game.load.image('star', IMG_PATH + 'star.png');
        game.load.image('paper', IMG_PATH + 'paper.png');

        
	},

	create: function () {
		// var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'paper');
		// console.log(game.cache.getJSON('gameData'));
		game.state.start('play');
	}
}

// var phaserJSON = game.cache.getJSON('version');