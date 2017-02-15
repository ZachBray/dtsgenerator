"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const assert = require("power-assert");
const _1 = require("../src/");
const commandOptions_1 = require("../src/commandOptions");
describe('file schema test', () => {
    afterEach(() => {
        commandOptions_1.initialize();
    });
    it('news schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/news.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/news.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('JSON Schemas schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/schema'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/schema.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('related two schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/apibase.json', './schema/apimeta.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/apimeta.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('circular referenced schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/circular.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/circular.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('download related schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/simple_example.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/simple_schema.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('download related advanced schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/advanced_example.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/advanced_schema.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('swagger2.0 sample schema', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/petstore-expanded.json'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/petstore-expanded.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
    it('swagger2.0 sample schema with yaml format', () => __awaiter(this, void 0, void 0, function* () {
        commandOptions_1.default.files = ['./schema/petstore-expanded.yaml'];
        const actual = yield _1.default();
        const expected = fs.readFileSync('./test/expected_file/petstore-expanded.d.ts', { encoding: 'utf-8' });
        assert.equal(actual, expected, actual);
    }));
});
