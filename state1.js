
var cursors, velocity = 500,sky,floor;
demo.state1 = function () {};

demo.state1.prototype = {
    preload: function () {
        game.load.tilemap('level','assets/tilemaps/level.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('tilemap','assets/tilemaps/tilemap.png');
        game.load.spritesheet('rocket', './assets/sprites/rocket_off.png',110,246);
        
    },
    create: function () {
        addEventListeners();
        game.stage.backgroundColor = '#DDDDDD';        
        game.world.setBounds(0,0,2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var map = game.add.tilemap('level');
        map.addTilesetImage('tilemap');
        sky = map.createLayer('sky');
        floor = map.createLayer('floor');
        
        //set collisions
        map.setCollisionBetween(1,1,true,'floor');
        map.setCollisionBetween(4,4,true,'sky');

        rocket = game.add.sprite(centreX, centreY, 'rocket');
        rocket.anchor.setTo(0.5, 0.5); 
        
        game.physics.enable(rocket);
        rocket.body.gravity.y = 5000;
        rocket.body.bounce.y = 0.3;
        rocket.body.drag.x = 400;
        rocket.body.collideWorldBounds = true;
        game.camera.follow(rocket);
        game.camera.deadzone = new Phaser.Rectangle(centreX - 300,0,600,1000)

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        game.physics.arcade.collide(rocket, floor, function(){
            console.log('hitting floor');
        });
        game.physics.arcade.collide(rocket, sky, function(){
            console.log('hitting balloon in sky.');
        });
        if (cursors.up.isDown){
            rocket.body.velocity.y = -velocity;
        }
        else if(cursors.down.isDown){
            rocket.body.velocity.y = velocity;
        }     

        else if(cursors.left.isDown){
            rocket.body.velocity.x = -velocity;
        }
        else if(cursors.right.isDown){
            rocket.body.velocity.x = velocity;
        }
        else{
            rocket.body.velocity.x = 0;
            rocket.body.velocity.y= 0;
            rocket.frame = 0;
        }
       }
    }

function changeState(e, stateNumber) {  
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
