import * as assert from 'assert';

import {
    FunctionCallExpression,
    FunctionExpression,
    MultiplyExpression,
    SequenceExpression,
    StandardArgumentExpression,
    ValueExpression,
    VariableExpression,
} from '../src/expressions';

/* Code sample:
    func x (a: int, b: int)
        func y (c: int)
            a * b * c
        y(2)

    x(x(3, 4), 5)
*/

const createApp = () => new SequenceExpression([
    new FunctionExpression({
        arguments: [
            new StandardArgumentExpression({
                name: 'a',
                varType: 'int',
            }),
            new StandardArgumentExpression({
                name: 'b',
                varType: 'int',
            }),
        ],
        body: [
            new FunctionExpression({
                arguments: [
                    new StandardArgumentExpression({
                        name: 'c',
                        varType: 'int',
                    }),
                ],
                body: [
                    new MultiplyExpression({
                        left: new VariableExpression('a'),
                        right: new MultiplyExpression({
                            left: new VariableExpression('b'),
                            right: new VariableExpression('c'),
                        }),
                    }),
                ],
                name: 'y',
            }),

            new FunctionCallExpression({
                funcName: 'y',
                arguments: [
                    new ValueExpression({
                        value: '2',
                        varType: 'int',
                    }),
                ],
            }),
        ],
        name: 'x',
    }),

    new FunctionCallExpression({
        funcName: 'x',
        arguments: [
            new FunctionCallExpression({
                funcName: 'x',
                arguments: [
                    new ValueExpression({
                        value: '3',
                        varType: 'int',
                    }),
                    new ValueExpression({
                        value: '4',
                        varType: 'int',
                    }),
                ],
            }),
            new ValueExpression({
                value: '5',
                varType: 'int',
            }),
        ],
    }),
]);

describe('test', () => {
    it('test', () => {
        const app = createApp();
        const result = app.eval({});
        assert.equal(result, 240);
    });
});
