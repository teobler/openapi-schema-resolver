import path from "path";
// @ts-ignore
import rollupBabel from "rollup-plugin-babel";
// @ts-ignore
import rollupTypeScript from "rollup-plugin-typescript";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

const pkg = require(path.join(__dirname, "package.json"));

module.exports = [
  {
    input: "./src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    external: [
      "tslib",
      // @ts-ignore
      ...Object.keys(process.binding("natives")),
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      rollupTypeScript({
        target: "es5",
        module: "es6",
      }),
      rollupBabel({
        plugins: ["babel-plugin-pure-calls-annotation"],
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
  },
  {
    input: "./dist/types/index.d.ts",
    output: [
      { file: "dist/index.d.ts", format: "umd" },
      { file: "lib/index.d.ts", format: "cjs" },
      { file: "module/index.d.ts", format: "es" },
    ],
    plugins: [dts(), del({ targets: "dist/types", hook: "buildEnd" })],
  },
];
