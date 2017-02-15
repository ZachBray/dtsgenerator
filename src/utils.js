"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Debug = require("debug");
var YAML = require("js-yaml");
var path = require("path");
var commandOptions_1 = require("./commandOptions");
var debug = Debug('dtsgen');
function toTSType(type, debugSource) {
    switch (type) {
        case 'integer':
            return 'number';
        case 'any':
        case 'null':
        case 'undefined':
        case 'string':
        case 'number':
        case 'boolean':
            return type;
        case 'object':
        case 'array':
            return null;
        default:
            if (debugSource) {
                console.error('  debugSource=' + JSON.stringify(debugSource, null, 2));
            }
            throw new Error('unknown type: ' + type);
    }
}
exports.toTSType = toTSType;
function reduceTypes(types) {
    if (types.length < 2) {
        return types;
    }
    var set = new Set(types);
    if (commandOptions_1.default.target === 'v1') {
        set.delete('null');
    }
    if (set.delete('integer')) {
        set.add('number');
    }
    return Array.from(set.values());
}
exports.reduceTypes = reduceTypes;
function toTypeName(str) {
    if (!str) {
        return str;
    }
    str = str.trim();
    return str.split('$').map(function (s) {
        return s.replace(/(?:^|[^A-Za-z0-9])([A-Za-z0-9])/g, function (_, m) {
            return m.toUpperCase();
        });
    }).join('$');
}
exports.toTypeName = toTypeName;
function mergeSchema(a, b) {
    Object.keys(b).forEach(function (key) {
        if (a[key] == null) {
            a[key] = b[key];
        } else {
            var value = b[key];
            if ((typeof value === "undefined" ? "undefined" : _typeof(value)) !== _typeof(a[key])) {
                debug("mergeSchema warning: type is missmatched, key=" + key);
                a[key] = value;
            } else if (Array.isArray(value)) {
                Array.prototype.push.apply(a[key], value);
            } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                Object.assign(a[key], value);
            } else {
                a[key] = value;
            }
        }
    });
    return a;
}
exports.mergeSchema = mergeSchema;
function parseFileContent(content, filename) {
    var ext = filename ? path.extname(filename).toLowerCase() : '';
    var maybeYaml = ext === '.yaml' || ext === '.yml';
    try {
        if (maybeYaml) {
            return YAML.safeLoad(content);
        } else {
            return JSON.parse(content);
        }
    } catch (e) {
        if (maybeYaml) {
            return JSON.parse(content);
        } else {
            return YAML.safeLoad(content);
        }
    }
}
exports.parseFileContent = parseFileContent;