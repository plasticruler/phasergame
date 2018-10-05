
var cursors, velocity = 500, sky, floor,fx,text;
var balloons = [];

demo.state2 = function () { };

demo.state2.prototype = {
    score:0,
    preload: function () {        
        game.load.spritesheet('balloonsprite', './assets/spritesheets/balloons.png', 82, 120);
        game.load.audio('plop','./assets/audio/plop.wav');
        game.load.spritesheet('explosion','./assets/spritesheets/explosion.png',64,64);
    },
    create: function () {
        this.score = 0;
        addEventListeners();
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        fx = game.add.audio('plop');
        fx.addMarker('plop',0,0.468);

        fx.allowMultiple = true;
        var style = {font: "65px Arial", fill:"#000000", align:"center"};    
        text = game.add.text(200,50,`Score:  ${this.score}`,style);
        text.anchor.set(0.5);
        //there are 10 balloons in the sprite
        for(var i=0; i < 10; i++){
            
            var balloon = game.add.sprite((i*85)+45,game.world.height-100,'balloonsprite');
            balloon.frame = i;
            balloon.anchor.setTo(0.5,0.5);
            game.physics.enable(balloon);
            balloon.body.gravity.y=-Math.floor((Math.random() * 200) + 10);
            balloon.body.collideWorldBounds = true;
            balloon.inputEnabled = true;
            balloon.events.onInputDown.add(this.balloonIsClicked, this,1);
            balloons.push(balloon);
        }
        cursors = game.input.keyboard.createCursorKeys();
    },
    balloonIsClicked: function(sprite){    
        this.score++;
        text.text =`Score:  ${this.score}`; 
        fx.play('plop',1.0);        
        var ex = game.add.sprite(sprite.x,sprite.y,'explosion');
        ex.animations.add('explosion');
        ex.play('explosion',16,true);
        game.time.events.add(Phaser.Timer.SECOND*1,this.killSprite,this,ex);  
        sprite.destroy();      
    },    
    killSprite:function(sprite){        
        sprite.destroy();
    },
    update: function () {
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
