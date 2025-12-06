import type { IValue } from "@/models/IValue";

export abstract class TextProcessor {
    public abstract getId(): string;
    public abstract getName(): string;
    public abstract process(value: IValue): IValue;
    public abstract canProcess(value: IValue): boolean;


    
}

