import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), react()],
    build: {
      chunkSizeWarningLimit: 700,
      rolldownOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'INVALID_ANNOTATION') return;
          warn(warning);
        },
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'fullcalendar',
                test: /@fullcalendar/,
                priority: 20,
              },
              {
                name: 'gantt',
                test: /gantt-task-react/,
                priority: 20,
              },
              {
                name: 'pdf-export',
                test: /jspdf|html2canvas|jspdf-autotable/,
                priority: 20,
              },
              {
                name: 'xlsx',
                test: /\/xlsx/,
                priority: 20,
              },
              {
                name: 'supabase',
                test: /@supabase/,
                priority: 15,
              },
            ],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
