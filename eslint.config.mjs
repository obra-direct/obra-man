import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @see https://nextjs.org/docs/app/api-reference/config/eslint */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**"] },
  ...require("eslint-config-next/core-web-vitals"),
];

export default eslintConfig;
