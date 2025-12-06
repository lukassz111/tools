import type { IValue } from "@/models/IValue";
import { TextProcessor } from "./TextProcessor";
import { RegisterTextProcessor } from "@/service/TextProcessorService";

@RegisterTextProcessor()
export class ToLowerCaseTextProcessor extends TextProcessor {
    public getId(): string {
        return 'to-lower-case';
    }

    public getName(): string {
        return 'To Lower Case';
    }

    public process(value: IValue): IValue {
        if (value.text) {
            return {
                text: value.text.toLowerCase(),
            };
        }
        return value;
    }

    public canProcess(value: IValue): boolean {
        return !!value.text;
    }
}   