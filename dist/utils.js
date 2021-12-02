"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotNil = exports.isTruthy = exports.getEnv = exports.getVar = void 0;
const lodash_1 = require("lodash");
const getVar = (source, sourceName = 'object', isRequired = true) => (name, defaultValue = undefined) => {
    const value = (0, lodash_1.get)(source, name, defaultValue);
    if (value == undefined && isRequired) {
        throw new Error(`Could not get variable "${name}" from "${sourceName}" and no default value is provided.`);
    }
    return value;
};
exports.getVar = getVar;
exports.getEnv = (0, exports.getVar)(process.env, 'process.env');
const isTruthy = (value) => {
    return ['1', 'true', 'yes'].includes(value.toLowerCase());
};
exports.isTruthy = isTruthy;
const isNotNil = (value) => value != null;
exports.isNotNil = isNotNil;
//# sourceMappingURL=utils.js.map