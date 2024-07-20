import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // 配置@/路径指向src目录
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }
})