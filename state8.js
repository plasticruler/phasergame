demo.state8 = function () {};

demo.state8.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ffdfdf';
        console.log('state8');
        addEventListeners();
    },
    update: function () {}
}
