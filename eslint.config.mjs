import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Règles supplémentaires pour repérer les erreurs courantes.
  {
    rules: {
      "no-unused-vars": "warn", // variable / import déclaré mais jamais utilisé
      "no-undef": "error", // utilisation d'une variable non définie
      "prefer-const": "warn", // "let" jamais réassigné -> devrait être "const"
      "no-var": "error", // interdire "var" (utiliser let / const)
      eqeqeq: ["warn", "always"], // forcer === et !== au lieu de == et !=
      "no-console": "off", // laisser console.log autorisé (pratique pour apprendre)
    },
  },
]);

export default eslintConfig;
