var demo = {}, rocket, speed=16;

demo.state0 = function () {};

demo.state0.prototype = {
    preload: function () {
        game.load.image('rocket', './assets/sprites/rocket.png');
        game.load.image('background', './assets/sprites/space-background.png');
    },
    create: function () {
        game.stage.backgroundColor = '#DDDDDD';
        addEventListeners();
        game.world.setBounds(0,0,2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var bg = game.add.sprite(0,0,'background');
        
        rocket = game.add.sprite(centreX, centreY, 'rocket');
        rocket.anchor.setTo(0.5, 0.5); 
        rocket.scale.setTo(0.9,0.9);
        game.physics.enable(rocket);
        rocket.body.collideWorldBounds = true;
        
        game.camera.follow(rocket);
        game.camera.deadzone = new Phaser.Rectangle(centreX - 300,0,600,1000)
    },
    update: function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            rocket.x += speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            rocket.x -= speed;
        }
        
         if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            rocket.y -= speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            rocket.y += speed;
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
