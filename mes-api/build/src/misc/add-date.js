"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = addDays;
function addDays(date, days) {
    const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    return newDate;
}
