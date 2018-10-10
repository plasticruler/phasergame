var demo = {},
    rocket, speed = 16;

demo.state0 = function () {};

demo.state0.prototype = {
    preload: function () {
        game.load.tilemap('level', 'assets/tilemaps/level.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tilemap', 'assets/tilemaps/tilemap.png');
        game.load.spritesheet('rocket', './assets/spritesheets/rocket-animation.png', 92, 92);

    },
    create: function () {
        addEventListeners();
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var map = game.add.tilemap('level');
        map.addTilesetImage('tilemap');
        var sky = map.createLayer('sky');
        var floor = map.createLayer('floor');

        rocket = game.add.sprite(centreX, centreY, 'rocket');
        rocket.anchor.setTo(0.5, 0.5);
        
        rocket.animations.add('fly', [0, 1, 2, 3]);

        game.physics.enable(rocket);
        rocket.body.collideWorldBounds = true;
        game.camera.follow(rocket);
        game.camera.deadzone = new Phaser.Rectangle(centreX - 300, 0, 600, 1000);

    },
    update: function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            rocket.x += speed;
            rocket.animations.play('fly', 8, true);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            rocket.x -= speed;
            rocket.animations.play('fly', 8, true);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            rocket.y -= speed;
            rocket.animations.play('fly', 8, true);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            rocket.y += speed;
            rocket.animations.play('fly', 8, true);
        } else {
            rocket.animations.stop('fly');
            rocket.frame = 0;
        }
    }
}

function changeState(e, stateNumber) {
    game.state.start(`state${stateNumber}`);
    console.log(`state switched to '${stateNumber}'`);
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