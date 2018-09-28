demo.state4 = function () {};

demo.state4.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ffdfdf';
        console.log('state4');
        addEventListeners();
    },
    update: function () {}
}
