const { babel } = require('@rollup/plugin-babel');
const serve = require('rollup-plugin-serve');
const { uglify } = require('rollup-plugin-uglify');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const path = require("path");
import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

export default [
    {
        // 入口
        input: isProduction ? "src/index.tsx" : "example/index.tsx",
        // 	输出
        output: {
            file: pkg.browser,
            format: "umd",
            sourcemap: !isProduction,
            name: "index"
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({ outDir: "./dist" }),
            // less
            postcss({
                extract: true,
                minimize: isProduction,
            }),
            // babel
            babel({
                babelrc: false,
                presets: [
                    ['@babel/preset-env', { modules: false }],
                    '@babel/preset-react'
                ],
                plugins: [
                    ["@babel/plugin-transform-classes", {
                        "loose": true
                    }]]
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                preventAssignment: true
            }),
            isProduction ?
                // 生产模式用，混淆
                uglify() :
                // 本地服务，开发模式用
                serve({
                    port: 3001,
                    contentBase: [path.join(__dirname)]
                }),
        ]
    }
]