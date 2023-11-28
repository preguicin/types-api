"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidJSON = void 0;
function isValidJSON(json) {
    if (typeof json === "string") {
        try {
            const jsonObj = JSON.parse(json);
            return jsonEntries(jsonObj);
        }
        catch (err) {
            return false;
        }
    }
    return jsonEntries(json);
}
exports.isValidJSON = isValidJSON;
function jsonEntries(json) {
    return Object.entries(json).length === 0 ? false : true;
}
