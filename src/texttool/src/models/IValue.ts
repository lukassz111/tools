export interface IValueTable {
    headers?: string[];
    rows?: string[][];
}
export interface IValue {
    text?: string;
    table?: IValueTable;
}