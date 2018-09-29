var demo = {}, arrow;

demo.state0 = function () {};

demo.state0.prototype = {
    preload: function () {
        game.load.image('rocket', './assets/sprites/rocket.png');
    },
    create: function () {
        game.stage.backgroundColor = '#DDDDDD';
        addEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        arrow = game.add.sprite(game_config.width / 2, game_config.height / 2, 'rocket');
        arrow.anchor.setTo(0.5, 0.5); //make centre the centre instead of top left
    },
    update: function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            arrow.x += game_config.speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            arrow.x -= game_config.speed
        }
        
         if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            arrow.y -= game_config.speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            arrow.y += game_config.speed
        }
    }
}

function changeState(e, stateNumber) {
    console.log(e);
    game.state.start('state' + stateNumber);
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addEventListeners() {
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}
