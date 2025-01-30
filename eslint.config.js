// @ts-check

// Allows us to bring in the recommended core rules from eslint itself
import eslint from '@eslint/js';

// Allows us to use the typed utility for our config, and to bring in the recommended rules for TypeScript projects from typescript-eslint
import tseslint from 'typescript-eslint';

// Allows us to bring in the recommended rules for Angular projects from angular-eslint
import angular from 'angular-eslint';

// Allows us to bring in the recommended rules for Prettier from eslint-plugin-prettier
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
export default [
  ...tseslint.config(
    {
      // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
      files: ['**/*.ts'],
      extends: [
        // Apply the recommended core rules
        eslint.configs.recommended,
        // Apply the recommended TypeScript rules
        ...tseslint.configs.recommended,
        // Optionally apply stylistic rules from typescript-eslint that improve code consistency
        ...tseslint.configs.stylistic,
        // Apply the recommended Angular rules
        ...angular.configs.tsRecommended
      ],
      // Set the custom processor which will allow us to have our inline Component templates extracted
      // and treated as if they are HTML files (and therefore have the .html config below applied to them)
      processor: angular.processInlineTemplates,
      // Override specific rules for TypeScript files (these will take priority over the extended configs above)
      rules: {
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/prefer-signals': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic',
            readonly: 'generic'
          }
        ],
        '@typescript-eslint/no-deprecated': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            allowForKnownSafeCalls: [
              // Angular router navigate and navigateByUrl are safe to ignore
              { from: 'package', package: '@angular/router', name: ['navigate', 'navigateByUrl'] }
            ]
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true
          }
        ],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-case-declarations': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.name='fdescribe']",
            message: "'Do not use focused test suites (fdescribe)"
          },
          {
            selector: "CallExpression[callee.name='fit']",
            message: "'Do not use focused tests (fit)"
          }
        ],
        'no-console': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/operators'
              }
            ]
          }
        ]
      }
    },
    {
      // Everything in this config object targets our HTML files (external templates,
      // and inline templates as long as we have the `processor` set on our TypeScript config above)
      files: ['**/*.html'],
      extends: [
        // Apply the recommended Angular template rules
        ...angular.configs.templateRecommended
      ],
      rules: {
        '@angular-eslint/template/alt-text': 'error',
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/elements-content': 'error',
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true
          }
        ],
        '@angular-eslint/template/label-has-associated-control': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/table-scope': 'error',
        '@angular-eslint/template/valid-aria': 'error',
        '@angular-eslint/template/no-autofocus': 'error',
        '@angular-eslint/template/no-distracting-elements': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error'
      }
    }
  ),
  eslintPluginPrettierRecommended,
  // set the parse options for typed rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
];
