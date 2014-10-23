/**
 * Example used for testing copied from http://vindinium.org/starters
 *
 * More maps available at https://github.com/ornicar/vindinium/blob/master/app/Maps.scala
 */
var state = {
    "game": {
        "id": "s2xh3aig",
        "turn": 1100,
        "maxTurns": 1200,
        "heroes": [
            {
                "id": 1,
                "name": "vjousse",
                "userId": "j07ws669",
                "elo": 1200,
                "pos": {
                    "x": 5,
                    "y": 6
                },
                "life": 60,
                "gold": 0,
                "mineCount": 0,
                "spawnPos": {
                    "x": 5,
                    "y": 6
                },
                "crashed": true
            },
            {
                "id": 2,
                "name": "vjousse",
                "userId": "j07ws669",
                "elo": 1200,
                "pos": {
                    "x": 12,
                    "y": 6
                },
                "life": 100,
                "gold": 0,
                "mineCount": 0,
                "spawnPos": {
                    "x": 12,
                    "y": 6
                },
                "crashed": true
            },
            {
                "id": 3,
                "name": "vjousse",
                "userId": "j07ws669",
                "elo": 1200,
                "pos": {
                    "x": 12,
                    "y": 11
                },
                "life": 80,
                "gold": 0,
                "mineCount": 0,
                "spawnPos": {
                    "x": 12,
                    "y": 11
                },
                "crashed": true
            },
            {
                "id": 4,
                "name": "vjousse",
                "userId": "j07ws669",
                "elo": 1200,
                "pos": {
                    "x": 4,
                    "y": 8
                },
                "lastDir": "South",
                "life": 38,
                "gold": 1078,
                "mineCount": 6,
                "spawnPos": {
                    "x": 5,
                    "y": 11
                },
                "crashed": false
            }
        ],
        "board": {
            "size": 18,
            "tiles": "##############        ############################        ##############################    ##############################$4    $4############################  @4    ########################  @1##    ##    ####################  []        []  ##################        ####        ####################  $4####$4  ########################  $4####$4  ####################        ####        ##################  []        []  ####################  @2##    ##@3  ########################        ############################$-    $-##############################    ##############################        ############################        ##############"
        },
        "finished": true
    },
    "hero": {
        "id": 4,
        "name": "vjousse",
        "userId": "j07ws669",
        "elo": 1200,
        "pos": {
            "x": 4,
            "y": 8
        },
        "lastDir": "South",
        "life": 38,
        "gold": 1078,
        "mineCount": 6,
        "spawnPos": {
            "x": 5,
            "y": 11
        },
        "crashed": false
    },
    "token": "lte0",
    "viewUrl": "http://localhost:9000/s2xh3aig",
    "playUrl": "http://localhost:9000/api/s2xh3aig/lte0/play"
};

var assert = require("assert"),
    should = require('should'),
    Environment = require("../src/parsers/env-parser.js"),
    Graph = require("graphlib").Graph;

describe('Environment', function () {

    var env = new Environment(state), map,
        edges = [
            { v: '1:2', w: '2:1' },
            { v: '1:2', w: '2:2' },
            { v: '2:1', w: '2:2' },
            { v: '2:2', w: '3:2' },
            { v: '2:3', w: '3:2' },
            { v: '2:2', w: '2:3' }
        ];

    it('should parse the map size correctly', function () {
        assert.equal(env._map.length, state.game.board.size);
    });

    it('should associates heroes from legend correctly', function () {
        var hero = state.game.heroes[2],
            player = env._map[hero.pos.x][hero.pos.y];

        (player.id).should.eql(hero.id);
    });

    it('retreives the correct hero', function () {
        (env.heroes('@3').id).should.eql(3);
    });

    it('associates mines from legend correctly', function () {
        (env.heroes('@4').mines.length).should.eql(6);
    });

    describe('graph generation', function () {

        before(function () {
            env._graph = new Graph({ directed: false, compound: false, multigraph: true });
            env._parseMap({
                "size": 5,
                "tiles":
                    "##########" +
                    "####  ####" +
                    "##      ##" +
                    "####  ####" +
                    "##########"
            });
        });

        it('generates the correct number of edges', function () {
            (env._graph.edges().length).should.eql(4);
        });

        it('generates the correct edges', function () {
            assert.deepEqual(env._graph.edges(), [
                { v: '1:2', w: '2:2' },
                { v: '2:1', w: '2:2' },
                { v: '2:2', w: '3:2' },
                { v: '2:2', w: '2:3' }
            ]);
        });

    });
});