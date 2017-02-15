"use strict";
const assert = require("power-assert");
const defaultNamingStrategy_1 = require("../src/naming/defaultNamingStrategy");
const noExtensionNamingStrategy_1 = require("../src/naming/noExtensionNamingStrategy");
const schemaid_1 = require("../src/schemaid");
describe('schema id parser test', () => {
    function test(schemaId, expectedId, isFetchable, fileId, isJsonPath, jsonPath, typenames) {
        assert.equal(schemaId.getAbsoluteId(), expectedId);
        assert.equal(schemaId.isFetchable(), isFetchable);
        assert.equal(schemaId.getFileId(), fileId);
        assert.equal(schemaId.isJsonPointerHash(), isJsonPath);
        assert.deepEqual(schemaId.getJsonPointerHash(), jsonPath);
        assert.deepEqual(schemaId.getTypeNames(), typenames);
    }
    it('root schema id', () => {
        test(new schemaid_1.SchemaId('/sampleId', []), '/sampleId#', false, '/sampleId#', false, [], ['SampleId']);
        test(new schemaid_1.SchemaId('/sample2/path/file', []), '/sample2/path/file#', false, '/sample2/path/file#', false, [], ['Sample2', 'Path', 'File']);
        test(new schemaid_1.SchemaId('https://example.com:3000/path/to/schema/file', []), 'https://example.com:3000/path/to/schema/file#', true, 'https://example.com:3000/path/to/schema/file#', false, [], ['ExampleCom3000', 'Path', 'To', 'Schema', 'File']);
        test(new schemaid_1.SchemaId('#/definitions/positiveInteger', []), '#/definitions/positiveInteger', false, '#', true, ['definitions', 'positiveInteger'], ['Definitions', 'PositiveInteger']);
    });
    context('with default naming strategy', () => {
        beforeEach(() => {
            schemaid_1.SchemaId.namingStrategy = new defaultNamingStrategy_1.DefaultNamingStrategy();
        });
        it('JSON Schema usage pattern', () => {
            test(new schemaid_1.SchemaId('http://x.y.z/rootschema.json#', []), 'http://x.y.z/rootschema.json#', true, 'http://x.y.z/rootschema.json#', false, [], ['XYZ', 'RootschemaJson']);
            test(new schemaid_1.SchemaId('#foo', ['http://x.y.z/rootschema.json#']), 'http://x.y.z/rootschema.json#foo', true, 'http://x.y.z/rootschema.json#', false, [], ['XYZ', 'RootschemaJson', 'Foo']);
            test(new schemaid_1.SchemaId('otherschema.json', ['http://x.y.z/rootschema.json#']), 'http://x.y.z/otherschema.json#', true, 'http://x.y.z/otherschema.json#', false, [], ['XYZ', 'OtherschemaJson']);
            test(new schemaid_1.SchemaId('#bar', ['otherschema.json', 'http://x.y.z/rootschema.json#']), 'http://x.y.z/otherschema.json#bar', true, 'http://x.y.z/otherschema.json#', false, [], ['XYZ', 'OtherschemaJson', 'Bar']);
            test(new schemaid_1.SchemaId('t/inner.json#/json/path', ['otherschema.json', 'http://x.y.z/rootschema.json#']), 'http://x.y.z/t/inner.json#/json/path', true, 'http://x.y.z/t/inner.json#', true, ['json', 'path'], ['XYZ', 'T', 'InnerJson', 'Json', 'Path']);
            test(new schemaid_1.SchemaId('some://where.else/completely#', ['http://x.y.z/rootschema.json#']), 'some://where.else/completely#', false, 'some://where.else/completely#', false, [], ['WhereElse', 'Completely']);
        });
    });
    context('with no extensions naming strategy', () => {
        beforeEach(() => {
            schemaid_1.SchemaId.namingStrategy = new noExtensionNamingStrategy_1.NoExtensionNamingStrategy();
        });
        it('JSON Schema usage pattern', () => {
            test(new schemaid_1.SchemaId('http://x.y.z/rootschema.json#', []), 'http://x.y.z/rootschema.json#', true, 'http://x.y.z/rootschema.json#', false, [], ['XYZ', 'Rootschema']);
            test(new schemaid_1.SchemaId('#foo', ['http://x.y.z/rootschema.json#']), 'http://x.y.z/rootschema.json#foo', true, 'http://x.y.z/rootschema.json#', false, [], ['XYZ', 'Rootschema', 'Foo']);
            test(new schemaid_1.SchemaId('otherschema.json', ['http://x.y.z/rootschema.json#']), 'http://x.y.z/otherschema.json#', true, 'http://x.y.z/otherschema.json#', false, [], ['XYZ', 'Otherschema']);
            test(new schemaid_1.SchemaId('#bar', ['otherschema.json', 'http://x.y.z/rootschema.json#']), 'http://x.y.z/otherschema.json#bar', true, 'http://x.y.z/otherschema.json#', false, [], ['XYZ', 'Otherschema', 'Bar']);
            test(new schemaid_1.SchemaId('t/inner.json#/json/path', ['otherschema.json', 'http://x.y.z/rootschema.json#']), 'http://x.y.z/t/inner.json#/json/path', true, 'http://x.y.z/t/inner.json#', true, ['json', 'path'], ['XYZ', 'T', 'Inner', 'Json', 'Path']);
            test(new schemaid_1.SchemaId('some://where.else/completely#', ['http://x.y.z/rootschema.json#']), 'some://where.else/completely#', false, 'some://where.else/completely#', false, [], ['WhereElse', 'Completely']);
        });
    });
});
