var _ = require('underscore');

module.exports = (function () {

    function Hero (object) {
        this.type = "hero";
        this.mines = [];

        _.extend(this,object);
    }

    Hero.prototype.key = function () {
        return "@" + this.id;
    };

    /**
     * Add a mine to a hero
     * @param mine
     */
    Hero.prototype.addMine = function (mine) {
        this.mines.push(mine);
    };

    return Hero;
})();