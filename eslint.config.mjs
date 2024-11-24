import eslint from '@eslint/js'
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
    {
        ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
    },
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json', 
                tsconfigRootDir: process.cwd(),
                sourceType: 'module',
                ecmaVersion: 2020,
            },
        },
        plugins: {
            '@typescript-eslint': tseslintPlugin,
        },
        rules: {
            'no-console': 'warn',
            'dot-notation': 'error',
        },
        settings: {},
        files: ['**/*.ts', '**/*.tsx'], // Ensure this applies only to TypeScript files
    }
]
