<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Container from 'typedi'
import { TextProcessorService } from '@/service/TextProcessorService';
import type { TextProcessor } from '@/utils/textprocessor/TextProcessor';

    const getProcessors = () => {
        const textProcessorService = Container.get(TextProcessorService);
        return textProcessorService.getProcessors();
    }


    const processors = ref<TextProcessor[]>(getProcessors());
    const selectedProcessorId = ref<string | null>(null);
    const selectedProcessor = computed<TextProcessor | null>(() => {
        return processors.value.find(p => p.getId() === selectedProcessorId.value) || null;
    });


    // const setModel = () => {
    //     if (selectedProcessor.value) {
    //         model.value.processors = [selectedProcessor.value.getId()];
    //     } else {
    //         model.value.processors = [];
    //     }
    // }


    // Model dla wybranego procesora
    const model = ref({
        processors: [] as string[]
    });

    // Emituj zmiany do komponentu nadrzędnego
    const emit = defineEmits<{
        'update:modelValue': [value: typeof model.value]
    }>();

    // Props do odbierania v-model
    const props = defineProps<{
        modelValue?: typeof model.value
    }>();

    // Synchronizuj props z lokalnym stanem
    if (props.modelValue) {
        model.value = props.modelValue;
    }

    // Obserwuj zmiany i emituj je
    watch(model, (newValue) => {
        emit('update:modelValue', newValue);
    }, { deep: true });

</script>

<template>
    <p>Pipeline Builder Component</p>
    <select v-model="selectedProcessorId">
        <option v-for="processor in processors" :key="processor.getId()" :value="processor.getId()">
            {{ processor.getName() }}
        </option>
    </select>
    <button @click=" 
        if (selectedProcessor) {
            const currentModelValue = JSON.parse(JSON.stringify(model));
            currentModelValue.processors.push(selectedProcessor.getId());
            model = currentModelValue;
        }
    ">Add Processor</button>
</template>

<style scoped lang="scss">
</style>
