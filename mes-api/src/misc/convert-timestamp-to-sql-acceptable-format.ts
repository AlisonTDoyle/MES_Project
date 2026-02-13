export function ConvertTimestampToSqlAcceptableFormat(sampleTimestamp: Date): string {
    let newTimestamp: string;

    var pad = function (num: any) { return ('00' + num).slice(-2) };
    let formattedTimestamp: string = sampleTimestamp.getUTCFullYear() + '-' +
        pad(sampleTimestamp.getUTCMonth() + 1) + '-' +
        pad(sampleTimestamp.getUTCDate()) + ' ' +
        pad(sampleTimestamp.getUTCHours()) + ':' +
        pad(sampleTimestamp.getUTCMinutes()) + ':' +
        pad(sampleTimestamp.getUTCSeconds());

    newTimestamp = `'${formattedTimestamp}'`;

    return newTimestamp
}