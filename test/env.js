/**
 * Example used for testing copied from http://vindinium.org/starters
 *
 * More maps available at https://github.com/ornicar/vindinium/blob/master/app/Maps.scala
 */
var state = {
    "game":{
        "id":"s2xh3aig",
        "turn":1100,
        "maxTurns":1200,
        "heroes":[
            {
                "id":1,
                "name":"vjousse",
                "userId":"j07ws669",
                "elo":1200,
                "pos":{
                    "x":5,
                    "y":6
                },
                "life":60,
                "gold":0,
                "mineCount":0,
                "spawnPos":{
                    "x":5,
                    "y":6
                },
                "crashed":true
            },
            {
                "id":2,
                "name":"vjousse",
                "userId":"j07ws669",
                "elo":1200,
                "pos":{
                    "x":12,
                    "y":6
                },
                "life":100,
                "gold":0,
                "mineCount":0,
                "spawnPos":{
                    "x":12,
                    "y":6
                },
                "crashed":true
            },
            {
                "id":3,
                "name":"vjousse",
                "userId":"j07ws669",
                "elo":1200,
                "pos":{
                    "x":12,
                    "y":11
                },
                "life":80,
                "gold":0,
                "mineCount":0,
                "spawnPos":{
                    "x":12,
                    "y":11
                },
                "crashed":true
            },
            {
                "id":4,
                "name":"vjousse",
                "userId":"j07ws669",
                "elo":1200,
                "pos":{
                    "x":4,
                    "y":8
                },
                "lastDir": "South",
                "life":38,
                "gold":1078,
                "mineCount":6,
                "spawnPos":{
                    "x":5,
                    "y":11
                },
                "crashed":false
            }
        ],
        "board":{
            "size":18,
            "tiles":"##############        ############################        ##############################    ##############################$4    $4############################  @4    ########################  @1##    ##    ####################  []        []  ##################        ####        ####################  $4####$4  ########################  $4####$4  ####################        ####        ##################  []        []  ####################  @2##    ##@3  ########################        ############################$-    $-##############################    ##############################        ############################        ##############"
        },
        "finished":true
    },
    "hero":{
        "id":4,
        "name":"vjousse",
        "userId":"j07ws669",
        "elo":1200,
        "pos":{
            "x":4,
            "y":8
        },
        "lastDir": "South",
        "life":38,
        "gold":1078,
        "mineCount":6,
        "spawnPos":{
            "x":5,
            "y":11
        },
        "crashed":false
    },
    "token":"lte0",
    "viewUrl":"http://localhost:9000/s2xh3aig",
    "playUrl":"http://localhost:9000/api/s2xh3aig/lte0/play"
};

var assert = require("assert"),
    should = require('should'),
    EnvParser = require("../parsers/env-parser.js");

describe('map parsing', function () {

    var env, map;

    before(function(){
        env = EnvParser(state.game);
        map = env.map();
    });

    it('should parse the map size correctly', function () {
        assert.equal(map.length, state.game.board.size);
    });

    it('should associates heroes correctly', function () {
        var obj = {"type":"hero","key":"@3"};

        var pos = state.game.heroes[2].pos,
            player = map[pos.x][pos.y];

        (player).should.eql(obj);
        (env.hero(obj.key)).should.eql(state.game.heroes[2]);
    });
});