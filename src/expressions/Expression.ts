export interface Expression {
    type: string;
    eval(ctx: {}): any;
}