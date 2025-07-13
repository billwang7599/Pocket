import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: ["lib/generated"],
    },
    {
        files: ["next.config.js", "next.config.mjs"], // Target both .js and .mjs config files
        rules: {
            // While next.config.mjs uses import, this provides a fallback for .js files
            // or if next-pwa's internal structure somehow triggered it in .mjs.
            "@typescript-eslint/no-require-imports": "off",
            // It's also common to disable 'import/no-unused-modules' for config files,
            // as they often have exports that aren't 'used' by other parts of the app.
            "import/no-unused-modules": "off",
        },
    },
];

export default eslintConfig;
