import { parseFunction } from '../src/parsers/parseFunction';
import * as assert from 'assert';

/* IMPORTANT: */

const createSample = () => `
func x (a: int, b: int) {
    func y (c: int) {
        a * b * c
    }
    y(2)
}

x(x(3, 4), 5)
`;

describe('Parser', () => {
    it('#parseFunction()', () => {
        let code = createSample();
        const result = parseFunction(code);

        if (!result) {
            throw new Error('');
        }

        assert.ok(result[0]);

        console.log(JSON.stringify(result, null, 4));
    });
});