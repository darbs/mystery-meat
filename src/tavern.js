var _ = require('underscore');

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