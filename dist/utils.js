"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = void 0;
const parseBoolean = (value) => {
    if (typeof value === "boolean")
        return value;
    return value.toLowerCase() === "true";
};
exports.parseBoolean = parseBoolean;
