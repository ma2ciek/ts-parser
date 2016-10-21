export function getRange(str: string, regexp: RegExp) {
    const match = str.match(regexp);

    if (match) {
        const start = str.search(regexp);

        return {
            start,
            width: match[0].length,
        };
    }
}
