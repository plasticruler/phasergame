var cursors, velocity = 500,
    sky, floor, fx, text, cannon, balloon;
var balloons = [],
    cannons = [],
    fireRate = 500,
    nextFire = 0,
    tweens = [],
    weapon,
    bullets, cannonConfigurations;

var MILLISECONDS_TO_TRAVERSE_PATH = 10000;
var BALLOON_COUNT = 5;
demo.state5 = function () {};

demo.state5.prototype = {
    path: null,
    score: 0,
    preload: function () {
        game.load.spritesheet('balloonsprite', './assets/spritesheets/balloons.png', 82, 120);
        game.load.audio('plop', './assets/audio/plop.wav');
        game.load.spritesheet('explosion', './assets/spritesheets/explosion.png', 64, 64);
        game.load.json('track1', './assets/data/track1.json');
        game.load.json('gamedata', './assets/data/game-data.json');
        game.load.spritesheet('tw-assets', './assets/spritesheets/tw-assets.png', 100, 100);
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        var levelData = game.cache.getJSON('track1');
        var gameData = game.cache.getJSON('gamedata');
       this.createWeapon();
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
        text = game.add.text(200, 50, `Use tween to make a sprite follow a path loaded from a JSON file. Load the level from a file.`, style);
        text.anchor.set(0.5);

        balloons = _.fill(Array(BALLOON_COUNT));
        balloons.forEach((b,i)=>{
             balloons[i] = game.add.sprite(50, 50, 'balloonsprite');
             game.physics.enable(balloons[i], Phaser.Physics.ARCADE);
             balloons[i].frame = _.random(5);
             balloons[i].anchor.setTo(0.5, 0.5);        
             balloons[i].enableBody = true;
             balloons[i].physicsBodyType = Phaser.Physics.ARCADE;
             balloons[i].events.onKilled.add(()=>{this.score++;});
             tweens.push(game.add.tween(balloons[i]).to({
                x: levelData.path.map(function (x) {
                    return x.x;
                }),
                y: levelData.path.map(function (x) {
                    return x.y;
                })
            }, _.random(5000, 30000), "Sine.easeInOut", true, -1, true));
        });  
        
        console.log(levelData);
        cannonConfigurations = gameData.cannonConfigurations;
        console.log(cannonConfigurations);
        levelData.cannonLocations.forEach(function (l) {
            var c = game.add.sprite(l.position.x, l.position.y, 'tw-assets');
            cannonConfig = cannonConfigurations.filter(function (c) {
                return c.id == l.id
            })[0];
            c.weaponId = l.id;
            c.nextFire = 0;
            c.frame = cannonConfig.spriteId;
            c.nextFire = 0; //ready to fire immediately
            c.anchor.setTo(0.5, 0.5);
            c.scale.setTo(1, 1);
            c.range = l.range;
            cannons.push(c);
        });

        cursors = game.input.keyboard.createCursorKeys();

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
        
        console.log(tweens);
    },
    createWeapon: function(){
        weapon = game.add.weapon(20, 'tw-assets', 4);
        weapon.bullets.setAll('scale.x', 0.3);
        weapon.bullets.setAll('scale.y', 0.3);
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    },
    setBalloonToDestroyItself: function (sprite) {
        text.text = `Score:  ${this.score}`;
        fx.play('plop', 1.0);
        var ex = game.add.sprite(sprite.x,  sprite.y, 'explosion');
        ex.anchor.setTo(0.5, 0.5);
        ex.animations.add('explosion');
        ex.play('explosion', 16,false);        
    },  
    fire: function (cannon, target) {        
        if (game.time.now > cannon.nextFire) {
            cannonConfig = cannonConfigurations.filter(function (c) {
                return c.id == cannon.weaponId
            })[0];
            cannon.nextFire = game.time.now + 1000 / cannonConfig.fireRate;
            weapon.trackSprite(cannon, 0, 0, true); //basically from where to shoot with an offset for the turret
            weapon.bulletSpeed = cannonConfig.weaponSpeed;
            weapon.fireAtSprite(target);
        }
    },
    balloonHit: function(bullet, balloon){
        this.setBalloonToDestroyItself(balloon,true);
        if (bullet)
            bullet.kill();
        balloon.kill();


    },
    update: function () {
        for (var i = 0; i < balloons.length; i++) {
            if (!balloons[i].isDead && balloons[i].y - balloons[i].height / 2 <= -50  ) {
                this.setBalloonToDestroyItself(balloons[i], false);
                balloons[i].isDead = true;
            }
        }
        cannons.forEach(function (c) {
            cannonConfig = cannonConfigurations.filter(function (cn) {
                return c.weaponId == cn.id
            })[0];

            balloons.forEach((b)=>{
                if (game.physics.arcade.distanceBetween(b, c) < cannonConfig.range) {
                    c.rotation = game.physics.arcade.angleBetween(c, b) + 1.6;
                    this.fire(c, b);
                }
            });           

        }, this);
        game.physics.arcade.overlap(weapon.bullets,balloons, this.balloonHit,null,this);
        balloons = balloons.filter((b)=>{return b && b.alive;});
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
