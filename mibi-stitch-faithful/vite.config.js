import {defineConfig} from 'vite';import {resolve} from 'node:path';
export default defineConfig({base:'./',build:{rollupOptions:{input:{index:resolve(import.meta.dirname,'index.html'),assessment:resolve(import.meta.dirname,'assessment.html'),result:resolve(import.meta.dirname,'result.html'),ask:resolve(import.meta.dirname,'ask-mibi.html')}}}});
