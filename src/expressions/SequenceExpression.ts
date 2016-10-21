import { Expression } from './Expression';

export class SequenceExpression implements Expression {
    public type: 'SequenceExpression' = 'SequenceExpression';

    public constructor(private expressions: Expression[]) { }

    public eval(ctx: {}) {
        let last: any;
        const _ctx = Object.create(ctx) as {};
        for (const expression of this.expressions) {
            last = expression.eval(_ctx);
        }
        return last;
    }
}
