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
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var commandOptions_1 = require("./commandOptions");
var index_1 = require("./index");
var utils_1 = require("./utils");
function readSchemasFromStdin() {
    process.stdin.setEncoding('utf-8');
    return new Promise(function (resolve, reject) {
        var data = '';
        function onRead() {
            /* tslint:disable:no-conditional-assignment */
            var chunk = void 0;
            while (chunk = process.stdin.read()) {
                if (typeof chunk === 'string') {
                    data += chunk;
                }
            }
        }
        function onEnd() {
            var schemas = utils_1.parseFileContent(data);
            if (!Array.isArray(schemas)) {
                schemas = [schemas];
            }
            resolve(schemas);
        }
        function onError(err) {
            reject(err);
        }
        process.stdin.on('readable', onRead).once('end', onEnd).once('error', onError);
    });
}
function exec() {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var schemas;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        commandOptions_1.initialize(process.argv);
                        schemas = [];

                        if (!commandOptions_1.default.isReadFromStdin()) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 5;
                        return readSchemasFromStdin();

                    case 5:
                        schemas = _context.sent;

                    case 6:
                        /* tslint:disable:no-console */
                        index_1.default(schemas).then(function (result) {
                            if (commandOptions_1.default.out) {
                                mkdirp.sync(path.dirname(commandOptions_1.default.out));
                                fs.writeFileSync(commandOptions_1.default.out, result, { encoding: 'utf-8' });
                            } else {
                                console.log(result);
                            }
                        }).catch(function (err) {
                            console.error(err.stack || err);
                        });

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exec();