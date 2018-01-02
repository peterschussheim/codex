import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export const globals = {
  'codex-algorithms': 'codex.algorithms',
  'codex-data-structures': 'codex.dataStructures',
  'codex-utils': 'codex.utils'
}

export default name => ({
  input: 'src/index.js',
  output: [
    {
      file: 'lib/bundle.umd.js',
      format: 'umd',
      name: `codex.${name}`,
      globals,
      exports: 'named'
    },
    {
      file: 'lib/index.js',
      format: 'cjs',
      name: `codex.${name}`,
      globals,
      exports: 'named'
    },
    {
      file: 'lib/index.es.js',
      format: 'es',
      name: `codex.${name}`,
      globals,
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ],
  external: Object.keys(globals),
  onwarn
})

export function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED']

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message)
  }
}
