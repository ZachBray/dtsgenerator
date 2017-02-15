"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultNamingStrategy_1 = require("./defaultNamingStrategy");

var NoExtensionNamingStrategy = function () {
    function NoExtensionNamingStrategy() {
        _classCallCheck(this, NoExtensionNamingStrategy);

        this.defaultStrategy = new defaultNamingStrategy_1.DefaultNamingStrategy();
    }

    _createClass(NoExtensionNamingStrategy, [{
        key: "getTypeNames",
        value: function getTypeNames(id) {
            return this.defaultStrategy.getTypeNames(id).map(function (name, i) {
                var isHostPart = i === 0;
                return isHostPart ? name : name.split('.')[0];
            });
        }
    }]);

    return NoExtensionNamingStrategy;
}();

exports.NoExtensionNamingStrategy = NoExtensionNamingStrategy;