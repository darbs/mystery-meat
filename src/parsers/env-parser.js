var Hero = require('../hero.js'),
    Mine = require('../mine.js'),
    Tavern = require('../tavern.js'),
    _ = require('underscore');

module.exports = (function () {

    /**
     * Creates a mapping between heroes
     * @param heroes
     * @returns {{}}
     */
    function heroParser(heroes) {
        var _heroes = {};
        for (var i = 0; i < heroes.length; i++) {
            _heroes["@" + heroes[i].id] = new Hero(heroes[i]);
        }
        return _heroes;
    }

    /**
     * Creates  a traversal map for the bot where valid moves are not false
     * @param board
     * @returns {Array}
     */
    function mapParser(board, heroes) {
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
                parsed.push(processLegend(legend, i, j, heroes));
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

    function processLegend(legend, x, y, heroes) {
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

    function Environment(state) {
        this._heroes = heroParser(state.game.heroes);
        this._map = mapParser(state.game.board, this._heroes);
        this._me = this._heroes["@" + state.hero.id];
    }

    Environment.prototype.map = function () {
        return this._map;
    };

    Environment.prototype.heroes = function (key) {
        if (key) {
            return this._heroes[key];
        } else {
            return this._heroes;
        }
    };

    Environment.prototype.hero = function () {
        return this._me;
    };

    Environment.prototype.updateHeroes = function (heroes) {
        for (var i = 0; i < heroes.length; i++) {
            if (!(_.isEqual(heroes[i].pos, this._heroes["@" + heroes[i].id].pos))) {
                var pos = this._heroes["@" + heroes[i].id].pos;
                this._map[pos.x][pos.y] = true;
                this._map[heroes[i].pos.x][heroes[i].pos.y] = this._heroes["@" + heroes[i].id];
                //console.log("NEED UPDATE");
            }
        }
    };

    Environment.prototype.updateBoard = function (board) {

    };

    Environment.prototype.update = function (state) {
        this.updateHeroes(state.game.heroes);
        this.updateBoard(state.game.board);
        printMap(this._map);
    };

    return Environment;
})();