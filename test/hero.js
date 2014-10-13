var Hero = require('../src/hero.js');

describe('map parsing', function () {
    var object = {
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
        }
    }, hero;

    before(function () {
        hero = new Hero(object.hero);
    });

    it("creates a hero", function () {
        (hero.type).should.eql("hero");
    });

    it("generates a valid key string", function () {
        (hero.key()).should.eql("@4");
    });

});