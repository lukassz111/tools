<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import PipelineBuilder from './TextProcessor/PipelineBuilder.vue'
import Container from 'typedi'
import { TextProcessorService } from '@/service/TextProcessorService';
import type { IValue } from '@/models/IValue';

const inputText = ref('')
const processors = ref({
    processors: [] as string[]
});
const processedText = computed<IValue>(() => {
    const textProcessorService  = Container.get(TextProcessorService);
    let currentText = inputText.value;
    const result = textProcessorService.processText(currentText, toRaw(processors.value.processors));
    return result;
});
</script>

<template>
  <p>Text Processor</p>
  <fieldset>
    <div>
        <legend>Enter Text to Process</legend>
        <textarea v-model="inputText" placeholder="Enter text here..." rows="10" cols="50"></textarea>
    </div>
    <div>
        <h3>Pipelines</h3>
        <PipelineBuilder v-model="processors" />
        <hr/>
        <pre>Selected Processors: {{ JSON.stringify(processors, null, 2) }}</pre>
    </div>
    <div>
        <h3>Processed Text:</h3>
        <template v-if="processedText.text">
            <pre>{{ processedText.text }}</pre>
        </template>
        <template v-if="processedText.table">
            <h4>Table:</h4>
            <table border="1">
                <thead v-if="processedText.table?.headers">
                    <tr>
                        <th v-for="header in processedText.table?.headers" :key="header">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in processedText.table?.rows" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
    fieldset {
        display: flex;
        flex-direction: rows;
        gap: 20px;
        > * {
            width: 30%;
        }
    }
</style>
