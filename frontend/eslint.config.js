import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: 'readonly',
                document: 'readonly',
                setTimeout: 'readonly',
                fetch: 'readonly',
                requestAnimationFrame: 'readonly',
                console: 'readonly',
                history: 'readonly'
            }
        }
    }
];
