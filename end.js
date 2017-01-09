var endState = {
    create: function() {
        var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.set(0.5);
        bg.tint = 0xa3f7fc;
        var score = game.state.states['end'].score;
        if (score == undefined) score = 0;
        var scoreText;
        var scoreText2 = 'Visit GlobeSmart to build culture competence!';

        switch(score) {
            case 4: scoreText = 'Great Start';
                break;
            case 5: scoreText = 'Excellent';
                    scoreText2 = 'Visit GlobeSmart to know more!';
                break;
            default:
                scoreText = 'Good Try'
                break;
        }
        var nameLabel = game.add.text(game.world.centerX,80, scoreText, {font: 'bold 30px Arial', fill: '#000000'});
        nameLabel.anchor.set(0.5);
        var nameLabel = game.add.text(game.world.centerX,120, scoreText2, {font: '30px Arial', fill: '#000000'});
        nameLabel.anchor.set(0.5);

        var startLabel = game.add.text(game.world.centerX,350, 'NEW GAME', {font: 'bold 50px Arial', fill: '#000000'});
        startLabel.anchor.set(0.5);
        startLabel.inputEnabled = true;
        startLabel.events.onInputDown.add(this.start, this);

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.input.onTap.add(this.gofull, this);
    },

    start: function() {
        game.state.start('play');
    },

    gofull: function() {
    if (game.scale.isFullScreen)    {
        // game.scale.stopFullScreen();
    }
    else     {
        game.scale.startFullScreen(false);
    }
    }
};