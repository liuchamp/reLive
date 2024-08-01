import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import process from 'process';
import { visualizer } from "rollup-plugin-visualizer";
// 根据环境变量设置 scoped name 的格式
const isProduction = process.env.NODE_ENV === 'production';
const scopedName = isProduction
  ? '[hash:base64:8]'  // 生产环境使用简短的 hash
  : '[name]__[local]___[hash:base64:5]';  // 开发环境使用可读性好的名称

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    Pages({
      dirs: 'src/pages', // 默认扫描 src/pages 文件夹
      extensions: ['jsx'], // 默认支持 ['vue', 'md']
    })
  ],
  css: {
    modules: {
      // CSS Modules 的配置选项
      scopeBehaviour: 'local',
      generateScopedName: scopedName,
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy:{
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
