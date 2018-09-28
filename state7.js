demo.state7 = function () {};

demo.state7.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ffdfdf';
        console.log('state7');
        addEventListeners();
    },
    update: function () {}
}
