"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert = require("power-assert");
const _1 = require("../src/");
describe('error schema test', () => {
    it('no id schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            type: 'object',
        };
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.equal(e.message, 'There is no id in the input schema(s)');
        }
    }));
    it('unkown type schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/unkown_type',
            type: 'hoge',
        };
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.equal(e.message, 'unknown type: hoge');
        }
    }));
    it('unkown type property', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/unkown_property',
            type: 'object',
            properties: {
                name: {
                    type: 'fuga',
                },
            },
        };
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.equal(e.message, 'unknown type: fuga');
        }
    }));
    it('target of $ref is not found', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/target_not_found',
            type: 'object',
            properties: {
                ref: {
                    $ref: '/notFound/id#',
                },
            },
        };
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.equal(e.message, '$ref target is not found: /notFound/id#');
        }
    }));
    it('target of $ref is invalid path', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/target_not_found',
            type: 'object',
            properties: {
                ref: {
                    $ref: '#hogefuga',
                },
            },
        };
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.equal(e.message, '$ref target is not found: /test/target_not_found#hogefuga');
        }
    }));
    it('invalid format schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = 'not schema data and invalid JSON format {.';
        try {
            yield _1.default([schema]);
            assert.fail();
        }
        catch (e) {
            assert.ok(/^Unexpected token/.test(e.message));
        }
    }));
});
