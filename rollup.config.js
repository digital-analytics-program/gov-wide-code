import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import compiler from '@ampproject/rollup-plugin-closure-compiler';

export default [
  {
    input: 'index.js',
    output: {
      file: './dist/Universal-Federated-Analytics.js',
      format: 'iife'
    },
    plugins: [nodeResolve()]
  }
    // {
    //   file: './dist/Universal-Federated-Analytics-Min.js',
    //   format: 'iife',
    //   plugins: [
    //     terser({
    //       sourceMap: {
    //         url: "Federated.js.map",
    //         filename: "Universal-Federated-Analytics-Min.js",
    //       }
    //     })
    //   ]
    // }
]
