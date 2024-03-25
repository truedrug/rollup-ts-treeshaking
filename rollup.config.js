const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const deleteDeclarationFiles = require("./build-helpers/rollup-plugin-delete-declaration-files");
const packageJson = require("./package.json");

const files = ["__tests__", "test-utils.d.ts", "theme", "**/*.stories.d.ts"];

const config = {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
    },
    {
      file: packageJson.module,
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser({
      compress: {
        // drop_console: true,
      },
      output: {
        comments: false,
      },
    }),
    deleteDeclarationFiles(files),
  ],
};

module.exports = config;
