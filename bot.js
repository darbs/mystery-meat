var dirs = 'nesw',
    env,
    Environment = require('./src/parsers/env-parser.js');


function bot (state, callback) {
    if (state.game.turn === 0) {
        env = new Environment(state);
    } else {
        env.update(state);
    }

    var i = Math.floor(Math.random() * 4);
    var dir = dirs[i];
    callback(null, dir);
}

module.exports = bot;
if (require.main === module)
    require('vindinium-client').cli(bot);
