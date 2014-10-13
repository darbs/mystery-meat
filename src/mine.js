var _ = require('underscore');

module.exports = (function () {

    function Mine(object) {
        this.type = "mine";
        _.extend(this, object);
    }

    Mine.prototype.key = function () {
        return !!this.owner ? "$" + this.owner.id : "$-";
    };

    Mine.prototype.setOwner = function (hero) {
        this.owner = hero;
    };

    return Mine;
})();