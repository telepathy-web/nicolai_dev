
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ファイルをオブジェクト形式に変換する共通関数
function createInputObject(pattern, options, sliceBase = 'src') {
    return Object.fromEntries(
        globSync(pattern, options).map(file => [
            path.relative(
                sliceBase,
                file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
        ])
    );
}

// 入力ファイルの定義
const jsFiles = createInputObject('src/**/*.js', {
    ignore: ['node_modules/**', '**/modules/**', '**/dist/**'],
});

const scssFiles = createInputObject('src/assets/styles/pages/**/*.scss', {
    ignore: ['src/assets/styles/pages/**/_*.scss'],
});

const htmlFiles = createInputObject('src/**/*.html', {
    ignore: ['node_modules/**', '**/dist/**'],
});

// すべての入力ファイルを結合
const inputFiles = { ...scssFiles, ...jsFiles, ...htmlFiles };

export default defineConfig({
    root: './src',
    base: './',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: inputFiles,
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: (assets) => {
                    if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(assets.name)) return assets.originalFileName;
                    if (/\.css$/.test(assets.name)) return 'assets/css/[name].[ext]';
                    return 'assets/[name].[ext]';
                },
            },
        },
        assetsInlineLimit: 0,
    },
    plugins: [
        ViteEjsPlugin(),
        sassGlobImports(),
    ],
    server: {
        port: 3000,
    },
});