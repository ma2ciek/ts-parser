import { Expression } from './Expression';

export class VariableExpression implements Expression {
    public type: 'VariableExpression' = 'VariableExpression';
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public eval(ctx: any) {
        return ctx[this.name];
    }
}
