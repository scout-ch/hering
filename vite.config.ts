import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const generateEnvFile = () => ({
    name: 'generate-env-file',
    configResolved(config: any) {
        // Only run during development
        if (config.command !== 'serve') {
            return
        }

        const publicDir = resolve(config.root, 'public')
        if (!existsSync(publicDir)) {
            throw new Error('Public directory does not exist. Please create a public directory at the root of your project.')
        }

        const envContent = `window.env = {
  HERING_API_BASE_URL: '${process.env.HERING_API_BASE_URL || 'http://localhost:1337/api'}'
};`
        writeFileSync(resolve(publicDir, 'env.js'), envContent)
    }
})

export default defineConfig({
    base: '/',
    plugins: [react(), generateEnvFile()],
    server: {
        open: false,
        port: 3001,
    },
    css: {
        preprocessorOptions: {
            less: {},
        },
    }
})