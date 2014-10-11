module.exports = function (game) {


    /**
     *
     * @param heroes
     * @returns {{}}
     */
    function heroParser (heroes) {
        var _heroes = {};
        for (var i = 0; i < heroes.length; i++) {
            heroes[i].type = "player";
            _heroes["@"+heroes[i].id] = heroes[i];
        }
        return _heroes;
    }

    /**
     *
     * @param board
     * @returns {Array}
     */
    function mapParser (board) {
        var _map = [],
            _size = board.size * 2,
            _legend = {
                "##": false,
                "@1": {type: "hero", key: "@1"},
                "@2": {type: "hero", key: "@2"},
                "@3": {type: "hero", key: "@3"},
                "@4": {type: "hero", key: "@4"},
                "$-": {type: "mine"},
                "$1": {type: "mine", key: "@1"},
                "$2": {type: "mine", key: "@2"},
                "$3": {type: "mine", key: "@3"},
                "$4": {type: "mine", key: "@4"},
                "[]": {type: "tavern"},
                "  ": true
            };

        var __map = [];

        for (var i = 0; i < board.size; i++) {
            var line = board.tiles.substr(i * _size, _size),
                parsed = [];

            for (var j = 0; j < line.length; j+=2) {
                parsed.push(_legend[line.slice(j, j+2)]);
            }

            __map.push(line);
            _map.push(parsed);
        }

        return _map;
    }

    // init
    var heroes = heroParser(game.heroes),
        map = mapParser(game.board);

    return {
        map: function () {
            return map;
        },
        me:  function () {
            // TODO
        },
        heroes: function () {
            return heroes;
        },
        hero: function (key) {
            return heroes[key];
        }
    };
};