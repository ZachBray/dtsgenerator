"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commander_1 = require("commander");
/* tslint:disable:no-var-requires */
var pkg = require('../package.json');

var CommandOptions = function () {
    function CommandOptions() {
        _classCallCheck(this, CommandOptions);
    }

    _createClass(CommandOptions, [{
        key: "isReadFromStdin",
        value: function isReadFromStdin() {
            return this.stdin || this.files.length === 0 && this.urls.length === 0;
        }
    }]);

    return CommandOptions;
}();

exports.CommandOptions = CommandOptions;
var opts = new CommandOptions();
clear(opts);
function initialize(argv) {
    if (argv) {
        return parse(opts, argv);
    } else {
        clear(opts);
        return null;
    }
}
exports.initialize = initialize;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = opts;
function clear(o) {
    o.files = [];
    o.urls = [];
    o.stdin = undefined;
    o.out = undefined;
    o.prefix = undefined;
    o.header = undefined;
    o.target = 'v2';
    o.naming = 'include-extensions';
}
function parse(o, argv) {
    var command = new commander_1.Command();
    function collectUrl(val, memo) {
        memo.push(val);
        return memo;
    }
    function normalize(val) {
        if (/^v?2$/i.test(val)) {
            return 'v2';
        } else if (/^v?1$/i.test(val)) {
            return 'v1';
        } else {
            return 'v2';
        }
    }
    // <hoge> is reuired, [hoge] is optional
    command.version(pkg.version).usage('[options] <file ... | file patterns using node-glob>').option('--url <url>', 'input json schema from the url.', collectUrl, []).option('--stdin', 'read stdin with other files or urls.').option('-o, --out <file>', 'output d.ts filename.').option('-p, --prefix <type prefix>', 'set the prefix of interface name. default is nothing.').option('-h, --header <type header string>', 'set the string of type header.').option('-t, --target [version]', 'set target TypeScript version. select from `v2` or `v1`. default is `v2`.', /^(v?2|v?1)$/i, 'v2').option('-n, --naming [strategy]', 'set naming strategy. select from `include-extensions` or `exclude-extensions`. default is `include-extensions`.', /^(include-extensions|exclude-extensions)$/, 'include-extensions').on('--help', function () {
        /* tslint:disable:no-console */
        console.log('  Examples:');
        console.log('');
        console.log('    $ dtsgen --help');
        console.log('    $ dtsgen --out types.d.ts schema/**/*.schema.json');
        console.log('    $ cat schema1.json | dtsgen --target v1');
        console.log('    $ dtsgen -o swaggerSchema.d.ts --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v2.0/schema.json');
        console.log('    $ dtsgen -o petstore.d.ts --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/petstore.yaml');
        console.log('');
    }).parse(argv);
    var res = command;
    o.files = command.args;
    o.urls = res.url;
    o.stdin = res.stdin;
    o.out = res.out;
    o.prefix = res.prefix;
    o.header = res.header;
    o.target = normalize(res.target);
    o.naming = res.naming;
    return command;
}