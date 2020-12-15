import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import vue from 'rollup-plugin-vue2'
import css from 'rollup-plugin-css-only'
import replace from '@rollup/plugin-replace'

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  }),
  vue({
    target: 'browser',
  }),
  css(),
  typescript({
    resolveJsonModule: false,
  }),
  resolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser({
    sourcemap: true,
  }),
]

export default [
  {
    input: 'src/content_script.ts',
    output: {
      dir: 'dist',
    },
    plugins: plugins.concat(
      copy({
        targets: [
          { src: 'src/popup', dest: 'dist' },
          { src: 'config/*', dest: 'dist' }, 
          { src: 'src/css/*', dest: 'dist' }
        ],
      })
    ),
  },
  {
    input: 'src/background.ts',
    output: {
      dir: 'dist',
    },
    plugins,
  },
  {
    input: 'src/popup/index.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'popup',
    },
    plugins,
  },
]
