import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'

const plugins = [
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
        targets: [{ src: 'config/*', dest: 'dist' }, { src: 'src/css/*', dest: 'dist' }],
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
]
