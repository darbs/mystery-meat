var Hero = require('../hero.js'),
    Mine = require('../mine.js'),
    Tavern = require('../tavern.js'),
    _ = require('underscore');

module.exports = function (state) {

    // My hero
    var me;

    /**
     * Creates a mapping between heroes
     * @param heroes
     * @returns {{}}
     */
    function heroParser(heroes) {
        var _heroes = {};
        for (var i = 0; i < heroes.length; i++) {
            var hero = new Hero(heroes[i]);

            if (heroes[i].id === state.hero.id) {
                me = hero;
            }

            _heroes["@" + heroes[i].id] = hero;
        }
        return _heroes;
    }

    /**
     * Creates  a traversal map for the bot where valid moves are not false
     * @param board
     * @returns {Array}
     */
    function mapParser(board) {
        var _map = [],
            _size = board.size * 2,
            _legend = {
                "##": {type: "wall"},
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
                "  ": {type: "space"}
            };

        var __map = [];

        for (var i = 0; i < board.size; i++) {
            var line = board.tiles.substr(i * _size, _size),
                parsed = [];

            for (var j = 0; j < line.length; j += 2) {
                var legend = _legend[line.slice(j, j + 2)];
                parsed.push(processLegend(legend, i, j));
            }

            __map.push(line);
            _map.push(parsed);
        }
        //console.log(__map);
        //console.log(_map);
        //console.log(heroes);

        printMap(_map);

        return _map;
    }

    function processLegend(legend, x, y) {
        var key;
        switch (legend.type) {
            case "hero":
                key = heroes[legend.key];
                break;
            case "mine":
                key = new Mine({x: x, y: y});
                if (legend.key) {
                    heroes[legend.key].addMine(key);
                    key.setOwner(heroes[legend.key]);
                }
                break;
            case "tavern":
                key = new Tavern({x: x, y: y});
                break;
            case "space":
                key = true;
                break;
            case "wall":
                key = false;
                break;
        }

        return key;
    }

    function printMap(map) {
        var str = '';
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[x].length; y++) {
                if (map[x][y] === false) {
                    str += "##";
                } else if (map[x][y] === true) {
                    str += "  ";
                } else {
                    str += map[x][y].key();
                }
            }
            str += '\n';
        }
        console.log(str);
    }

    // init
    var heroes = heroParser(state.game.heroes),
        map = mapParser(state.game.board);

    return {
        map: function () {
            return map;
        },
        heroes: function (key) {
            if (key) {
                return heroes[key];
            } else {
                return heroes;
            }
        },
        hero: function () {
            return me;
        }
    };
};