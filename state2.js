demo.state2 = function () {};

demo.state2.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ffdfdf';
        console.log('state2');
        addEventListeners();
    },
    update: function () {}
}
