var cursors, velocity = 500,
    sky, floor, fx, text, cannon,balloon;
var balloons = [], cannons = [],
    tween;

var MILLISECONDS_TO_TRAVERSE_PATH = 10000;
demo.state4 = function () {};

demo.state4.prototype = {
    path: null,
    score: 0,
    preload: function () {
        game.load.spritesheet('balloonsprite', './assets/spritesheets/balloons.png', 82, 120);
        game.load.audio('plop', './assets/audio/plop.wav');
        game.load.spritesheet('explosion', './assets/spritesheets/explosion.png', 64, 64);
        game.load.json('track1', './assets/tracks/track1.json');
        game.load.spritesheet('tw-assets','./assets/spritesheets/tw-assets.png',100,100);
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.score = 0;
        addEventListeners();
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      

        game.input.mouse.capture = true;
        fx = game.add.audio('plop');
        fx.addMarker('plop', 0, 0.468);

        fx.allowMultiple = true;
        var style = {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        };
        text = game.add.text(200, 50, `Use tween to make a sprite follow a path`, style);
        text.anchor.set(0.5);
        var levelData = game.cache.getJSON('track1');
        balloon = game.add.sprite(100, 100, 'balloonsprite');
        balloon.anchor.setTo(0.5, 0.5);
        console.log(levelData);
        levelData.cannonLocations.forEach(function(l){
            var c = game.add.sprite(l.position.x, l.position.y, 'tw-assets');
            c.frame=0;
            c.anchor.setTo(0.5, 0.5);
            c.scale.setTo(1, 1);    
            cannons.push(c);
        });

        balloon.events.onInputDown.add(this.setBalloonToDestroyItself, this, 1);

        cursors = game.input.keyboard.createCursorKeys();        

        tween = game.add.tween(balloon).to({
            x: levelData.path.map(function (x) {
                return x.x;
            }),
            y: levelData.path.map(function (x) {
                return x.y;
            })
        }, MILLISECONDS_TO_TRAVERSE_PATH, "Sine.easeInOut", true, -1, true);

        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(0);

        levelData.path.forEach(function (x) {
            graphics.beginFill('#fefefe', 0.5);
            graphics.drawCircle(x.x, x.y, 10);
            graphics.endFill();
        });

        if (levelData.path.length > 0)
            graphics.moveTo(levelData.path[0].x, levelData.path[0].y);
            levelData.path.forEach(function (x) {
            graphics.beginFill('#fefefe', 0.5);
            graphics.lineStyle(2, '#fefefe', 1);
            graphics.lineTo(x.x, x.y);
            graphics.endFill();
        });
        game.input.onDown.add(function () {

        });
    },
    setBalloonToDestroyItself: function (sprite, registerScore) {

        if (registerScore == null || registerScore)
            this.score++;
        text.text = `Score:  ${this.score}`;
        fx.play('plop', 1.0);
        var ex = game.add.sprite(registerScore ? game.input.x : sprite.x, registerScore ? game.input.y : sprite.y, 'explosion');
        ex.anchor.setTo(0.5, 0.5);
        ex.animations.add('explosion');
        ex.play('explosion', 16, true);
        game.time.events.add(Phaser.Timer.SECOND * 1, this.killSprite, this, ex);
        sprite.destroy();
    },
    killSprite: function (sprite) {
        sprite.destroy();
    },   
    update: function () {
        for (var i = 0; i < balloons.length; i++) {
            if (balloons[i].y - balloons[i].height / 2 <= 0 && !balloons[i].isDead) {
                this.setBalloonToDestroyItself(balloons[i], false);
                balloons[i].isDead = true;
            }
        }


        cannons.forEach(function(c){
            if (game.physics.arcade.distanceBetween(balloon, c) < 200)
            c.rotation = game.physics.arcade.angleBetween(c,balloon)+1.6;
        });
         
        //https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
        //bullets now
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