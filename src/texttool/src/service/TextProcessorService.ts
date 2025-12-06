import type { IValue } from "@/models/IValue";
import type { TextProcessor } from "@/utils/textprocessor/TextProcessor";
import Container, { Service } from "typedi";

@Service()
export class TextProcessorService {
    private processors: TextProcessor[] = [];

    public registerProcessor(processor: TextProcessor): void {
        this.processors.push(processor);
    }
    
    public getProcessors(): TextProcessor[] {
        return this.processors;
    }
    

    public processText(value: string, processorIds: string[]): IValue {
        return this.processValue({ text: value }, processorIds);
    }
    public processValue(value: IValue, processorIds: string[]): IValue {
        if(processorIds == undefined) {
            return value;
        }
        let result = JSON.parse(JSON.stringify(value)) as IValue;
        console.log('Processing value with processors:', processorIds);
        for (const id of processorIds) {
            const processor = this.processors.find(p => p.getId() === id);
            if (processor && processor.canProcess(result)) {
                result = processor.process(result);
            }
        }
        return result;
    }
}


// Dekorator automatycznie rejestrujący procesor tekstu w serwisie
export function RegisterTextProcessor() {
    return function <T extends new (...args: any[]) => TextProcessor>(target: T) {
        const processorInstance = new target();
        const service = Container.get(TextProcessorService);
        service.registerProcessor(processorInstance);
        return target;
    };
}