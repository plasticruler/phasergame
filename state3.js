
var cursors, velocity = 500, sky, floor,fx;
var balloons = [];

demo.state3 = function () { };

demo.state3.prototype = {
    preload: function () {        
        game.load.spritesheet('balloonsprite', './assets/spritesheets/balloons.png', 82, 120);
        game.load.audio('plop','./assets/audio/plop.wav');
    },
    create: function () {
        addEventListeners();
        game.stage.backgroundColor = '#EEDDDD';
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        fx = game.add.audio('plop');
        fx.addMarker('plop',0,0.468);

        fx.allowMultiple = true;


        //there are 9 balloons in the sprite
        for(var i=0; i < 10; i++){
            
            var balloon = game.add.sprite((i*85)+45,game.world.height-100,'balloonsprite');
            balloon.frame = i;
            balloon.anchor.setTo(0.5,0.5);
            game.physics.enable(balloon);
            balloon.body.gravity.y=-Math.floor((Math.random() * 200) + 10);
            balloon.body.collideWorldBounds = true;
            balloon.inputEnabled = true;
            balloon.events.onInputDown.add(balloonIsClicked,this);

            balloons.push(balloon);
        }
        

        /*rocket = game.add.sprite(centreX, centreY, 'rocket');
        rocket.anchor.setTo(0.5, 0.5);
        game.physics.enable(rocket);
        rocket.body.gravity.y = 5000;
        rocket.body.bounce.y = 0.3;
        rocket.body.drag.x = 400;
        rocket.body.collideWorldBounds = true;
        
        //game.camera.follow(rocket);
        //game.camera.deadzone = new Phaser.Rectangle(centreX - 300, 0, 600, 1000)
        */
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        /*game.physics.arcade.collide(rocket, floor, function () {
            console.log('hitting floor');
        });
        game.physics.arcade.collide(rocket, sky, function () {
            console.log('hitting balloon in sky.');
        });
        if (cursors.up.isDown) {
            rocket.body.velocity.y = -velocity;
        }
        else if (cursors.down.isDown) {
            rocket.body.velocity.y = velocity;
        }

        else if (cursors.left.isDown) {
            rocket.body.velocity.x = -velocity;
        }
        else if (cursors.right.isDown) {
            rocket.body.velocity.x = velocity;
        }
        else {
            rocket.body.velocity.x = 0;
            rocket.body.velocity.y = 0;
            rocket.frame = 0;
        }*/
    }
}

function balloonIsClicked(sprite){
    fx.play('plop',1.0);
    sprite.destroy();
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
