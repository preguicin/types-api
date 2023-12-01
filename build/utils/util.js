"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMessageOfError = void 0;
//It will present and have utility functions like formating messages
function getLastMessageOfError(message) {
    const temp = message.split("\n");
    return temp[temp.length - 1];
}
exports.getLastMessageOfError = getLastMessageOfError;
