import { RegisterTextProcessor } from "@/service/TextProcessorService";
import { TextProcessor } from "./TextProcessor";
import type { IValue } from "@/models/IValue";

@RegisterTextProcessor()
export class TableParseTextProcessor extends TextProcessor {
    
    protected tableSeparator: string = ',';

    public getId(): string {
        return 'table-parse';
    }

    public getName(): string {
        return 'Table Parse';
    }

    public process(value: IValue): IValue {

        const text = value.text;
        const lines = text ? text.split('\n') : [];
        const tableData = lines.map(line => line.split(this.tableSeparator).map(cell => cell.trim()));
        return {
            table: {
                rows: tableData
            },
        };
    }

    public canProcess(value: IValue): boolean {
        return !!value.text;
    }
}