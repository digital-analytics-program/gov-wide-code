import terser from '@rollup/plugin-terser';

export default [
  {
    input: "Universal-Federated-Analytics.js",
    output: {
      file: './dist/Universal-Federated-Analytics.js',
      format: 'iife',
      strict: false
    }
  },
  {
    input: "Universal-Federated-Analytics.js",
    output: {
      file: './dist/Universal-Federated-Analytics-Min.js',
      format: 'iife',
      sourcemap: true,
      sourcemapExcludeSources: true,
      strict: false
    },
    plugins: [
      terser({
        sourceMap: {
          filename: "Universal-Federated-Analytics-Min.js",
        }
      }),
    ],
  }
];