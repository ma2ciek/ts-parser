import { Expression } from './Expression';

interface ValueExpressionProps {
    value: string;
    varType: string;
}

export class ValueExpression implements Expression {
    public type: 'ValueExpression' = 'ValueExpression';
    private value: string;
    private varType: string;

    public constructor(props: ValueExpressionProps) {
        this.value = props.value;
        this.varType = props.varType;
    }

    public eval(ctx: {}) {
        if (this.varType === 'int')
            return parseInt(this.value, 10);

        throw new Error('Not implememnted');
    }
}
