var _ = require('underscore');

// TODO figure out weight function
module.exports = (function () {

    function Tavern(object) {
        this.type = "tavern";
        _.extend(this, object);
    }

    Tavern.prototype.key = function () {
        return "[]";
    };

    return Tavern;
})();