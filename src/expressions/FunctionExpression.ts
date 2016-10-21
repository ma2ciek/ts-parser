import { Expression } from './Expression';

interface StandardArgumentExpressionProps {
    name: string;
    varType: string;
}

export class StandardArgumentExpression implements Expression {
    public type: 'ArgumentExpression' = 'ArgumentExpression';

    private name: string;
    private varType: string;

    constructor(props: StandardArgumentExpressionProps) {
        this.name = props.name;
        this.varType = props.varType;
    }

    public eval(ctx: any) {
        throw new Error('Unimplemented');
    }

    public defineLocally(ctx: any, value: any) {
        ctx[this.name] = value;
    }
}

interface FunctionExpressionProps {
    name: string;
    arguments: StandardArgumentExpression[];
    body: Expression[];
}

export class FunctionExpression implements Expression {
    public type: 'FunctionExpression' = 'FunctionExpression';

    private name: string;
    private arguments: StandardArgumentExpression[];
    private body: Expression[];

    constructor(props: FunctionExpressionProps) {
        this.name = props.name;
        this.arguments = props.arguments;
        this.body = props.body;
    }

    public eval(ctx: {}) {
        (ctx as any)[this.name] = (...args: any[]) => {
            const _ctx = Object.create(ctx);
            this.arguments
                .forEach((arg, i) => arg.defineLocally(_ctx, args[i]));

            let last: any;
            for (const expression of this.body) {
                last = expression.eval(_ctx);
            }

            return last;
        };
    }
}