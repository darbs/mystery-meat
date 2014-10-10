module.exports = function (size, tiles) {

    var _map = [],
        _size = size * 2,
        _legend = {};

    for (var i = 0; i < size; i++) {
        _map.push(tiles.substr(i * _size, _size));
    }

    return {
        map: function () {
            return _map;
        }
    };
};