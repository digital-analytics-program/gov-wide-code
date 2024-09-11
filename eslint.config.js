import { default as browserCompatibility } from "eslint-plugin-compat";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  // The below configuration ensures that code is compatible with the browser
  // versions defined in the .browserslistrc file.
  browserCompatibility.configs["flat/recommended"],
  // The below configuration ensures that code is documented and that the
  // documentation follows JSDoc formatting rules.
  {
    plugins: {
      jsdoc,
    },
    ignores: [
      "Universal-Federated-Analytics-Min.js"
    ],
    rules: {
      ...jsdoc.configs.recommended.rules,
      "jsdoc/check-indentation": "error",
      "jsdoc/check-line-alignment": "error",
      "jsdoc/check-syntax": "error",
      "jsdoc/convert-to-jsdoc-comments": "error",
      "jsdoc/no-bad-blocks": "error",
      "jsdoc/no-blank-block-descriptions": "error",
      "jsdoc/no-blank-blocks": "error",
      "jsdoc/require-asterisk-prefix": "error",
      "jsdoc/require-jsdoc": [
        "error",
        {
          checkGetters: false,
          checkSetters: false,
          publicOnly: false,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      "jsdoc/require-throws": "error",
      "jsdoc/sort-tags": "error",
      "jsdoc/tag-lines": "off",
    },
  },
];
