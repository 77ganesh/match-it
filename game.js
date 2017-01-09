var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameDiv');
game.state.add('end', endState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('load');