"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var url = require("url");
var jsonPointer_1 = require("./jsonPointer");
var defaultNamingStrategy_1 = require("./naming/defaultNamingStrategy");
var utils_1 = require("./utils");

var SchemaId = function () {
    function SchemaId(id, parentIds) {
        var _this = this;

        _classCallCheck(this, SchemaId);

        this.absoluteId = id;
        if (parentIds) {
            parentIds.forEach(function (parent) {
                if (parent) {
                    _this.absoluteId = url.resolve(parent, _this.absoluteId);
                }
            });
        }
        if (this.absoluteId.indexOf('#') < 0) {
            this.absoluteId += '#';
        }
        if (this.absoluteId.indexOf('://') < 0 && this.absoluteId[0] !== '/' && this.absoluteId[0] !== '#') {
            this.absoluteId = '/' + this.absoluteId;
        }
        this.baseId = url.parse(this.absoluteId);
    }

    _createClass(SchemaId, [{
        key: "getAbsoluteId",
        value: function getAbsoluteId() {
            return this.absoluteId;
        }
    }, {
        key: "isFetchable",
        value: function isFetchable() {
            return (/https?\:\/\//.test(this.absoluteId)
            );
        }
    }, {
        key: "getFileId",
        value: function getFileId() {
            return this.absoluteId.replace(/#.*$/, '#');
        }
    }, {
        key: "isJsonPointerHash",
        value: function isJsonPointerHash() {
            return this.absoluteId === '#' || /#\//.test(this.absoluteId);
        }
    }, {
        key: "getJsonPointerHash",
        value: function getJsonPointerHash() {
            var m = /#(\/.*)$/.exec(this.absoluteId);
            if (m == null) {
                return [];
            }
            return jsonPointer_1.parse(m[1]);
        }
    }, {
        key: "getTypeNames",
        value: function getTypeNames() {
            return SchemaId.namingStrategy.getTypeNames(this.baseId).map(utils_1.toTypeName);
        }
    }, {
        key: "getInterfaceName",
        value: function getInterfaceName() {
            var names = this.getTypeNames();
            return names[names.length - 1];
        }
    }]);

    return SchemaId;
}();

SchemaId.namingStrategy = new defaultNamingStrategy_1.DefaultNamingStrategy();
exports.SchemaId = SchemaId;