"use strict";
const assert = require("power-assert");
const commandOptions_1 = require("../src/commandOptions");
describe('output command help test', () => {
    let content;
    let oldWrite;
    beforeEach(() => {
        oldWrite = process.stdout.write;
        content = '';
        process.stdout.write = (str) => {
            content += str;
            return true;
        };
    });
    afterEach(() => {
        process.stdout.write = oldWrite;
    });
    it('should output command help ', () => {
        const command = commandOptions_1.initialize(['node', 'script.js']);
        command.outputHelp();
        assert.equal(content, `
  Usage: script [options] <file ... | file patterns using node-glob>

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    --url <url>                        input json schema from the url.
    --stdin                            read stdin with other files or urls.
    -o, --out <file>                   output d.ts filename.
    -p, --prefix <type prefix>         set the prefix of interface name. default is nothing.
    -h, --header <type header string>  set the string of type header.
    -t, --target [version]             set target TypeScript version. select from \`v2\` or \`v1\`. default is \`v2\`.
    -n, --naming [strategy]            set naming strategy. select from \`include-extensions\` or \`exclude-extensions\`. default is \`include-extensions\`.

  Examples:

    $ dtsgen --help
    $ dtsgen --out types.d.ts schema/**/*.schema.json
    $ cat schema1.json | dtsgen --target v1
    $ dtsgen -o swaggerSchema.d.ts --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v2.0/schema.json
    $ dtsgen -o petstore.d.ts --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/petstore.yaml

`);
    });
});
describe('command options test', () => {
    afterEach(() => {
        commandOptions_1.initialize();
    });
    it('should parse arguments 1', () => {
        commandOptions_1.initialize(['node', 'script.js']);
        assert.deepEqual(commandOptions_1.default.files, []);
        assert.deepEqual(commandOptions_1.default.urls, []);
        assert.equal(commandOptions_1.default.stdin, undefined);
        assert.equal(commandOptions_1.default.out, undefined);
        assert.equal(commandOptions_1.default.prefix, undefined);
        assert.equal(commandOptions_1.default.header, undefined);
        assert.equal(commandOptions_1.default.target, 'v2');
        assert.equal(commandOptions_1.default.isReadFromStdin(), true);
    });
    it('should parse arguments 2', () => {
        commandOptions_1.initialize([
            'node', 'script.js',
            '--naming', 'exclude-extensions',
            '--target', 'V1',
            '--header', '// header string',
            '--prefix', 'I',
            '--out', 'output.d.ts',
            '--stdin',
            '--url', 'http://example.com/hoge/fuga',
            '--url', 'http://example.com/hoge/fuga2',
            './file1.json', '../file2.json', 'file3.json',
        ]);
        assert.deepEqual(commandOptions_1.default.files, ['./file1.json', '../file2.json', 'file3.json']);
        assert.deepEqual(commandOptions_1.default.urls, ['http://example.com/hoge/fuga', 'http://example.com/hoge/fuga2']);
        assert.equal(commandOptions_1.default.stdin, true);
        assert.equal(commandOptions_1.default.out, 'output.d.ts');
        assert.equal(commandOptions_1.default.prefix, 'I');
        assert.equal(commandOptions_1.default.header, '// header string');
        assert.equal(commandOptions_1.default.target, 'v1');
        assert.equal(commandOptions_1.default.naming, 'exclude-extensions');
        assert.equal(commandOptions_1.default.isReadFromStdin(), true);
    });
    it('should parse arguments 3', () => {
        commandOptions_1.initialize([
            'node', 'script.js',
            '--target', '2',
            './input1.json', './path/input2.json',
        ]);
        assert.deepEqual(commandOptions_1.default.files, ['./input1.json', './path/input2.json']);
        assert.deepEqual(commandOptions_1.default.urls, []);
        assert.equal(commandOptions_1.default.stdin, undefined);
        assert.equal(commandOptions_1.default.out, undefined);
        assert.equal(commandOptions_1.default.prefix, undefined);
        assert.equal(commandOptions_1.default.header, undefined);
        assert.equal(commandOptions_1.default.target, 'v2');
        assert.equal(commandOptions_1.default.isReadFromStdin(), false);
    });
    it('should parse arguments 4', () => {
        commandOptions_1.initialize([
            'node', 'script.js',
            '--target',
            '--out', './schema.d.ts',
            '--url', 'https://example.com/schema.json',
        ]);
        assert.deepEqual(commandOptions_1.default.files, []);
        assert.deepEqual(commandOptions_1.default.urls, ['https://example.com/schema.json']);
        assert.equal(commandOptions_1.default.stdin, undefined);
        assert.equal(commandOptions_1.default.out, './schema.d.ts');
        assert.equal(commandOptions_1.default.prefix, undefined);
        assert.equal(commandOptions_1.default.header, undefined);
        assert.equal(commandOptions_1.default.target, 'v2');
        assert.equal(commandOptions_1.default.isReadFromStdin(), false);
    });
});
