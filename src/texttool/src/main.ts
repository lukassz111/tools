import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Imports after this line is for working typedi
import { TextProcessor,AsIsTextProcessor, ToLowerCaseTextProcessor, TableParseTextProcessor } from './utils/textprocessor/index';
import { TextProcessorService } from './service/TextProcessorService'

const app = createApp(App)

app.use(router)

app.mount('#app')
