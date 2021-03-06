import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import externals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const plugins = [
  svelte(),
  resolve({
    dedupe: ['svelte'],
    extensions: ['.svelte', '.mjs', '.js', '.cjs', '.json', '.node'],
  }),
]

export default [
  {
    input: pkg.source,
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: pkg.main,
        sourcemap: true,
      },
    ],
    plugins: [externals({ deps: true }), ...plugins],
  },
  {
    input: pkg.source,
    output: {
      format: 'umd',
      name: 'SvelteFragment',
      file: pkg.unpkg,
      sourcemap: true,
    },

    plugins: [...plugins, commonjs(), production && terser()],
  },
]
