import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, './env', '')
  const API_BASE_URL = env.VITE_APP_API_BASE_URL || 'http://localhost:8080'

  return {
    // 插件配置
    plugins: [vue()],

    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },

    // 代理配置（开发环境）
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: false,
      proxy: {
        '/api': {
          target: 'http://172.28.40.161',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    // 环境变量配置
    envDir: './env',
    envPrefix: 'VITE_',

    // 构建选项
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus'],
            'vendor': ['vue', 'vue-router']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/variables.scss";`
        }
      }
    },

    // 优化选项
    optimizeDeps: {
      include: ['vue', 'vue-router', 'element-plus']
    }
  }
})
