"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (!global._babelPolyfill) {
    /* tslint:disable:no-var-requires */
    require('babel-polyfill');
}
var commandOptions_1 = require("./commandOptions");
var jsonSchemaParser_1 = require("./jsonSchemaParser");
var defaultNamingStrategy_1 = require("./naming/defaultNamingStrategy");
var noExtensionNamingStrategy_1 = require("./naming/noExtensionNamingStrategy");
var schemaid_1 = require("./schemaid");
try {
    // optional
    /* tslint:disable:no-var-requires */
    require('source-map-support').install();
} catch (e) {}
var commandOptions_2 = require("./commandOptions");
exports.initialize = commandOptions_2.initialize;
function dtsgenerator(schemas) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var parser, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, schema, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, path, lschemas, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, lschema, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        parser = new jsonSchemaParser_1.JsonSchemaParser();
                        _context.prev = 1;

                        initializeNamingStrategy();

                        if (!schemas) {
                            _context.next = 23;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;

                        for (_iterator = schemas[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            schema = _step.value;

                            parser.parseSchema(schema);
                        }
                        _context.next = 15;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context["catch"](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 15:
                        _context.prev = 15;
                        _context.prev = 16;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 18:
                        _context.prev = 18;

                        if (!_didIteratorError) {
                            _context.next = 21;
                            break;
                        }

                        throw _iteratorError;

                    case 21:
                        return _context.finish(18);

                    case 22:
                        return _context.finish(15);

                    case 23:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 26;
                        _iterator2 = commandOptions_1.default.files[Symbol.iterator]();

                    case 28:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 55;
                            break;
                        }

                        path = _step2.value;
                        _context.next = 32;
                        return parser.fetchLocalFileSchemas(path);

                    case 32:
                        lschemas = _context.sent;
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context.prev = 36;

                        for (_iterator4 = lschemas[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            lschema = _step4.value;

                            parser.parseSchema(lschema);
                        }
                        _context.next = 44;
                        break;

                    case 40:
                        _context.prev = 40;
                        _context.t1 = _context["catch"](36);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context.t1;

                    case 44:
                        _context.prev = 44;
                        _context.prev = 45;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 47:
                        _context.prev = 47;

                        if (!_didIteratorError4) {
                            _context.next = 50;
                            break;
                        }

                        throw _iteratorError4;

                    case 50:
                        return _context.finish(47);

                    case 51:
                        return _context.finish(44);

                    case 52:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 28;
                        break;

                    case 55:
                        _context.next = 61;
                        break;

                    case 57:
                        _context.prev = 57;
                        _context.t2 = _context["catch"](26);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t2;

                    case 61:
                        _context.prev = 61;
                        _context.prev = 62;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 64:
                        _context.prev = 64;

                        if (!_didIteratorError2) {
                            _context.next = 67;
                            break;
                        }

                        throw _iteratorError2;

                    case 67:
                        return _context.finish(64);

                    case 68:
                        return _context.finish(61);

                    case 69:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 72;
                        _iterator3 = commandOptions_1.default.urls[Symbol.iterator]();

                    case 74:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context.next = 85;
                            break;
                        }

                        url = _step3.value;
                        _context.t3 = parser;
                        _context.next = 79;
                        return parser.fetchRemoteSchema(url);

                    case 79:
                        _context.t4 = _context.sent;
                        _context.t5 = url;

                        _context.t3.parseSchema.call(_context.t3, _context.t4, _context.t5);

                    case 82:
                        _iteratorNormalCompletion3 = true;
                        _context.next = 74;
                        break;

                    case 85:
                        _context.next = 91;
                        break;

                    case 87:
                        _context.prev = 87;
                        _context.t6 = _context["catch"](72);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t6;

                    case 91:
                        _context.prev = 91;
                        _context.prev = 92;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 94:
                        _context.prev = 94;

                        if (!_didIteratorError3) {
                            _context.next = 97;
                            break;
                        }

                        throw _iteratorError3;

                    case 97:
                        return _context.finish(94);

                    case 98:
                        return _context.finish(91);

                    case 99:
                        return _context.abrupt("return", parser.generateDts());

                    case 102:
                        _context.prev = 102;
                        _context.t7 = _context["catch"](1);
                        return _context.abrupt("return", Promise.reject(_context.t7));

                    case 105:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 102], [7, 11, 15, 23], [16,, 18, 22], [26, 57, 61, 69], [36, 40, 44, 52], [45,, 47, 51], [62,, 64, 68], [72, 87, 91, 99], [92,, 94, 98]]);
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dtsgenerator;
function initializeNamingStrategy() {
    switch (commandOptions_1.default.naming) {
        case 'include-extensions':
            schemaid_1.SchemaId.namingStrategy = new defaultNamingStrategy_1.DefaultNamingStrategy();
            break;
        case 'exclude-extensions':
            schemaid_1.SchemaId.namingStrategy = new noExtensionNamingStrategy_1.NoExtensionNamingStrategy();
            break;
        default:
            throw new Error('Unknown naming strategy: ' + commandOptions_1.default.naming);
    }
}