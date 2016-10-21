import { getRange } from './utils';
import { parse, Parsed } from './parse';


/*
func x (a: int, b: int) {
    func y (c: int) {
        a * b * c
    }
    y(2)
}

x(x(3, 4), 5)
*/
export type FunctionParseResult = (string | {
    fn: {
        name: string;
        args: any;
        body: Parsed;
    };
})[] | void;

const declarationRegExp = /func *[a-zA-Z]+ *\(([a-z]+: *[a-z]+,? *)+\)[\s]{/;
const funcRegExp = /func *[a-zA-Z]+ *\(([a-z]+: *[a-z]+,? *)+\)[\s]{[\s\S]+\}/;
const funcNameRegExp = /func *([a-zA-Z]+)/;

export function parseFunction(code: string): FunctionParseResult {
    const range = getRange(code, funcRegExp);
    const declarationRange = getRange(code, declarationRegExp);
    const funcNameResult = code.match(funcNameRegExp);

    if (!range || !declarationRange || !funcNameResult)
        return;

    const argsPart = code.slice(range.start, range.start + declarationRange.width);


    return [
        ...parse(code.slice(0, range.start)),
        {
            fn: {
                args: parseArguments(argsPart),

                body: parse(code.slice(
                    range.start + declarationRange.width,
                    range.start + range.width,
                )),
                name: funcNameResult[1],
            },
        },
        ...parse(code.slice(range.start + range.width)),
    ];
}

interface Argument {
    name: string;
    varType: string;
}

const argsRegExp = /[a-zA-Z]+\ *: *[a-zA-Z]+/g;
const argAndTypeRegExp = /([a-zA-Z]+) *: *([a-zA-Z]+)/;

export function parseArguments(code: string): Argument[] {
    const args = code.match(argsRegExp) || [];

    return args.map(arg => {
        const nameAndType = arg.match(argAndTypeRegExp);

        if (!nameAndType)
            throw new Error('Name and type do not match regexp: ' + arg);

        let [, name, varType] = nameAndType;
        return { name, varType };
    });
}