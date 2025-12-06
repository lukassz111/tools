import { RegisterTextProcessor } from "@/service/TextProcessorService";
import { TextProcessor } from "./TextProcessor";
import type { IValue } from "@/models/IValue";

@RegisterTextProcessor()
export class AsIsTextProcessor extends TextProcessor {
    public getId(): string {
        return 'as-is';
    }

    public getName(): string {
        return 'As Is';
    }

    public process(value: IValue): IValue {
        return value;
    }

    public canProcess(value: IValue): boolean {
        return true;
    }
}