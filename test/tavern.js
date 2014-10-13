var Tavern = require('../src/tavern.js');

describe('tavern', function () {

    var tavern;

    before(function () {
        tavern = new Tavern({x:1,y:5});
    });

    it("creates a tavern", function () {
        (tavern.x).should.eql(1);
        (tavern.y).should.eql(5);
    });

    it("generates a valid key string", function () {
        (tavern.key()).should.eql("[]");
    });

});