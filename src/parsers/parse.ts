import { FunctionParseResult, parseFunction } from './parseFunction';

export type Parsed = (string | {
    fn: {
        args: any;
        body: Parsed;
        name: string;
    };
})[];

const parsers = [
    parseFunction,
];

export function parse(code: string): Parsed {
    let parsedCode: FunctionParseResult;

    for (const parser of parsers) {
        parsedCode = parser(code);

        if (parsedCode)
            break;
    }

    if (!parsedCode)
        return [code];

    let result: Parsed = [];

    for (const p of parsedCode) {
        if (typeof p === 'string') {
            result.push(...parse(p));
        } else {
            result.push(p);
        }
    }

    return result;
}
