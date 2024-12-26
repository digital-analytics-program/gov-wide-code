import terser from '@rollup/plugin-terser';

export default {
  input: "src/index.js",
  output: [
    {
      file: './dist/Universal-Federated-Analytics.js',
      format: 'iife',
      strict: false
    },
    {
      file: './dist/Universal-Federated-Analytics-Min.js',
      format: 'iife',
      sourcemap: true,
      sourcemapExcludeSources: true,
      strict: false,
      plugins: [
        terser({
          format: {
            max_line_len: 500
          }
        }),
      ]
    }
  ]
};