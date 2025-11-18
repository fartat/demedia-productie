import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    const cmdWayfinder: Record<string, boolean | string> = {
        formVariants: true,
    };
    if (mode !== 'development') {
        cmdWayfinder['command'] =
            'ea-php83 artisan wayfinder:generate --with-form';
    }

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            wayfinder({
                formVariants: true,
                command: 'ea-php83 artisan wayfinder:generate --with-form',
            }),
        ].filter(Boolean),
        esbuild: {
            jsx: 'automatic',
        },
    };
});
