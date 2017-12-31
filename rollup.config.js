// TODO: update each package's 'name' key to match below
export const globals = {
  'codex-algorithms': 'codex.algorithms',
  'codex-data-structures': 'codex.dataStructures',
  'codex-utilities': 'codex.utilities'
}

export default name => ({
  input: 'lib/index.js',
  output: {
    file: 'lib/bundle.umd.js',
    format: 'umd',
    name: `codex.${name}`,
    globals,
    sourcemap: true,
    exports: 'named'
  },
  external: Object.keys(globals),
  onwarn
})

export function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED']

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message)
  }
}

// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import pkg from './package.json'

// export default [
//   // browser-friendly UMD build
//   {
//     input: 'src/main.js',
//     output: {
//       file: pkg.browser,
//       format: 'umd'
//     },
//     name: 'howLongUntilLunch',
//     plugins: [
//       resolve(), // so Rollup can find `ms`
//       commonjs() // so Rollup can convert `ms` to an ES module
//     ]
//   },

//   // CommonJS (for Node) and ES module (for bundlers) build.
//   // (We could have three entries in the configuration array
//   // instead of two, but it's quicker to generate multiple
//   // builds from a single configuration where possible, using
//   // an array for the `output` option, where we can specify
//   // `file` and `format` for each target)
//   {
//     input: 'src/main.js',
//     external: ['ms'],
//     output: [
//       { file: pkg.main, format: 'cjs' },
//       { file: pkg.module, format: 'es' }
//     ]
//   }
// ]
