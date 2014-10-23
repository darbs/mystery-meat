var Hero = require('../hero.js'),
    Mine = require('../mine.js'),
    Tavern = require('../tavern.js'),
    _ = require('underscore'),
    Graph = require("graphlib").Graph;

module.exports = (function () {

    var MAX_STEPS = 7,
        DEBUG = true,
        previous, current;

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
        this._graph = new Graph({ directed: false, compound: false, multigraph: true });
        this._heroes = this._parseHeroes(state.game.heroes);
        this._map = this._parseMap(state.game.board);
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

    Environment.prototype.updateHeroes = function (heroes) {
        for (var i = 0; i < heroes.length; i++) {
            if (!(_.isEqual(heroes[i].pos, this._heroes["@" + heroes[i].id].pos))) {
                var pos = this._heroes["@" + heroes[i].id].pos;
                this._map[pos.x][pos.y] = true;
                this._map[heroes[i].pos.x][heroes[i].pos.y] = this._heroes["@" + heroes[i].id];
            }
        }
    };

    Environment.prototype._parseHeroes = function (heroes) {
        var _heroes = {};
        for (var i = 0; i < heroes.length; i++) {
            _heroes["@" + heroes[i].id] = new Hero(heroes[i]);
        }
        return _heroes;
    };

    Environment.prototype._parseMap = function (board) {
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
                parsed.push(this._processLegend(legend, j / 2, i));
            }

            __map.push(line);
            _map.push(parsed);
        }

        if (DEBUG) {
            printMap(_map);
            console.log(this._graph.edges());
        }

        return _map;
    };

    Environment.prototype._processLegend = function (legend, x, y) {
        var key,
            heroes = this._heroes;

        switch (legend.type) {
            case "hero":
                key = heroes[legend.key];
                this._addToGraph(x, y, key);
                break;
            case "mine":
                key = new Mine({x: x, y: y});
                if (legend.key) {
                    heroes[legend.key].addMine(key);
                    key.setOwner(heroes[legend.key]);
                }
                this._addToGraph(x, y, key);
                break;
            case "tavern":
                key = new Tavern({x: x, y: y});
                this._addToGraph(x, y, key);
                break;
            case "space":
                key = true;
                this._addToGraph(x, y, {weight: 0.0});
                break;
            case "wall":
                key = false;
                break;
        }

        return key;
    };

    Environment.prototype._addToGraph = function (x, y, label) {
        var graph = this._graph;

        current = x + ":" + y;
        var prevRow = x + ":" + (y - 1);

        graph.setNode(current, label);

        // previous is not diag
        if (graph.node(previous) && previous.split(":")[1] == y) {
            graph.setEdge(current, previous);
        }

        if (graph.node(prevRow)) {
            graph.setEdge(current, prevRow);
        }

        previous = current;
    };

    Environment.prototype.update = function (state) {
        this.updateHeroes(state.game.heroes);
        //this.updateBoard(state.game.board);
        if (DEBUG) {
            printMap(this._map);
        }
    };

    return Environment;
})();