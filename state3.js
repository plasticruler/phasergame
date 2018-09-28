demo.state3 = function () {};

demo.state3.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ffdfdf';
        console.log('state3');
        addEventListeners();
    },
    update: function () {}
}
