import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import skipFormatting from 'eslint-config-prettier/flat';

export default defineConfig([
    globalIgnores(['node_modules', 'dist', 'coverage']),
    js.configs.recommended,
    ...pluginVue.configs['flat/strongly-recommended'],
    ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
    {
        files: ['**/*.js', '**/*.vue'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                process: 'readonly',
            },
        },
        plugins: {
            '@stylistic': stylistic,
            perfectionist,
            vue: pluginVue,
        },
        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'line-length',
                    order: 'desc',
                    sortSideEffects: true,
                    groups: [
                        [
                            'side-effect',
                            'builtin',
                            'external',
                            'internal',
                            'parent',
                            'sibling',
                            'index',
                            'style',
                            'unknown',
                        ],
                    ],
                },
            ],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: ['function', 'export', 'return'] },
                { blankLine: 'any', prev: 'import', next: 'import' },
            ],
            'vue/padding-line-between-blocks': ['error', 'always'],

            'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-console': ['warn', { allow: ['error', 'warn'] }],
        },
    },
    skipFormatting,
]);
