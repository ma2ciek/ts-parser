import { Expression } from './Expression';

interface MultiplyExpressionProps {
    left: Expression;
    right: Expression;
}

export class MultiplyExpression implements Expression {
    public type: 'MultiplyExpression' = 'MultiplyExpression';

    private left: Expression;
    private right: Expression;

    public constructor(props: MultiplyExpressionProps) {
        this.left = props.left;
        this.right = props.right;
    }

    public eval(ctx: {}) {
        return this.left.eval(ctx) * this.right.eval(ctx);
    }
}