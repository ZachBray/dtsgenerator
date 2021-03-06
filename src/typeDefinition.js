"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonPointer = require("./jsonPointer");
var schemaid_1 = require("./schemaid");
var utils = require("./utils");

var TypeDefinition = function () {
    function TypeDefinition(schema, path, refId) {
        _classCallCheck(this, TypeDefinition);

        this.schema = schema;
        this.target = JsonPointer.get(schema, path);
        if (!this.target || !this.target.id) {
            this.id = refId || null;
        } else {
            var baseId = this.target.id;
            var parentsId = [];
            for (var i = path.length - 1; i >= 0; i--) {
                var parent = JsonPointer.get(schema, path.slice(0, i));
                if (parent && parent.id && typeof parent.id === 'string') {
                    parentsId.push(parent.id);
                }
            }
            this.id = new schemaid_1.SchemaId(baseId, parentsId);
        }
    }

    _createClass(TypeDefinition, [{
        key: "doProcess",
        value: function doProcess(process) {
            this.generateType(process, this.target);
        }
    }, {
        key: "searchRef",
        value: function searchRef(process, ref) {
            var type = process.referenceResolve(this.schema, ref);
            if (type == null) {
                throw new Error('Target reference is not found: ' + ref);
            }
            return type;
        }
    }, {
        key: "getTypename",
        value: function getTypename(id) {
            var sid = id instanceof schemaid_1.SchemaId ? id : new schemaid_1.SchemaId(id);
            var result = sid.getTypeNames();
            var myId = this.schemaId;
            if (myId) {
                var baseType = myId.getTypeNames().slice(0, -1);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = baseType[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var name = _step.value;

                        if (result[0] === name) {
                            result.shift();
                        } else {
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (result.length === 0) {
                    return [sid.getInterfaceName()];
                }
            }
            return result;
        }
    }, {
        key: "checkSchema",
        value: function checkSchema(process, base) {
            var _this = this;

            if (base.allOf) {
                var schema = base;
                base.allOf.forEach(function (p) {
                    if (p.$ref) {
                        p = _this.searchRef(process, p.$ref).targetSchema;
                    }
                    utils.mergeSchema(schema, p);
                });
                return schema;
            }
            return base;
        }
    }, {
        key: "generateType",
        value: function generateType(process, type) {
            type = this.checkSchema(process, type);
            var types = type.type;
            if (types === undefined && (type.properties || type.additionalProperties)) {
                type.type = 'object';
            } else if (Array.isArray(types)) {
                var reduced = utils.reduceTypes(types);
                type.type = reduced.length === 1 ? reduced[0] : reduced;
            }
            process.outputJSDoc(type);
            if (type.type === 'array') {
                this.generateTypeCollection(process, type);
            } else if (type.type === 'object' || type.type === 'any') {
                this.generateTypeModel(process, type);
            } else {
                this.generateDeclareType(process, type);
            }
        }
    }, {
        key: "generateDeclareType",
        value: function generateDeclareType(process, type) {
            var name = this.id.getInterfaceName();
            process.output('export type ').outputType(name).output(' = ');
            this.generateTypeProperty(process, type, true);
        }
    }, {
        key: "generateTypeModel",
        value: function generateTypeModel(process, type) {
            var name = this.id.getInterfaceName();
            process.output('export interface ').outputType(name).outputLine(' {');
            process.increaseIndent();
            if (type.type === 'any') {
                // TODO this is not permitted property access by dot.
                process.outputLine('[name: string]: any; // any');
            }
            this.generateProperties(process, type);
            process.decreaseIndent();
            process.outputLine('}');
        }
    }, {
        key: "generateTypeCollection",
        value: function generateTypeCollection(process, type) {
            var name = this.id.getInterfaceName();
            process.output('export type ').outputType(name).output(' = ');
            this.generateTypeProperty(process, type.items == null ? {} : type.items, false);
            process.outputLine('[];');
        }
    }, {
        key: "generateProperties",
        value: function generateProperties(process, type) {
            var _this2 = this;

            if (type.additionalProperties) {
                process.output('[name: string]: ');
                this.generateTypeProperty(process, type.additionalProperties, true);
            }
            if (type.properties) {
                Object.keys(type.properties).forEach(function (propertyName) {
                    var property = type.properties[propertyName];
                    process.outputJSDoc(property);
                    _this2.generatePropertyName(process, propertyName, type);
                    _this2.generateTypeProperty(process, property);
                });
            }
        }
    }, {
        key: "generatePropertyName",
        value: function generatePropertyName(process, propertyName, property) {
            if (propertyName) {
                var optionalProperty = !property.required || property.required.indexOf(propertyName) < 0;
                process.outputKey(propertyName, optionalProperty).output(': ');
            }
        }
    }, {
        key: "generateTypeProperty",
        value: function generateTypeProperty(process, property) {
            var _this3 = this;

            var terminate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (!property) {
                return;
            }
            property = this.checkSchema(process, property);
            if (property.$ref) {
                var ref = this.searchRef(process, property.$ref);
                if (ref.id == null) {
                    throw new Error('target referenced id is nothing: ' + property.$ref);
                }
                this.generateTypePropertyNamedType(process, this.getTypename(ref.id), false, ref.targetSchema, terminate);
                return;
            }
            var anyOf = property.anyOf || property.oneOf;
            if (anyOf) {
                this.generateArrayedType(process, anyOf, ' | ', terminate);
                return;
            }
            if (property.enum) {
                if (!terminate) {
                    process.output('(');
                }
                process.output(property.enum.map(function (s) {
                    return '"' + s + '"';
                }).join(' | '));
                if (!terminate) {
                    process.output(')');
                } else {
                    process.outputLine(';');
                }
                return;
            }
            var type = property.type;
            if (type == null) {
                this.generateTypePropertyNamedType(process, 'any', true, property, terminate);
            } else if (typeof type === 'string') {
                this.generateTypeName(process, type, property, terminate);
            } else {
                var types = utils.reduceTypes(type);
                if (!terminate && types.length > 1) {
                    process.output('(');
                }
                types.forEach(function (t, index) {
                    var isLast = index === types.length - 1;
                    _this3.generateTypeName(process, t, property, terminate && isLast, isLast);
                    if (!isLast) {
                        process.output(' | ');
                    }
                });
                if (!terminate && types.length > 1) {
                    process.output(')');
                }
            }
        }
    }, {
        key: "generateArrayedType",
        value: function generateArrayedType(process, types, separator, terminate) {
            var _this4 = this;

            if (!terminate) {
                process.output('(');
            }
            types.forEach(function (type, index) {
                var isLast = index === types.length - 1;
                if (type.id) {
                    _this4.generateTypePropertyNamedType(process, _this4.getTypename(type.id), false, type, isLast && terminate);
                } else {
                    _this4.generateTypeProperty(process, type, isLast && terminate);
                }
                if (!isLast) {
                    process.output(separator);
                }
            });
            if (!terminate) {
                process.output(')');
            }
        }
    }, {
        key: "generateTypeName",
        value: function generateTypeName(process, type, property, terminate) {
            var outputOptional = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

            var tsType = utils.toTSType(type, property);
            if (tsType) {
                this.generateTypePropertyNamedType(process, tsType, true, property, terminate, outputOptional);
                return;
            }
            if (type === 'object') {
                process.outputLine('{');
                process.increaseIndent();
                this.generateProperties(process, property);
                process.decreaseIndent();
                process.output('}');
                if (terminate) {
                    process.outputLine(';');
                }
            } else if (type === 'array') {
                this.generateTypeProperty(process, property.items == null ? {} : property.items, false);
                process.output('[]');
                if (terminate) {
                    process.outputLine(';');
                }
            } else {
                console.error(property);
                throw new Error('unknown type: ' + property.type);
            }
        }
    }, {
        key: "generateTypePropertyNamedType",
        value: function generateTypePropertyNamedType(process, typeName, primitiveType, property) {
            var terminate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var outputOptional = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

            if (Array.isArray(typeName)) {
                typeName.forEach(function (type, index) {
                    var isLast = index === typeName.length - 1;
                    process.outputType(type, isLast ? primitiveType : true);
                    if (!isLast) {
                        process.output('.');
                    }
                });
            } else {
                process.outputType(typeName, primitiveType);
            }
            if (terminate) {
                process.output(';');
            }
            if (outputOptional) {
                this.generateOptionalInformation(process, property, terminate);
            }
            if (terminate) {
                process.outputLine();
            }
        }
    }, {
        key: "generateOptionalInformation",
        value: function generateOptionalInformation(process, property) {
            var terminate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (!property.format && !property.pattern) {
                return;
            }
            if (terminate) {
                process.output(' //');
            } else {
                process.output(' /*');
            }
            if (property.format) {
                process.output(' ').output(property.format);
            }
            if (property.pattern) {
                process.output(' ').output(property.pattern);
            }
            if (!terminate) {
                process.output(' */ ');
            }
        }
    }, {
        key: "schemaId",
        get: function get() {
            return this.id;
        }
    }, {
        key: "rootSchema",
        get: function get() {
            return this.schema;
        }
    }, {
        key: "targetSchema",
        get: function get() {
            return this.target;
        }
    }]);

    return TypeDefinition;
}();

exports.TypeDefinition = TypeDefinition;