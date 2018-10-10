var cursors, velocity = 500,
    sky, floor, fx, text, cannon,balloon;
var balloons = [],
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
        game.load.spritesheet('cannon','./assets/sprites/cannon-up.png');
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
        points = game.cache.getJSON('track1');
        balloon = game.add.sprite(100, 100, 'balloonsprite');
        balloon.anchor.setTo(0.5, 0.5);
      
        cannon = game.add.sprite(points[6].x, points[6].y+100, 'cannon');
        cannon.anchor.setTo(0.5, 0.5);
        cannon.scale.setTo(0.1, 0.1);

        balloon.events.onInputDown.add(this.setBalloonToDestroyItself, this, 1);

        cursors = game.input.keyboard.createCursorKeys();

        

        tween = game.add.tween(balloon).to({
            x: points.map(function (x) {
                return x.x;
            }),
            y: points.map(function (x) {
                return x.y;
            })
        }, MILLISECONDS_TO_TRAVERSE_PATH, "Sine.easeInOut", true, -1, true);

        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(0);

        points.forEach(function (x) {
            graphics.beginFill('#fefefe', 0.5);
            graphics.drawCircle(x.x, x.y, 10);
            graphics.endFill();
        });

        if (points.length > 0)
            graphics.moveTo(points[0].x, points[0].y);
        points.forEach(function (x) {
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
    render: function(){
        game.debug.spriteInfo(cannon, 32,100);
        
    },
    update: function () {
        for (var i = 0; i < balloons.length; i++) {
            if (balloons[i].y - balloons[i].height / 2 <= 0 && !balloons[i].isDead) {
                this.setBalloonToDestroyItself(balloons[i], false);
                balloons[i].isDead = true;
            }
        }
        if (game.physics.arcade.distanceBetween(balloon, cannon) < 200)
            cannon.rotation = game.physics.arcade.angleBetween(cannon,balloon)+1.6; //the graphic faces upward so compensate the rotation angle
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