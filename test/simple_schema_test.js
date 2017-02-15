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
const commandOptions_1 = require("../src/commandOptions");
describe('simple schema test', () => {
    afterEach(() => {
        commandOptions_1.initialize();
    });
    it('no property schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/no_prop',
            type: 'object',
        };
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    export interface NoProp {
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('one line schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/one_line',
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
            },
        };
        commandOptions_1.default.prefix = 'I';
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    export interface IOneLine {
        name?: string;
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('no type schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/no_type',
        };
        commandOptions_1.default.prefix = 'I';
        commandOptions_1.default.header = `// header string
`;
        const result = yield _1.default([schema]);
        const expected = `// header string

declare namespace Test {
    export type INoType = any;
}
`;
        assert.equal(result, expected, result);
    }));
    it('include array schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/inc_array',
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                array: {
                    type: 'array',
                    items: {
                        type: ['string', 'integer', 'boolean', 'null'],
                    },
                },
            },
        };
        commandOptions_1.default.prefix = 'T';
        {
            const result = yield _1.default([schema]);
            const expected = `declare namespace Test {
    export interface TIncArray {
        id?: number;
        array?: (string | boolean | null | number)[];
    }
}
`;
            assert.equal(result, expected, result);
        }
        commandOptions_1.default.target = 'v1';
        {
            const result = yield _1.default([schema]);
            const expected = `declare namespace Test {
    export interface TIncArray {
        id?: number;
        array?: (string | boolean | number)[];
    }
}
`;
            assert.equal(result, expected, result);
        }
    }));
    it('all simple type schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/all_simple_type',
            type: 'object',
            properties: {
                array: {
                    type: 'array',
                    items: {
                        anyOf: [
                            { type: 'string' },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        ],
                    },
                },
                boolean: {
                    type: 'boolean',
                },
                integer: {
                    type: 'integer',
                },
                null: {
                    type: 'null',
                },
                number: {
                    type: 'number',
                },
                object: {
                    type: 'object',
                },
                string: {
                    type: 'string',
                },
                any: {
                    type: 'any',
                },
                undefined: {
                    type: 'undefined',
                },
            },
            required: [
                'array', 'boolean', 'integer',
            ],
        };
        commandOptions_1.default.prefix = 'I';
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    export interface IAllSimpleType {
        array: (string | string[])[];
        boolean: boolean;
        integer: number;
        null?: null;
        number?: number;
        object?: {
        };
        string?: string;
        any?: any;
        undefined?: undefined;
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('inner object schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/inner_object',
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
                options: {
                    type: 'object',
                    properties: {
                        A: { type: 'integer' },
                        B: { type: 'number' },
                        C: { type: 'string' },
                    },
                },
            },
        };
        commandOptions_1.default.prefix = 'I';
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    export interface IInnerObject {
        title?: string;
        options?: {
            A?: number;
            B?: number;
            C?: string;
        };
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('object array schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: '/test/object_array',
            type: 'object',
            properties: {
                array: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            items: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        };
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    export interface ObjectArray {
        array?: {
            name?: string;
            items?: string[];
        }[];
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('root array schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: 'test/root/root_array',
            type: 'array',
            items: {
                type: 'string',
            },
        };
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    namespace Root {
        export type RootArray = string[];
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('root any schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: 'test/root/root_any',
            description: 'This is any type schema',
            additionalProperties: true,
        };
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    namespace Root {
        /**
         * This is any type schema
         */
        export interface RootAny {
            [name: string]: any;
        }
    }
}
`;
        assert.equal(result, expected, result);
    }));
    it('include example schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: 'test/example/root',
            example: 'How get this schema.\nAlso, How get this data from hoge.',
            properties: {
                name: {
                    type: ['string', 'null'],
                    example: 'how get name property',
                },
            },
        };
        {
            const result = yield _1.default([schema]);
            const expected = `declare namespace Test {
    namespace Example {
        /**
         * example:
         *   How get this schema.
         *   Also, How get this data from hoge.
         */
        export interface Root {
            /**
             * example: how get name property
             */
            name?: string | null;
        }
    }
}
`;
            assert.equal(result, expected, result);
        }
        {
            commandOptions_1.default.target = 'v1';
            const result = yield _1.default([schema]);
            const expected = `declare namespace Test {
    namespace Example {
        /**
         * example:
         *   How get this schema.
         *   Also, How get this data from hoge.
         */
        export interface Root {
            /**
             * example: how get name property
             */
            name?: string;
        }
    }
}
`;
            assert.equal(result, expected, result);
        }
    }));
    it('include $ref schema', () => __awaiter(this, void 0, void 0, function* () {
        const schema = {
            id: 'test/ref/include_ref',
            type: 'object',
            definitions: {
                name: {
                    type: 'string',
                },
            },
            properties: {
                'sub-name': {
                    $ref: '#/definitions/name',
                },
            },
        };
        const result = yield _1.default([schema]);
        const expected = `declare namespace Test {
    namespace Ref {
        export interface IncludeRef {
            "sub-name"?: IncludeRef.Definitions.Name;
        }
        namespace IncludeRef {
            namespace Definitions {
                export type Name = string;
            }
        }
    }
}
`;
        assert.equal(result, expected, result);
    }));
});
