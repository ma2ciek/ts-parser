import { Expression } from './Expression';

interface FunctionCallExpressionProps {
    funcName: string;
    arguments: Expression[];
}

export class FunctionCallExpression implements Expression {
    public type: 'FunctionCallExpression' = 'FunctionCallExpression';

    private funcName: string;
    private arguments: Expression[];

    public constructor(props: FunctionCallExpressionProps) {
        this.funcName = props.funcName;
        this.arguments = props.arguments;
    }

    public eval(ctx: any) {
        const fn = ctx[this.funcName];
        if (typeof fn !== 'function')
            throw new Error('fn is missing');

        const args = this.arguments.map(arg => arg.eval(ctx));
        return fn(...args);
    }
}
