import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process';
import { visualizer } from "rollup-plugin-visualizer";
// 根据环境变量设置 scoped name 的格式
const isProduction = process.env.NODE_ENV === 'production';
const scopedName = isProduction
  ? '[hash:base64:8]'  // 生产环境使用简短的 hash
  : '[name]__[local]___[hash:base64:5]';  // 开发环境使用可读性好的名称

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),visualizer()],
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
  build: {
    rollupOptions: {
      plugins: [visualizer()],
      // 自定义 Rollup 配置
      output: {
        // 控制 chunk 文件的命名
        chunkFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entry/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // 可以使用 manualChunks 自定义代码拆分策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将特定库分到不同的 chunks 中
            if (id.includes('lodash')) {
              return 'lodash';
            }
            if (id.includes('lodash')) {
              return 'lodash';
            }
            if (id.includes('antd')) {
              return 'antd';
            }
            if (id.includes('ace-builds')) {
              return 'acebuilds';
            }
            if (id.includes('react-ace')) {
              return 'reactace';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
