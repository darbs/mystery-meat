var Mine = require('../src/mine.js');

describe('Mine', function () {

    var mine;

    before(function () {
        mine = new Mine({x:1,y:5});
    });

    it("creates a mine", function () {
        (mine.x).should.eql(1);
        (mine.y).should.eql(5);
    });

    it("generates a valid key string", function () {
        (mine.key()).should.eql("$-");
    });

    it("generates a valid key string with owner", function () {
        mine.owner = {id: 1};
        (mine.key()).should.eql("$1");
    });
});