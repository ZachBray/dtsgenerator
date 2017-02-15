"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultNamingStrategy = function () {
    function DefaultNamingStrategy() {
        _classCallCheck(this, DefaultNamingStrategy);
    }

    _createClass(DefaultNamingStrategy, [{
        key: 'getTypeNames',
        value: function getTypeNames(id) {
            var ids = [];
            if (id.host) {
                ids.push(decodeURIComponent(id.host));
            }
            var addAllParts = function addAllParts(path) {
                var paths = path.split('/');
                if (paths.length > 1 && paths[0] === '') {
                    paths.shift();
                }
                paths.forEach(function (item) {
                    ids.push(decodeURIComponent(item));
                });
            };
            if (id.pathname) {
                addAllParts(id.pathname);
            }
            if (id.hash && id.hash.length > 1) {
                addAllParts(id.hash.substr(1));
            }
            return ids;
        }
    }]);

    return DefaultNamingStrategy;
}();

exports.DefaultNamingStrategy = DefaultNamingStrategy;