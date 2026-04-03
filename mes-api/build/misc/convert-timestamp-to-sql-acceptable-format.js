"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertTimestampToSqlAcceptableFormat = ConvertTimestampToSqlAcceptableFormat;
function ConvertTimestampToSqlAcceptableFormat(sampleTimestamp) {
    let newTimestamp;
    var pad = function (num) { return ('00' + num).slice(-2); };
    let formattedTimestamp = sampleTimestamp.getUTCFullYear() + '-' +
        pad(sampleTimestamp.getUTCMonth() + 1) + '-' +
        pad(sampleTimestamp.getUTCDate()) + ' ' +
        pad(sampleTimestamp.getUTCHours()) + ':' +
        pad(sampleTimestamp.getUTCMinutes()) + ':' +
        pad(sampleTimestamp.getUTCSeconds());
    newTimestamp = `'${formattedTimestamp}'`;
    return newTimestamp;
}
