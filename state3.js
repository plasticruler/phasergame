var cursors, velocity = 500,
    sky, floor, fx, text;
var balloons = [],
    tween;
var points = [];
demo.state3 = function () {};

demo.state3.prototype = {
    path: null,
    score: 0,
    preload: function () {
        game.load.spritesheet('balloonsprite', './assets/spritesheets/balloons.png', 82, 120);
        game.load.audio('plop', './assets/audio/plop.wav');
        game.load.spritesheet('explosion', './assets/spritesheets/explosion.png', 64, 64);
    },
    create: function () {
        this.score = 0;
        addEventListeners();
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);


        
        fx = game.add.audio('plop');
        fx.addMarker('plop', 0, 0.468);

        fx.allowMultiple = true;
        var style = {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        };
        text = game.add.text(200, 50, `Use tween to make a sprite follow a path created by clicking the mouse.`, style);
        text.anchor.set(0.5);

        var startX = 100,
            startY = 100;
        var balloon = game.add.sprite(startX, startY, 'balloonsprite');
        balloon.anchor.setTo(0.5, 0.5);

        balloon.frame = 0;
        balloon.inputEnabled = true;
        balloon.events.onInputDown.add(this.setBalloonToDestroyItself, this, 1);

        //add the tween / path
        tween = game.add.tween(balloon).to({
            x: points.map(function (x) {
                return x.x;
            }),
            y: points.map(function (x) {
                return x.y;
            })
        }, 4000, "Sine.easeInOut", true, -1, false);

        cursors = game.input.keyboard.createCursorKeys();
        
        game.input.onUp.add(function () {
            points.push({
                x: game.input.x,
                y: game.input.y
            });
            tween.manager.remove(tween);
            tween = game.add.tween(balloon).to({
                x: points.map(function (x) {
                    return x.x;
                }),
                y: points.map(function (x) {
                    return x.y;
                })
            }, 4000, "Sine.easeInOut", true, -1, false);
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
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(0);

        //draw circles where the mouse was clicked to show path the balloon will follow
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